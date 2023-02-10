const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

class Comment extends Model {}

Comment.init(
  {
   body: {
    type: DataTypes.STRING,
    allowNull: false,
},
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Post',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id',
        }
    
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Comment",
  }
);

module.exports = Comment;
