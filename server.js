
import express from 'express'
import cors from 'cors';
import axios from 'axios';
import fs from 'fs'
import { serve } from "inngest/express";
import { inngest } from "./client.js";
import myFunction from "./tasks.js"; // see above function

import jsonFiles from './csvjson.json' assert { type: 'json' } 



const app = express();
const port = 3001;


const api_key = '930a34e6973ad67a34f820a6dafa25a5d72eb43599b4a1ab5e7c913426c14c45594a0d53';

app.use(express.json());
app.use(
  // Expose the middleware on our recommended path at `/api/inngest`.
  "/api/inngest",
  serve({ client: inngest, functions: [myFunction] })
);
app.use(cors());

app.get('/api/produtos', async (req, res) => {
  try {
    console.log("aqui o chegou")
     res.json(jsonFiles);
    } catch (error) {
      console.error('Erro ao obter dados da API', error);
      // console.error('Resposta da API:', error.response.data);
      res.status(500).json({ error: 'Erro ao obter dados da API - Erro interno' });
    }
 });

 app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    setInterval(() => {
      console.log("Sorteio")
      inngest.send({
        name: "app/update.json",
      });
    }, 1000 * 60 * 5)
  });