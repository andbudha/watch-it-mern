import UserModel from '../models/userModel.js';
import { encryptPassword } from '../utils/passwordServices.js';

const registerNewUser = async (req, res) => {
  console.log(req.body);

  try {
    //1. check for existing user email and/or nickName
    const existingUserEmail = await UserModel.findOne({
      email: req.body.email,
    });
    const existingUserNickName = await UserModel.findOne({
      nickName: req.body.nickName,
    });
    if (existingUserEmail) {
      res.status(500).json({
        errorMessage: 'Email alrady in use. Pick another email, please!',
      });
      return;
    }
    if (existingUserNickName) {
      res.status(500).json({
        errorMessage:
          'The entered nickname is alrady in use. Pick another nickname, please!',
      });
      return;
    }
    if (!existingUserEmail && !existingUserNickName) {
      //encrypting password
      try {
        //if encryption succeeds store the user in the DBs
        const encryptedPassword = await encryptPassword(req.body.password);
        if (encryptedPassword) {
          const newUser = await UserModel.create({
            ...req.body,
            avatar: 'no avatar available now',
            password: encryptedPassword,
          });
          console.log(newUser);
          res.status(200).json({
            message: 'User registered!',
            newUser,
          });
        }
      } catch (error) {
        console.log('Passowrd encrypting error::::'), error;
        return;
      }
    }
  } catch (error) {
    console.log('regitration error: ', error);
    res.status(500).json('Server error. User registration failed!');
  }
};

export { registerNewUser };
