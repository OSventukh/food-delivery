import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

export const comparePassword = async (password:string, hash:string) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
