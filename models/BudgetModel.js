import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const {DataTypes} = Sequelize;

const Budget = db.define('budget',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ammount:
    {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },
    date:
    {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    }
    },{
        freezeTableName: true
    });


export default Budget