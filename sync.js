const sequelize = require('./config/sequelize');
const { User, UserRole } = require('./models/initializeModels');
const Blog = require('./models/blogModel');
const bcrypt = require('bcrypt');

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Synchronize models without dropping existing tables
    await sequelize.sync();

    console.log('All models were synchronized successfully.');

    // Check if UserRole with 'superAdmin' role exists
    const existingRole = await UserRole.findOne({ where: { role: 'superAdmin' } });
    if (!existingRole) {
      await UserRole.create({ role: 'superAdmin' });
    }

    // Check if user with email 'razzak@gmail.com' exists
    const existingUser = await User.findOne({ where: { email: 'razzak@gmail.com' } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      await User.create({
        firstName: 'Abdur',
        lastName: 'Razzak',
        email: 'razzak@gmail.com',
        password: hashedPassword,
        roleId: 1  // Assuming 'superAdmin' roleId is 1
      });
    }

    await Blog.create({
      image: 'https://via.placeholder.com/150',
      title: 'First Blog',
      description: 'This is the first blog',
      author : 'Abdur Razzak',
      views : 0,
     });




  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
