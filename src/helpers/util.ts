const bcrypt = require('bcrypt');
const salRounds = 10;

export const hashPasswordHelper = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, salRounds);
  } catch (error) {
    console.log(error);
  }
};
