import { generateResetToken } from "./resetpasswordController.js";
import express from "express";
import db from "../db/db.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const forgotPasswordController = express.Router();

forgotPasswordController.use(express.json( { extended: false } ));

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("Erro na configuração do transporter: ", error);
  } else {
    console.log("O transporter está pronto para enviar emails", success);
  }
});

forgotPasswordController.post("/forgot-password", (req, res) => {
  console.log("Corpo da requisição:", req.body);

  const { useremail } = req.body;
  if (!useremail) {
    return res.status(400).send({ msg: "O campo useremail é obrigatório." });
  }

  console.log("useremail:", useremail);

  db.all(
    "SELECT * FROM users WHERE useremail = ?",
    [useremail],
    (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (result.length > 0) {
        const resetToken = generateResetToken(useremail, result[0].id);
        console.log("resetToken:", resetToken);
        const resetURL = `http://localhost:5173/api/auth/reset-password/${result[0].id}/${resetToken}`;

        

        const mailOptions = {
          from: "cauanlagrotta.dev@gmail.com",
          to: useremail,
          subject: "Redefinição de senha",
          text: `Você solicitou para redefinir sua senha. Clique no link abaixo para redefinir sua senha: ${resetURL}`,
          html: `<p>Você solicitou uma redefinição de senha. Clique no link a seguir para redefinir sua senha: <a href="${resetURL}">${resetURL}</a></p>`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error("Erro ao enviar email: ", err);
            return res.status(500).send({ msg: "Erro ao enviar email" });
          } else {
            console.log("Email enviado: ", info.response);
            console.log("Simulando envio de email: ", useremail);
            return res
              .status(200)
              .send({
                msg: "Email para redefinição de senha enviado com sucesso",
              });
          }
        });
      } else {
        return res.status(404).send({ msg: "Email não encontrado" });
      }
    }
  );
});

export default forgotPasswordController;