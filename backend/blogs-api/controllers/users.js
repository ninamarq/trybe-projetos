const jwtToken = require('../helpers/jwtToken');
const services = require('../services/user');

const postUser = async (req, res) => {
  try {
    const newUser = await services.createUser(req.body);
    // Referência Trybe Course e Monitoria Gaspar
    const token = jwtToken({ id: newUser.id, displayName: newUser.displayName });
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: 'User already registered' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await services.allUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await services.getUserById(id);
    if (!user) {
      return res.status(404).json({
        message: 'User does not exist',
      });
    }
    return res.status(200).json({
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      image: user.image,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  postUser,
  getUsers,
  getUserById,
};
