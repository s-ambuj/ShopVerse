import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ success: false, message: "Unauthorized access !!" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });

  }
}

export default auth;