import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Erga from "./ErgaModel.js";
const {DataTypes} = Sequelize;

const Ypoxreoseis = db.define('ypoxreoseis',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: true, // Allow empty values
        validate: {
            len: [3, 100]
        }
    },
    invoice_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    total_owed_ammount: {
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
    }
},{
    freezeTableName: true
});
Ypoxreoseis.belongsTo(Erga, { foreignKey: 'erga_id', allowNull: true ,onDelete:'SET NULL' });


export default Ypoxreoseis;