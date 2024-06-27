import jwt from 'jsonwebtoken';

const generateToken = (userID) => {
  const payload = {
    sub: userID,
  };
  const signOptions = {
    expiresIn: '7d',
  };
  const secretKey = process.env.JWTK_SECRET_KEY;
  const token = jwt.sign(payload, secretKey, signOptions);
  return token;
};

export { generateToken };
