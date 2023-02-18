import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { serviceAccount } from "./secrets.js";

export async function getFirestoreInstance () {
    const isInitialized = getApps().length > 0;
    if (!isInitialized) { 
        initializeApp({
            credential: cert(serviceAccount),
        });
    }
    return getFirestore();
    
}

// ive had this error before, ill take a look later