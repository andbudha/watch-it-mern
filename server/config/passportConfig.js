import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import UserModel from '../models/userModel.js';
const secretKey = process.env.JWTK_SECRET_KEY;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: '667d4bf27194f3cd37629a50',
  // secretOrKey: secretKey,
};
const passportStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  done
) {
  try {
    console.log('jwt_payload:::', jwt_payload);
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
