const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');


 


class usuarios extends Model{}

usuarios.init({
    idusuario:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false,
    autoIncrement: true

    },
    nombre:{
        type:DataTypes.STRING
    },
    paterno:{
        type:DataTypes.STRING
    },
    materno:{
        
        type:DataTypes.STRING
    },
    telefono:{
        type:DataTypes.STRING
    },
    correo:{
        type:DataTypes.STRING,
        unique: true
    },
    contrasena:{
        type:DataTypes.STRING,
        allowNull:true
    },
    id_institucion:{
        type:DataTypes.INTEGER
    }

},{ 
   sequelize,
   modelName: "usuarios",  
   timestamps: false, 
   freezeTableName: true,
  
}
);

const Instituciones = require('./institucion');
usuarios.belongsTo(Instituciones, { foreignKey: 'id_institucion', as: 'institucion' });


module.exports = usuarios;







