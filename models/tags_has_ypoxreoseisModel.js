import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Ypoxreoseis from "./YpoxreoseisModel.js";
import Tags from "./TagsModel.js";
const {DataTypes} = Sequelize;

const tags_has_ypoxreoseis = db.define('tags_has_ypoxreoseis',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
},{
    freezeTableName: true
});
tags_has_ypoxreoseis.belongsTo(Ypoxreoseis, { foreignKey: 'ypoxreoseis_id' });
tags_has_ypoxreoseis.belongsTo(Tags,{foreignKey:'tags_id'})

export default tags_has_ypoxreoseis;