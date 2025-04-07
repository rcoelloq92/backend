import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';

import router from './infrastructure/routes/index';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export const api = functions.https.onRequest(app);
