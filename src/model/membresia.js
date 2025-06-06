const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');
    class membresias extends Model{}

    membresias.init({
        id_tipo_membresia:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        opciones:{
            type: DataTypes.STRING
        },
        
    },{
        sequelize,
        modelName: 'membresias',
        timestamps: false,
        freezeTableName: true,
    });
    module.exports = membresias;
   