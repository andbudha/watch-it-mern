import UserModel from '../models/userModel.js';
import { encryptPassword, verifyPassword } from '../utils/passwordServices.js';
import { generateToken } from '../utils/tokenServices.js';

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
            avatar: '',
            password: encryptedPassword,
          });
          console.log(newUser);
          res.status(200).json({
            message:
              'User successfully registered. You may proceed to logging in now!',
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

const userLogin = async (req, res) => {
  console.log('Login:::', req.body);
  try {
    //1. Check if the email and password are present and in the correct way
    //2. Check if the user exists in the data base if the user does not exist
    //in the DB we should notify them somehow.
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(401).json({
        message:
          'Either the user does not exist or the entered credentials are invalid!',
      });
    }
    //3. If the user exists we must check if the entered password is a valid one by
    //converting into a readable form the password received from the backend.
    const isPasswordCorrect = await verifyPassword(
      req.body.password,
      existingUser.password
    );
    console.log('CorrectPassword:::', isPasswordCorrect);
    //4. Generate token

    const token = generateToken(existingUser._id);
    //5. If the token generation fails, then notify the user somehow
    if (!token) {
      console.log('Token geretation error"');
      res
        .status(401)
        .json({ message: 'Token generation failed. Try again later, please!' });
    }
    //6. If token generation succeeds, then proceed to the following login-step
    if (token) {
      res.status(200).json({
        message: 'You have successfully logged in!',
        user: {
          email: existingUser.email,
          userID: existingUser._id,
          avatar: existingUser.avatar,
          nickName: existingUser.nickName,
        },
        token,
      });
    }
  } catch (error) {
    console.log('login error::: ', error);
    res.status(401).json('Server error. User login failed!');
  }
};

const getUserProfile = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({
        message: 'User profile succeccfully received!',
        user: {
          avatar: req.user.avatar,
          email: req.user.email,
          userID: req.user._id,
          nickName: req.user.nickName,
        },
      });
    }
  } catch (error) {
    console.log('Getting User Profile Error:###', error);
    res.status(500).json('Server error. User registration failed!');
  }
};
export { registerNewUser, userLogin, getUserProfile };
