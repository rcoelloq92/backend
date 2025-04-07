import * as admin from "firebase-admin";

let serviceAccount: admin.ServiceAccount;

if (process.env.SERVICE_ACCOUNT_KEY) {
  serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);
} else {
  serviceAccount = require("./serviceAccountKey.json");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://backend-d6bfb.firebaseio.com"
  });
}

export const db = admin.firestore();
