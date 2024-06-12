const bcrypt = require('bcrypt');
const fastify = require('fastify')({ logger: true });
const authServices = require('../services/authServices');
const userService = require('../services/userServices');

exports.register = async (request, res) => {
    try {
        const { firstName, lastName, email, password } = request.body;
        if (!firstName || !lastName || !email || !password) {
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
        const newUser = await authServices.registerUser(
          { 
            firstName,
            lastName, email,
            password: hashedPassword,
            role: "admin"
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
        console.log("user bb",user);
        // const token = request.jwt.sign({ id: user.id, email: user.email });
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyYWoiLCJpYXQiOjE3MTc5MTU0ODl9.T9eR26uhkANpcptGidZ2P3GYrFpElInuh_F7P8jULHU"
 
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
