const sequelize = require('./config/sequelize');
const { User, UserRole } = require('./models/initializeModels');
 const bcrypt = require('bcrypt');
 
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');

    const hashedPassword = await bcrypt.hash("admin", 10);
    await UserRole.create({ role: 'superAdmin' });

    await User.create({ 
      firstName: 'Abdur', 
      lastName: 'Razzak', 
      email: 'razzak@gmail.com', 
      password: hashedPassword, 
      roleId: 1
     });


  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
