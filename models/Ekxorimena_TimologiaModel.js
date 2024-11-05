import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Timologia from "./TimologiaModel.js";
const {DataTypes} = Sequelize;

const Ekxorimena_Timologia = db.define('Ekxorimena_Timologia',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bank_ammount:
    {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    customer_ammount:
    {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
            isNumeric: true
        }
    },
    bank_date:
    {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    bank_estimated_date:
    {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    status_bank_paid:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    cust_date:
    {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    cust_estimated_date:
    {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    status_customer_paid:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
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
    timologia_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique:true
    }
},{
    freezeTableName: true
});
Ekxorimena_Timologia.belongsTo(Timologia, { foreignKey: 'timologia_id', allowNull: true,onDelete:"CASCADE" ,unique: true  });

// // Define a unique constraint separately
// Ekxorimena_Timologia.addIndex(['timologia_id'], {
//     unique: true
// });

export default Ekxorimena_Timologia;
