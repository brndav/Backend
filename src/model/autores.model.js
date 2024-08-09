const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize("congreso_bd","root","admin",{
  host:"localhost",dialect:"mysql",port:"3306"});

 class autores extends Model{}

 autores.init({
    id_autores: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       allowNull: false,
       autoIncrement: true
       },   
      
      idusuario: {
        type: DataTypes.INTEGER,
         allowNull: false,
       },
      id_registro: {
        type: DataTypes.INTEGER,
      },
      },{
        sequelize,
        modelName: 'autores',
        timestamps: false, 
        freezeTableName: true,
      });
      
module.exports=autores;

async function testConnection(){
    try{
        await autores.sync();
        console.log("Conexión a la BD aceptada");
    }catch(error){
        console.error("Conexión a la BD fallida", error);
    }
}
testConnection();