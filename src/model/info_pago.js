const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class info_pago extends Model{}

info_pago.init({
    idinfo_pago:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false
    },
    id_status:{
        type:DataTypes.INTEGER
    },
    id_pagos:{
        type:DataTypes.INTEGER
    },
   
},{ 
   sequelize,
   modelName: "info_pago",  
   timestamps: false, 
   freezeTableName: true,
   
});

info_pago.belongsTo(require('./status_registro'), { as: 'status', foreignKey: 'id_status' });
info_pago.belongsTo(require('./pagos'), { as: 'pagos', foreignKey: 'id_pagos' });

module.exports = info_pago;
