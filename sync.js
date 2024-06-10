const sequelize = require('./config/sequelize');
const User = require('./models/userModel');

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');

     await User.create({ firstName: 'John',lastName: 'Doe', email: 'john.doe@example.com', password: 'password123' });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
