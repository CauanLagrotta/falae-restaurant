export const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).send({ msg: "Autenticação inválida" });
    }
    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
      if (err) {
        console.log("Erro ao verificar token:", err);
        return res.status(401).send({ msg: "Autenticação inválida" });
      }
      db.get("SELECT * FROM users WHERE id = ?", [decoded.id], (err, user) => {
        if (err || !user) {
          console.log("Usuário não encontrado ou erro no banco de dados:", err);
          return res.status(401).send({ msg: "Usuário não encontrado" });
        }
        req.user = user;
        next();
      });
    });
  };