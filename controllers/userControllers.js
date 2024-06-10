const userService = require('../services/userServices');
const fastify = require('fastify')({ logger: true });
const bcrypt = require('bcrypt');



fastify.addHook('onRequest', async (request, reply) => {
  console.log('Request received');

});

exports.getUsers = async (request, res) => {
  try {
    const users = await userService.getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.getUserById = async (request, res) => {
  try {
    console.log(`Fetching user with ID: ${request.params.id}`);
    const user = await userService.getUserById(request.params.id);
    console.log("fffff", user);
    if (!user) {
      res.status(404).send({ error: 'User not found' });
    } else {
      res.send(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};


exports.createUser = async (request, res) => {
  try {
    const { firstName, lastName, email, password } = request.body;

    if (!firstName || !lastName || !email || !password) {
      res.status(400).send({ error: 'All fields (firstName, lastName, email, password) are required.' });
      return;
    }

    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      res.status(400).send({ error: 'Email already exists.' });
      return;
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userService.createUser({ firstName, lastName, email, password: hashedPassword });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.updateUser = async (request, res) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    const updatedUser = await userService.updateUser(request.params.id, { firstName, lastName, email, password });
    if (!updatedUser) {
      res.status(404).send({ error: 'User not found' });
    } else {
      res.send(updatedUser);
    }
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.deleteUser = async (request, res) => {
  try {
    const result = await userService.deleteUser(request.params.id);
    if (!result) {
      res.status(404).send({ error: 'User not found' });
    } else {
      res.status(204).send("user deleted successfully");
    }
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};
