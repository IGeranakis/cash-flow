import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Customer from "./CustomerModel.js";
import ErgaCategories from "./ErgaCategoriesModel.js";
const {DataTypes} = Sequelize;

const Erga = db.define('erga',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true, // Allow empty values
        validate: {
            len: [3, 100]
        }
    },
    color:{
        type: DataTypes.STRING,
        allowNull: false, // Allow empty values
    },
    sign_date: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    sign_ammount_no_tax: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },
    estimate_start_date: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true
        }
    },
    project_manager: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [3, 100]
        }
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: true
        }
    },

    shortname: {
        type: DataTypes.STRING,
        allowNull: true, // Allow empty values
        validate: {
            len: [2, 100]
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
Erga.belongsTo(Customer, { foreignKey: 'customer_id' });
Erga.belongsTo(ErgaCategories, { foreignKey: 'erga_cat_id' });


export default Erga;