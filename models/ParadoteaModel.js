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
            len: [3, 100]
        }
    },
    title:
    {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    delivery_date:
    {
        type: DataTypes.DATE,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    percentage:
    {
        type: DataTypes.FLOAT,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },

    ammount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },

    ammount_vat: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },

    ammount_total: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },

    estimate_payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true
        }
    },

    
    estimate_payment_date_2: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true
        }
    },

    
    estimate_payment_date_3: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true
        }
    }




},{
    freezeTableName: true
});

Paradotea.belongsTo(Erga, { foreignKey: 'erga_id' });
Paradotea.belongsTo(Timologia, { foreignKey: 'timologia_id', allowNull: true });

export default Paradotea;