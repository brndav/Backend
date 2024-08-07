const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("congreso_app","root","admin",{
    host:"localhost",dialect:"mysql",port:"3306"});

class linea_eje extends Model{}

linea_eje.init({
    id_linea_eje:{
    type: DataTypes.INTEGER,
   // defaultValue: DataTypes.UUIDV4,
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
   //createdAt: "createdAt",
   //updatedAt: "updatedAt"
});

linea_eje.belongsTo(require('../model/linea.model'), {

    foreignKey: 'id_linea',
    onDelete: 'CASCADE'
});
linea_eje.belongsTo(require('../model/ejes.model'), {

    foreignKey: 'id_eje',
  
    attributes: ['descripcion_eje']
  
  });


module.exports =linea_eje;







async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Conexión a la BD correcta")
    } catch(error){
        console.error("Conexión a la BD fallida", error)
    }
}
 testConnection();