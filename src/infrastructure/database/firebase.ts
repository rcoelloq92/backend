import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: 'https:backend-d6bfb.firebaseio.com'
  });
}

export const db = admin.firestore();
