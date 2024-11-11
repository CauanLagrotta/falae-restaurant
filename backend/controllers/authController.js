import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import { verifyUser } from "../middlewares/authMiddleware.js";
import db from "../db/db.js";

const authController = express.Router();

authController.post("/login", (req, res) => {
  const { useremail, userpassword } = req.body;

  db.get("SELECT * FROM users WHERE useremail = ?", [useremail], (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (user) {
      bcrypt.compare(userpassword, user.userpassword, (err, match) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (match) {
          const id = user.id;
          const accessToken = jwt.sign({ id }, process.env.TOKEN, {
            expiresIn: "1d",
          });

          res.cookie("token", accessToken);
          res.send({ msg: "Login efetuado com sucesso", accessToken });
        } else {
          res.status(400).send({ msg: "Senha incorreta" });
        }
      });
    } else {
      res.status(404).send({ msg: "Email não encontrado" });
    }
  });
});

authController.get("/header", verifyUser, (req, res) => {
  return res.status(200).send({ msg: "Autenticação bem-sucedida", user: req.user });
});

authController.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).send({ msg: "Logout bem-sucedido" });
});

export default authController;