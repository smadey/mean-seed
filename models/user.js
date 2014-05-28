module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING(50)
        },
        age: {
            type: DataTypes.INTEGER(3)
        },
        sex: {
            type: DataTypes.STRING(5)
        },
        telphone: {
            type: DataTypes.INTEGER(11)
        },
        email: {
            type: DataTypes.STRING(50)
        },
        lastLoginTime: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                // User.hasMany(models.Other, { foreignKey: 'userId' });
            }
        }
    });

    return User;
};
