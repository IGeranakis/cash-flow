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
        type: DataTypes.FLOAT,
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
            len: [3, 100]
        }
    }
},{
    freezeTableName: true
});
Doseis.belongsTo(Ypoxreoseis, { foreignKey: 'ypoxreoseis_id' });


export default Doseis;