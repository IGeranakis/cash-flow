import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Erga from "./ErgaModel.js";
import Ypoxreoseis from "./YpoxreoseisModel.js";
const {DataTypes} = Sequelize;

const Doseis = db.define('doseis',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ammount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },
    actual_payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    estimate_payment_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true, // Allow empty values
        validate: {
            len: [1, 100]
        }
    },
    comment:{
        type: DataTypes.STRING,
        allowNull: true, // Allow empty values
        validate: {
            len: [1, 300]
        }
    }
},{
    freezeTableName: true
});


export default Doseis;