import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

// Converter readable stream em string
async function buffer(readable:Readable) {
    const chunks = [];

    for await(const chunk of readable){
        chunks.push(
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
        );
    }
    
    return Buffer.concat(chunks);
}

// Next tem um formato de entender requisição
// Nessa caso ele vem como Stream
// Precisamos desabilitar o entendimento padrão o Next de como receber requisição  
export const config = {
    api: {
        bodyParser: false
    }
}

// Quais eventos são relevantes pra nós
// Set -> Um array que não pode ter nada duplicado dentro
const relevantEvents = new Set([
    'checkout.session.completed',
    'customer.subscription.updated',
    'customer.subscription.deleted'
])

export default async (req: NextApiRequest, res: NextApiResponse) =>{
    // Verificar se o método é POST
    if(req.method === 'POST') {
        const buf = await buffer(req)
        // Receber um código secreto que garante que somos nós que estamos fazendo
        // a requisição.
        const secret = req.headers['stripe-signature'];

        // Forma que stripe recomenda (não deve ser com if tradicional)
        
        let event: Stripe.Event

        try{
            event = stripe.webhooks.constructEvent(buf, secret,process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            return res.status(400).send(`Webhook error: ${err.message}`)
        }

        const { type } = event;

        if(relevantEvents.has(type)) {
            try{
                switch(type){
                    case 'customer.subscription.updated':
                    case 'customer.subscription.deleted':

                        const subscription = event.data.object as Stripe.Subscription;

                        await saveSubscription(
                            subscription.id,
                            subscription.customer.toString(),
                            false
                        );

                        break;
                    case 'checkout.session.completed':
                        const checkoutSession = event.data.object as Stripe.Checkout.Session

                        await saveSubscription(
                            checkoutSession.subscription.toString(),
                            checkoutSession.customer.toString(),
                            true
                            )

                        break;
                    default:
                        throw new Error('Unhandled event.')
                }
            } catch(err) {
                return res.json({error:'Webhook handler failed.'})
            }
        }

        res.status(200).json({ ok:true })
    } else{
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }

}