import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import service_account from "./service_accounts.json" assert { type: "json"};

export async function getFirestoreInstance () {
    const isInitialized = getApps().length > 0;
    if (!isInitialized) { 
        initializeApp({
            credential: cert(service_account),
        });
    }
    return getFirestore();
}

// ive had this error before, ill take a look later