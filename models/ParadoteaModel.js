import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Erga from "./ErgaModel.js";
import Timologia from "./TimologiaModel.js";

const {DataTypes} = Sequelize;

const Paradotea = db.define('paradotea', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    part_number:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 100]
        }
    },
    title:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 500]
        }
    },
    delivery_date:
    {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    percentage:
    {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

    ammount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },

    ammount_vat: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },

    ammount_total: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },

    estimate_payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },

    
    estimate_payment_date_2: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },

    
    estimate_payment_date_3: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    comments:
    {
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
            len: [0, 500]
        }
    },




},{
    freezeTableName: true
});

Paradotea.belongsTo(Erga, { foreignKey: 'erga_id' });
Paradotea.belongsTo(Timologia, {as: 'timologia', foreignKey: 'timologia_id', allowNull: true ,onDelete:'SET NULL'});

export default Paradotea;
