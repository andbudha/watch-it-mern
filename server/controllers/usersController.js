import UserModel from '../models/userModel.js';
import { encryptPassword, verifyPassword } from '../utils/passwordServices.js';
import { imageUpload } from '../utils/profileImageServices.js';
import { generateToken } from '../utils/tokenServices.js';

const registerNewUser = async (req, res) => {
  try {
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
      try {
        const encryptedPassword = await encryptPassword(req.body.password);
        if (encryptedPassword) {
          const newUser = await UserModel.create({
            ...req.body,
            avatar: '',
            password: encryptedPassword,
          });
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
    res
      .status(500)
      .json({ errorMessage: 'Server error. User registration failed!' });
  }
};

const userLogin = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (!existingUser) {
      res.status(401).json({
        errorMessage:
          'Either the user does not exist or the entered credentials are invalid!',
      });
    }
    const isPasswordCorrect = await verifyPassword(
      req.body.password,
      existingUser.password
    );
    const token = generateToken(existingUser._id);
    if (!token) {
      console.log('Token geretation error"');
      res
        .status(401)
        .json({ message: 'Token generation failed. Try again later, please!' });
    }
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
    res.status(401).json({ errorMessage: 'Server error. User login failed!' });
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
    res
      .status(500)
      .json({ errorMessage: 'Server error. User registration failed!' });
  }
};

const updateProfile = async (req, res) => {
  try {
    let avatarUrl;
    if (req.file) {
      avatarUrl = await imageUpload(req.file, 'watch_it');
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      {
        _id: req.body.userID,
      },
      {
        nickName: req.body.nickName,
        email: req.body.email,
        avatar: avatarUrl ? avatarUrl : '',
      },
      { new: true }
    );
    res.status(200).json({
      message: 'Profile updated!',
      updatedUser: {
        avatar: updatedUser.avatar,
        email: updatedUser.email,
        nickName: updatedUser.nickName,
        userID: updatedUser._id,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ errorMessage: 'Server error. Updating profile failed!' });
  }
};
export { registerNewUser, userLogin, getUserProfile, updateProfile };
