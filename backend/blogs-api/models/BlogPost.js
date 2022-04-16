const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  published: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'published',
  },
  updated: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated',
  },
};

module.exports = (sequelize) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    Attributes,
    {
      timestamps: false,
    },
  );
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return BlogPost;
};
