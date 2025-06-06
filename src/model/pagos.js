const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('./conexionbd');

    class pagos extends Model{}

pagos.init({
    id_pagos:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    num_referencia:{
        type: DataTypes.STRING
    },
    idusuario:{
        type: DataTypes.INTEGER
    },
    fecha_hora:{
        type: DataTypes.DATE
    },
    idtipo_pago:{
        type: DataTypes.INTEGER
    }
},{
    sequelize,
    tableName: 'pagos',
    timestamps: false,
    freezeTableName: true,
}
);

pagos.belongsTo(require('./usuario'), {
    foreignKey: 'idusuario',
    as: 'usuario', 
    attributes: ['nombre', 'paterno', 'materno']
});

pagos.belongsTo(require('./tipo_pago'), {
    foreignKey: 'idtipo_pago',
    as: 'tipo_pago', 
    attributes: ['idtipo_pago', 'opciones']
});


module.exports = pagos;

