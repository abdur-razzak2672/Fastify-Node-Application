const bcrypt = require('bcryptjs');
const fastify = require('fastify')({ logger: true });
const authServices = require('../services/authServices');
const userService = require('../services/userServices');

exports.register = async (request, res) => {
  try {
    const { firstName, lastName, email, password,roleId } = request.body;
    
    if (!firstName || !lastName || !email || !password || !roleId) {
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
    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",roleId)
    const newUser = await authServices.registerUser(
      {
        firstName,
        lastName, 
        email,
        password: hashedPassword,
        roleId
      }
    );
    res.status(201).send({
      status: 'success',
      statusCode: 201,
      message: 'User registration successfully',
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


exports.login = async (request, reply) => {
  const { email, password } = request.body;
  try {
    const user = await authServices.authenticateUser({ email, password });
    const token = request.server.jwt.sign(
      { id: user.id, email: user.email, role: user.UserRole.role },
      { expiresIn: '30m' }
    );
    reply.status(200).send({
      status: 'success',
      statusCode: 200,
      message: 'User login successfully',
      data: { user, token }
    });
  } catch (error) {
    reply.status(403).send({
      status: 'error',
      statusCode: 403,
      message: 'Invalid Email or Password'
    });
  }
};
