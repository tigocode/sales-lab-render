require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');
const startRoutine = require('./core/dailyTask');
const app = express();


app.use(cors({
  origin: "*", // teste local; depois podemos restringir
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  let date = new Date();
  console.log(`Servidor rodando na PORT ${process.env.PORT} e em execução desde: ${date.toLocaleString()}`);
  startRoutine.startRoutine(); // 👈 inicia o agendador junto com o servidor
});
