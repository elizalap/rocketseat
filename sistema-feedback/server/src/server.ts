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

//configuração do mailtrap
const transport = nodemailer.createTransport({
   host: "smtp.mailtrap.io",
   port: 2525,
   auth: {
      user: "b84b0558599958",
      pass: "cd912a1fa91cc0"
   }
});

app.post('/feedbacks', async (req, res) => {
   const { type, comment, screenshot } = req.body;

   const feedback = await prisma.feedback.create({
      data: {
         type,
         comment,
         screenshot,
      }
   })

   transport.sendMail({
      from: 'Equipe Feedget <eliza.lima@feedget.com>',
      to: 'Eliza Lima <eliza.lima@gmail.com>',
      subject: 'Novo feedback',
      html: [
         `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
         `<p>Tipo de feedback: ${type}</p>`,
         `<p>Comentário: ${comment}</p>`,
         `</div>`
      ].join('\n')
   });

   return res.status(201).json({ data: feedback });
})


app.listen(3333, () => {
   console.log('HTTP server running!');
});

