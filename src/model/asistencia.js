const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

    class asistencias extends Model {}

    asistencias.init({
        id_asistencia:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        idusuario:{
            type: DataTypes.INTEGER
        }, 
        id_programa_registro:{
            type: DataTypes.INTEGER
    },
    },{
        sequelize,
        modelName: 'asistencia',
        timestamps: false,
        freezeTableName: true,
       
    });
    module.exports = asistencias;

   