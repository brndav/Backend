const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class linea_eje extends Model{}

linea_eje.init({
    id_linea_eje:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false
    },
    id_eje:{
        type:DataTypes.INTEGER
    },
    id_linea:{
        type:DataTypes.INTEGER
    },
   
},{ 
   sequelize,
   modelName: "linea_eje",  
   timestamps: false, 
   freezeTableName: true,
   
});

linea_eje.belongsTo(require('./linea'), {foreignKey: 'id_linea',onDelete: 'CASCADE'});
linea_eje.belongsTo(require('./ejes'), {foreignKey: 'id_eje',attributes: ['descripcion_eje']});


module.exports =linea_eje;







