import UserModel from '../models/userModel.js';

const registerNewUser = async (req, res) => {
  console.log(req.body);
  try {
    const response = await UserModel.create(req.body);
    console.log(response);
    res.status(200).json({
      message: 'User registered!',
      email: req.body.email,
      password: req.body.password,
      nickName: req.body.nickName,
    });
  } catch (error) {
    res.status(500).json('Server error. User registration failed!');
  }
};

export { registerNewUser };
