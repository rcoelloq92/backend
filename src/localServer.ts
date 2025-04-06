import express from 'express';
import cors from 'cors';
import router from './infrastructure/routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', router);

//Local server RCOELLO
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor local en http://localhost:${PORT}`);
});
