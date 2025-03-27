import express from "express";
import cors from "cors";
import session from "express-session";
import db from "./config/Database.js";
import dotenv from "dotenv";
import  SequelizeStore  from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import CustomerRoute from "./routes/CustomerRoute.js"
import ErgaRoute from "./routes/ErgaRoute.js";
import ParadoteaRoute from "./routes/ParadoteaRoute.js";
import DaneiaRoute from "./routes/DaneiaRoute.js";
import ErgaCatRoute from "./routes/ErgaCatRoute.js";
import TagsRoute from "./routes/TagsRoute.js";
import YpoxreoseisRoute from "./routes/YpoxreoseisRoute.js";

import DoseisRoute from "./routes/DoseisRoute.js";
import Tags_Has_YpoxreoseisRoute from "./routes/Tags_Has_YpoxreoseisRoute.js"

import Ek_timologiaRoute from "./routes/Ek_timologiaRoute.js"
import IncomeRoute from "./routes/IncomeRoute.js"
import Queries from "./routes/QueriesRoute.js"
import BudgetRoute from "./routes/BudgetRoute.js"

import AuthRoute from "./routes/AuthRoute.js";
import Timologia_Route from "./routes/Timologia_Route.js";
import bodyParser from "body-parser";
import Paradotea from "./models/ParadoteaModel.js";
import Customer from "./models/CustomerModel.js";
import Erga from "./models/ErgaModel.js";
import timologia from "./models/TimologiaModel.js";
import Users from "./models/UserModel.js";
import incomes from "./models/incomesModel.js";
import Daneia from "./models/DaneiaModel.js";
import Ekxorimena_Timologia from "./models/Ekxorimena_TimologiaModel.js"
import ErgaCategories from "./models/ErgaCategoriesModel.js";
import Ypoxreoseis from "./models/YpoxreoseisModel.js";
import Doseis from "./models/DoseisModel.js";
import Tags from "./models/TagsModel.js";
import tags_has_ypoxreoseis from "./models/tags_has_ypoxreoseisModel.js";
import Budget from "./models/BudgetModel.js";

console.log("hey")
dotenv.config();

const app = express();
app.use(bodyParser.json());

const sessionStore=SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
});
app.use('/uploads', express.static('uploads'));

(async()=>{
    await db.sync();
    await Customer.sequelize.sync();
    await Erga.sequelize.sync();
    await Daneia.sequelize.sync();
    await Paradotea.sequelize.sync();
    await timologia.sequelize.sync();
    await Users.sequelize.sync();
    await incomes.sequelize.sync();
    await Ekxorimena_Timologia.sequelize.sync();
    await ErgaCategories.sequelize.sync();
    await Ypoxreoseis.sequelize.sync();
    await Doseis.sequelize.sync();
    await Tags.sequelize.sync();
    await tags_has_ypoxreoseis.sequelize.sync();
    await Budget.sequelize.sync();
    
})();




app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:"true",
    store:store,
    cookie:{
        secure:false,
        httpOnly:true,
        sameSite:"lax"
    }
}))

app.use(cors({
    credentials:true,
    origin:'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
    preflightContinue: false,  // Set to false to handle OPTIONS in route
    optionsSuccessStatus: 204,  // 204 status code for successful OPTIONS request
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE','PATCH'],
}));



app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(CustomerRoute);
app.use(ErgaRoute);
app.use(ParadoteaRoute);
app.use(Timologia_Route)
app.use(DaneiaRoute);
app.use(Ek_timologiaRoute);
app.use(IncomeRoute);
app.use(ErgaCatRoute);
app.use(Queries);
app.use(YpoxreoseisRoute);
app.use(TagsRoute);
app.use(DoseisRoute);
app.use(Tags_Has_YpoxreoseisRoute);
app.use(BudgetRoute)

store.sync();

app.listen(process.env.APP_PORT,()=>{
    console.log('Server up and runningg....');
});