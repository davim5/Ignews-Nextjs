import { fauna } from "../../../services/fauna";
import { query as q} from 'faunadb';
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
    subscriptionId: string,
    customerId:string,
) {
    // Buscar o usuário no banco do faunaDB com o customerId
    const userRef = await fauna.query( // Pegando referência do usuário
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )

    // Buscar todos os dados da subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    // Separando dados mais importantes da subscription
    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    // Salvar os dados da subscription do usuário no FaunaDB
    await fauna.query(
        q.Create(
            q.Collection('subscriptions'),
            { data:subscriptionData }
        )
    )
}