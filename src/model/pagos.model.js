const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_bd","root","admin",{
    host:"localhost",dialect:"mysql",port:"3306"});

    class pagos extends Model{}

pagos.init({
    id_pagos:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    voucher:{
        type: DataTypes.STRING
    },
    num_referencia:{
        type: DataTypes.INTEGER
    },
    idusuario:{
        type: DataTypes.INTEGER
    },
    idtipo_membresia:{
        type: DataTypes.INTEGER
    }


},{
    sequelize,
    tableName: 'pagos',
    timestamps: false,
    freezeTableName: true,
}
);

module.exports = pagos;

async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();