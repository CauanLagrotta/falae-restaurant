import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import express from "express";
import db from "../db/db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;
const resetPasswordRoute = express.Router();

export const generateResetToken = (useremail, id) => {
  const payload = { useremail, id };
  const options = { expiresIn: "1d" };
  const secret = process.env.TOKEN;
  return jwt.sign(payload, secret, options);
};

resetPasswordRoute.get("/reset-password/:userid/:token", (req, res) => {
  const { userid, token } = req.params;
  const secret = process.env.TOKEN;

  try {
    const payload = jwt.verify(token, secret);
    if (payload.id !== parseInt(userid, 10)) {
      return res.status(401).send({ msg: "Autenticação inválida" });
    }

    const frontendUrl = `http://localhost:5173/api/auth/reset-password/${userid}/${token}`;
    return res.redirect(frontendUrl);
  } catch (err) {
    console.log("Erro ao verificar token:", err);
    return res.status(401).send({ msg: "Token inválido" });
  }
});

resetPasswordRoute.post("/reset-password/:userid/:token", (req, res) => {
  const { userid, token } = req.params;
  const { userpassword } = req.body;

  const secret = process.env.TOKEN;

  try {
    const payload = jwt.verify(token, secret);
    if (payload.id !== parseInt(userid, 10)) {
      return res.status(401).send({ msg: "Autenticação inválida" });
    }

    db.get("SELECT * FROM users WHERE id = ?", [userid], (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!user) {
        return res.status(404).send({ msg: "Usuário não encontrado" });
      }

      bcrypt.compare(userpassword, user.userpassword, (err, isSamePassword) => {
        if (err) {
          return res.status(500).send({ msg: "Erro ao comparar senhas" });
        }
        if (isSamePassword) {
          return res.status(400).send({ msg: "A nova senha não pode ser igual à senha anterior" });
        }

        bcrypt.hash(userpassword, saltRounds, (err, hash) => {
          if (err) {
            console.error("Erro ao criptografar a senha:", err);
            return res.status(500).send({ msg: "Erro ao criptografar a senha" });
          }

          db.run("UPDATE users SET userpassword = ? WHERE id = ?", [hash, userid], (err) => {
            if (err) {
              console.error("Erro ao atualizar senha:", err);
              return res.status(500).send({ msg: "Erro ao atualizar senha" });
            }
            res.send({ msg: "Senha atualizada com sucesso" });
          });
        });
      });
    });
  } catch (err) {
    console.log("Erro ao verificar token:", err);
    return res.status(401).send({ msg: "Token inválido" });
  }
});

export default resetPasswordRoute;
