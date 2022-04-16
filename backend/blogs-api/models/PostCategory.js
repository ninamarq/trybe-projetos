const { DataTypes } = require('sequelize');

const Attributes = {
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
};

module.exports = (sequelize) => {
  const PostCategory = sequelize.define('PostCategory', Attributes,
    { timestamps: false, tableName: 'PostsCategories' });
    PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      otherKey: 'postId',
      foreignKey: 'categoryId',
      // Pela tabela:::: PostsCategories
      through: 'PostsCategories',
      as: 'blogs',
    });
    models.BlogPost.belongsToMany(models.Category, {
      otherKey: 'categoryId',
      foreignKey: 'postId',
      // Pela tabela:::: PostsCategories
      through: 'PostsCategories',
      as: 'categories',
    });
  };

  return PostCategory;
};
