import { session, signIn } from 'next-auth/client';
import { useEffect } from 'react';
import styles from './styles.module.scss';

interface SubscribeButtonProps{
    priceId:string;
}

export function SubscribeButton({priceId}:SubscribeButtonProps){
    
    function handleSubscribe(){
        if (!session){
            signIn('github');
            return;
        }
    }
    
    return(
        <button
        type="button"
        className={styles.subscribeButton}
        >
            Subscribe now
        </button>
    )
}