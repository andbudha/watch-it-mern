import bcrypt from 'bcrypt';

const encryptPassword = async (newUserPassword) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newUserPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.log('hashig password error: ', error);
    return null;
  }
};

const verifyPassword = async (enteredPassword, hashedPassword) => {
  const correctPassword = await bcrypt.compare(enteredPassword, hashedPassword);
  return correctPassword;
};

export { encryptPassword, verifyPassword };
