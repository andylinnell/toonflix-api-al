import { getFirestoreInstance } from "./utils.js";
import { FieldValue } from "firebase-admin/firestore";

export async function getAllShows(req, res) {
    const db = await getFirestoreInstance();

    db.collection('shows').orderBy('createdAt', 'desc').get()
        .then(collection => {
            const shows = collection.docs.map(doc => ({ showId: doc.id, ...doc.data() }));
            res.send(shows);
        })
        .catch(err => res.status(500).send({ error: err.message }));
}

export async function addShow(req, res) {
    const { show } = req.body;
    const newShow = { show, createdAt: FieldValue.serverTimestamp() }
    const db = await getFirestoreInstance();
    db.collection('shows').add(newShow)
        .then(() => getAllShows(req, res)) // instantly sends back change and shows with change, skips a whole step of front end calling for information after change
        .catch(err => res.status(500).send({ error: err.message }));
}


export async function deleteShow(req, res) {
    const { showId } = req.params;
    const db = await getFirestoreInstance();

    db.collection('shows')
        .doc(showId)
        .delete()
        .then(() => getAllShows(req, res))
        .catch(err => res.status(500).send({ error: err.message }));
}

export async function updateShow(req, res) {
    const { show } = req.body;
    const { showId } = req.params;
    const db = await getFirestoreInstance();

    db.collection('shows')
        .doc(showId)
        .update({ show })
        .then(() => getAllShows(req, res))
        .catch(err => res.status(500).send({ error: err.message }));
}
