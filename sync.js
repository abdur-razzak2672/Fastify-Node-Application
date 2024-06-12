const sequelize = require('./config/sequelize');
const User = require('./models/userModel');
const bcrypt = require('bcrypt');

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');

    const hashedPassword = await bcrypt.hash("admin", 10);
    await User.create({ 
      firstName: 'Abdur', 
      lastName: 'Razzak', 
      email: 'razzak@gmail.com', 
      password: hashedPassword, 
      role: "superAdmin" 
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
