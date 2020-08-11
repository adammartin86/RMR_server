module.exports = (sequelize, DataTypes) => {
    const Build = sequelize.define("build", {
        motherboard: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpu: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gpu: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ram: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        case: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Build;
}