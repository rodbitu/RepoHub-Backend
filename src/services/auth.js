import bcrypt from 'bcryptjs';

export const createPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const checkPasswordHash = async (user, password) => {
  return await bcrypt.compare(password, user.password);
};
