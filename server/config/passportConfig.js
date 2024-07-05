import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import UserModel from '../models/userModel.js';
import 'dotenv/config';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTK_SECRET_KEY,
};
const passportStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  done
) {
  try {
    const user = await UserModel.findOne({ _id: jwt_payload.sub });
    if (user) {
      console.log('User:::', user);
      return done(null, user);
    }
    if (!user) {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

export default passportStrategy;
