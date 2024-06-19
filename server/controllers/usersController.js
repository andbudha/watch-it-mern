const registerNewUser = async (req, res) => {
  try {
    res
      .status(200)
      .json({
        message: 'User registered!',
        email: req.body.email,
        password: req.body.password,
      });
  } catch (error) {
    res.status(500).json('Server error. User registration failed!');
  }
};

export { registerNewUser };
