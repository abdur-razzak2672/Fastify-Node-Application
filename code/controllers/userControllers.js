const userService = require('../services/userServices');
 const bcrypt = require('bcryptjs');


exports.getUsers = async (request, res) => {
  // console.log("hello world == ")
  // res.send("hello world --")
  try {
    const users = await userService.getAllUsers();
    res.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Users fetched successfully',
      data: users
    });
  } catch (error) {
    res.status(500).send({ 
      status: 'error',
      statusCode: 500,
      message: 'Internal Server Error'
     });
  }
};

exports.getUserById = async (request, res) => {
  try {
    console.log(`Fetching user with ID: ${request.params.id}`);
    const user = await userService.getUserById(request.params.id);
     if (!user) {
      res.status(404).send({
        status: 'error',
        statusCode: 404,
        message: 'User not found'
      });
    } else {
      res.status(200).send({
        status: 'success',
        statusCode: 200,
        message: 'User fetched successfully',
        data: user
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 'error',
      statusCode: 500,
      message: 'Internal Server Error'
    });
  }
};


exports.createUser = async (request, res) => {
  try {
    const { firstName, lastName, email, password,roleId } = request.body;
    if (!firstName || !lastName || !email || !password|| !roleId) {
      res.status(400).send({
        status: 'error',
        statusCode: 400,
        message: 'All fields are required'
       });
      return;
    }


    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      res.status(400).send({ 
        status: 'error',
        statusCode: 400,
        message: 'Email already exists.'
       });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser(
      { 
        firstName,
        lastName, email,
        password: hashedPassword,
        roleId: roleId
        }
    );
    res.status(201).send({
      status: 'success',
      statusCode: 201,
      message: 'User create successfully',
      data: newUser
    
    });
  } catch (error) {
    res.status(500).send({
      status: 'error',
      statusCode: 500,
      message: 'Internal Server Error'
     
    });
  }
};


exports.updateUser = async (request, res) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    const updatedUser = await userService.updateUser(request.params.id, { firstName, lastName, email, password});
    if (!updatedUser) {
      res.status(404).send({ 
        status: 'error',
        statusCode: 404,
        message: 'User not found'
      });
    } else {
      res.send(updatedUser);
    }
  } catch (error) {
    res.status(500).send({ 
      status: 'error',
      statusCode: 500,
      message: 'Internal Server Error'
    });
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
