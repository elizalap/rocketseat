/**
 * ROTA TESTE
 * app.get('/users', (req, res) => {
   return res.send('Hello world');
})

GET, POST, PUT, PATCH E DELETE

GET = Buscar informações
POST = Cadastrar informações
PUT = Atualizar informações de uma entidade
PATCH = Atualizar uma informação única de uma entidade
DELETE = Deletar uma informação

*/

import express from 'express'
import { prisma } from './prisma';
import nodemailer from 'nodemailer'

const app = express();

//middleware - verificar antes de processar a rota de cadastro de feedbacks
app.use(express.json());

app.post('/feedbacks', async (req, res) => {
   const { type, comment, screenshot } = req.body;

   const feedback = await prisma.feedback.create({
      data: {
         type,
         comment,
         screenshot,
      }
   })
   return res.status(201).json({ data: feedback });
})


app.listen(3333, () => {
   console.log('HTTP server running!');
});

