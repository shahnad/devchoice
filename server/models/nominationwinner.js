module.exports = (sequelize, DataTypes) => {
    const nominationwinner = sequelize.define('nominationwinner', {
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
        winner: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: true,
        tableName: 'nominationwinner'
    });

    return nominationwinner;
};