const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');


const Blog = sequelize.define('Blog', {
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});


module.exports = Blog;