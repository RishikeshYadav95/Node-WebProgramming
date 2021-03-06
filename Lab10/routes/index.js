const routes = require("./session");

const constructmethod = app => {
    app.use("/", routes);
    app.use("/signup", routes);
    app.use("/login", routes);
    app.use("/private", routes);
    app.use("/logout", routes);
    app.use("*",(req,res) => {
        res.status(404).json({error:"404"});
});
};
module.exports = constructmethod;