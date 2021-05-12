module.exports = (sequelize, DataTypes) => {
    const nominations = sequelize.define('nominations', {
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
        nomineename: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        nominatedby: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
		createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: true,
        tableName: 'nominations'
    });

    return nominations;
};