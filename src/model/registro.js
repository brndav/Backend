const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

class registros extends Model {}

registros.init({
    id_registros:{
    type: DataTypes.INTEGER,
   
    primaryKey: true,
    allowNull:false,
    autoIncrement: true
    },
    titulo:{
        type:DataTypes.TEXT
    },
    resumen:{
        type:DataTypes.TEXT
    },
    abstract:{
        type:DataTypes.TEXT
    },
    resena_curricular:{
        type:DataTypes.TEXT
    },
    foto:{
        type:DataTypes.STRING
    },
    idusuario:{
        type:DataTypes.INTEGER,
        allowNull:true
    },       
    id_linea_eje:{
        type:DataTypes.INTEGER,
       
    },
    id_forma:{
        type:DataTypes.INTEGER   
        
    },
    id_modalidad:{
        type:DataTypes.INTEGER,
                 
    },
    id_perfil:{
        type:DataTypes.INTEGER,
        allowNull:true
    }, 
    id_evento:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
     fecha_registro:{
        type: DataTypes.DATE
    }
},{ 
   sequelize,
   modelName: "registros",  
   timestamps: false, 
   freezeTableName: true,
   
}
);

registros.belongsTo(require('./usuario'), {
    foreignKey: 'idusuario',
    as: 'usuario', 
    attributes: ['nombre', 'paterno', 'materno']
});

registros.belongsTo(require('./perfil'), {
    foreignKey: 'id_perfil',
    as: 'perfil', 
    attributes: ['perfiles']
});

registros.belongsTo(require('./linea_eje'), {
    foreignKey: 'id_linea_eje',
    as: 'linea_eje', 
    attributes: ['id_eje', 'id_linea']
});

registros.belongsTo(require('./forma_presentacion'), {
    foreignKey: 'id_forma',
    as: 'forma_presentacion', 
    attributes: ['descripcion']
});

registros.belongsTo(require('./mod_expo'), {
    foreignKey: 'id_modalidad',
    as: 'modalidad',  // 
    attributes: ['descripcion']  
});


registros.belongsTo(require('./evento'), {
    foreignKey: 'id_evento',
    as: 'evento',  
    attributes: ['id_evento','nombre']  
});



registros.hasMany(require('./asesor_reg'), {
    as: 'asesores',
    foreignKey: 'id_registros'
});

module.exports =registros;


