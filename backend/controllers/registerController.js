import bcrypt from "bcrypt";
import express from "express";
import db from "../db/db.js";

const saltRounds = 10;
const registerController = express.Router();

registerController.post("/", (req, res) => {
  const { username, useremail, userphone, userpassword } = req.body;
  const defaultStaffValue = 0;

  db.get(
    "SELECT * FROM users WHERE useremail = ? OR username = ? OR userphone = ?",
    [useremail, username, userphone],
    (err, user) => {
      if (err) {
        console.error("Erro ao verificar usuário:", err);
        return res.status(500).send({ msg: "Erro no servidor" });
      }
      if (!user) {
        bcrypt.hash(userpassword, saltRounds, (err, hash) => {
          if (err) {
            console.error("Erro ao criptografar a senha:", err);
            return res.status(500).send({ msg: "Erro ao criptografar a senha" });
          }

          db.run(
            "INSERT INTO users (username, useremail, userphone, userpassword, staff) VALUES (?, ?, ?, ?, ?)",
            [username, useremail, userphone, hash, defaultStaffValue],
            (err) => {
              if (err) {
                console.error("Erro ao cadastrar usuário:", err);
                return res.status(500).send({ msg: "Erro ao cadastrar usuário" });
              }
              res.send({ msg: "Cadastrado com sucesso!" });
            }
          );
        });
      } else {
        res.status(400).send({ msg: "Email, nome ou telefone já existem" });
      }
    }
  );
});

export default registerController;
