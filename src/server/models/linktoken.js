module.exports = (sequelize, DataTypes) => {
    const linktoken = sequelize.define('linktoken', {
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.STRING(200),
        },
		createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        expiredAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: true,
        tableName: 'linktoken'
    });

    return linktoken;
};