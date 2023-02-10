const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/config");

class User extends Model {
  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  static async verifyPassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await User.hashPassword(user.password);
        return user;
      },
      beforeUpdate: async (user) => {
        user.password = await User.hashPassword(user.password);
        return user;
      },
    },
    sequelize,
    modelName: "User",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = User;
