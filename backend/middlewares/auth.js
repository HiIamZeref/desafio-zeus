import jwt from "jsonwebtoken";

function checkUserToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({
      status: "error",
      message: "Token não fornecido!",
    });
  }

  try {
    const secret = process.env.SECRET;
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: "Token inválido!",
    });
  }
}

export { checkUserToken };
