import express from "express";
import db from "../db/db.js";

const productController = express.Router();

productController.post("/products", (req, res) => {
  const {
    productname,
    productprice,
    productcategory,
    productdescription,
    productImageUrl,
  } = req.body;

  if (!productname || !productprice || !productcategory) {
    return res.status(400).send({ msg: "Nome, preço e categoria são obrigatórios!" });
  }

  if (productprice <= 0) {
    return res.status(400).send({ msg: "Preço inválido! Deve ser maior que 0." });
  }

  db.run(
    "INSERT INTO Product (productname, productprice, productcategory, productdescription, productImageUrl) VALUES (?, ?, ?, ?, ?)",
    [productname, productprice, productcategory, productdescription, productImageUrl],
    (err) => {
      if (err) {
        console.error("Erro ao criar produto:", err);
        return res.status(500).send({ msg: "Erro ao criar produto" });
      }
      res.send({ msg: "Produto criado com sucesso!" });
    }
  );
});

productController.get("/products", (req, res) => {
  db.all("SELECT * FROM Product", [], (err, products) => {
    if (err) {
      console.error("Erro ao obter produtos:", err);
      return res.status(500).send({ msg: "Erro ao obter produtos" });
    }
    res.send(products);
  });
});

productController.get("/products/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT * FROM Product WHERE id = ?", [id], (err, product) => {
    if (err) {
      console.error("Erro ao obter produto:", err);
      return res.status(500).send({ msg: "Erro ao obter produto" });
    }
    if (!product) {
      return res.status(404).send({ msg: "Produto não encontrado" });
    }
    res.send(product);
  });
});


productController.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const {
    productname,
    productprice,
    productcategory,
    productdescription,
    productImageUrl,
  } = req.body;

  if (!productname || !productprice || !productcategory) {
    return res.status(400).send({ msg: "Nome, preço e categoria são obrigatórios!" });
  }

  if (productprice <= 0) {
    return res.status(400).send({ msg: "Preço inválido! Deve ser maior que 0." });
  }

  db.run(
    `UPDATE Product SET productname = ?, productprice = ?, productcategory = ?, productdescription = ?, productImageUrl = ? WHERE id = ?`,
    [
      productname,
      productprice,
      productcategory,
      productdescription,
      productImageUrl,
      id,
    ],
    function (err) {
      if (err) {
        console.error("Erro ao editar produto:", err);
        return res.status(500).send({ msg: "Erro ao editar produto" });
      }
      if (this.changes === 0) {
        return res.status(404).send({ msg: "Produto não encontrado" });
      }
      res.send({ msg: "Produto atualizado com sucesso!" });
    }
  );
});

productController.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM Product WHERE id = ?", [id], function (err) {
    if (err) {
      console.error("Erro ao excluir produto:", err);
      return res.status(500).send({ msg: "Erro ao excluir produto" });
    }
    if (this.changes === 0) {
      return res.status(404).send({ msg: "Produto não encontrado" });
    }
    res.send({ msg: "Produto excluído com sucesso!" });
  });
});

export default productController;
