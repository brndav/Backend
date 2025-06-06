const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');
   

class evaluadors extends Model{}

evaluadors.init({
    
    id_evaluador:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false
    },
    idusuario:{
        type:DataTypes.INTEGER
    },
    id_registros:{
        type:DataTypes.INTEGER
    },
    id_status:{
        type:DataTypes.INTEGER
    },
    idinfo_pago:{
        type:DataTypes.INTEGER
    },
   
  
},{ 
   sequelize,
   modelName: "evaluador",  
   timestamps: false, 
   freezeTableName: true,
   
}
);

evaluadors.belongsTo(require('./usuario'), { as: 'usuario', foreignKey: 'idusuario' });
evaluadors.belongsTo(require('./registro'), { as: 'registro', foreignKey: 'id_registros' });
evaluadors.belongsTo(require('./status_registro'), { as: 'status', foreignKey: 'id_status' });
evaluadors.belongsTo(require('./info_pago'), { as: 'info_pago', foreignKey: 'idinfo_pago' });

module.exports =evaluadors;







