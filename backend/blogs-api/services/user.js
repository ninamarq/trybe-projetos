const { User } = require('../models');

const createUser = async (body) => {
  const { displayName, email, password, image } = body;
  const newUser = await User.create({
    displayName,
    email,
    password,
    image,
  });

  return newUser;
};

const allUsers = async () => {
  const users = await User.findAll();
    const userNoPassword = users.map((user) => {
      const objUser = {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        image: user.image,
      };
      return objUser;
    });
  return userNoPassword;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

module.exports = {
  createUser,
  allUsers,
  getUserById,
};