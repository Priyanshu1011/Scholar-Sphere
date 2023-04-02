const express = require("express");
const bodyParser = require("body-parser");
const output = require(__dirname + "/showOutput.js");
const _ = require("lodash");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
// app.use(express.static(__dirname + '/public'));
let isLogin = false;

// Add app.use(session) code after previous app.use() and before mongoose.connect()
// We have set up our session
app.use(session({
    secret: "Our little secret.", 
    resave: false, 
    saveUninitialized: false
}));
// Right below, initialize passport
app.use(passport.initialize());
// Use passport to also set up our session
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/ScholarSphereDB");
const userSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    username: String, 
    password: String
});
const fileSchema = new mongoose.Schema({
    coursename: String, 
    moduleno: Number, 
    fileURL: String
});

// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);
const File = new mongoose.model("File", fileSchema);

// After mongoose model, passport config
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// ----------------------------------
// GET and POST requests

app.get("/", function(req, res){
    res.render('home', {isLogin: isLogin});
});

app.get("/notes", function(req, res){
    res.render('notes', {isLogin: isLogin});
});

app.get("/question-papers", function(req, res){
    res.render('question-papers', {isLogin: isLogin});
});

// app.get("/question-papers/", function(req, res){
//     res.render('question-papers');
// });

app.get("/gradcal", function(req, res){
    res.render('gradcal', {output:'', isLogin: isLogin});
});

app.post("/gradcal", function(req, res){
    res.render('gradcal', {output:'', isLogin: isLogin});
});

app.get("/login", function(req, res){
    res.render('login', {isLogin: isLogin});
});

app.post("/register", function(req, res){

    User.register({name: req.body.name, email: req.body.email, username: req.body.username}, req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/login");
        } else {
            passport.authenticate("local")(req, res, function(){
                console.log("User registered and logged in!");
                isLogin = true;
                res.render("home", {isLogin: isLogin});
            });
        }
    });
});

app.post("/login", function(req, res){

    const user = new User({
        name: req.body.name, 
        email: req.body.email, 
        username: req.body.username, 
        password: req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                console.log("User logged in!");
                isLogin = true;
                res.render("home", {isLogin: isLogin});
            });
        }
    });
});

app.get("/logout", function(req, res){
    req.logout(function(err){
        if(err) {
            return next(err);
        } else {
            isLogin = false;
            console.log("User logged out!");
            res.redirect("/");
        }
    });
});


app.get("/notes/:course", function(req, res){
    const courseLodash = _.startCase(req.params.course);
    const courseName = req.params.course;
    // console.log(courseName);
    res.render('module-page', {courseLodash: courseLodash, courseName: courseName, isLogin: isLogin});
});

app.get("/question-papers/:course", function(req, res){
    //console.log(req.params.course); // engineering-chemistry
    //console.log(_.startCase(req.params.course)); // Engineering Chemistry
    const courseLodash = _.startCase(req.params.course);
    const courseName = req.params.course;
    res.render('question-page', {courseLodash: courseLodash, courseName: courseName, isLogin: isLogin});
});



app.post("/calc-1", function(req, res){
    const data = req.body;
    let numerator = Number(data.credits1)*Number(data.grade1) + Number(data.credits2)*Number(data.grade2) + Number(data.credits3)*Number(data.grade3) + Number(data.credits4)*Number(data.grade4) + Number(data.credits5)*Number(data.grade5) + Number(data.credits6)*Number(data.grade6) + Number(data.credits7)*Number(data.grade7) + Number(data.credits8)*Number(data.grade8) + Number(data.credits9)*Number(data.grade9) + Number(data.credits10)*Number(data.grade10) + Number(data.credits11)*Number(data.grade11) + Number(data.credits12)*Number(data.grade12) + Number(data.credits13)*Number(data.grade13) + Number(data.credits14)*Number(data.grade14) + Number(data.credits15)*Number(data.grade15);
    
    let denominator = Number(data.credits1) + Number(data.credits2) + Number(data.credits3) + Number(data.credits4) + Number(data.credits5) + Number(data.credits6) + Number(data.credits7) + Number(data.credits8) + Number(data.credits9) + Number(data.credits10) + Number(data.credits11) + Number(data.credits12) + Number(data.credits13) + Number(data.credits14) + Number(data.credits15);
    let gpa = Math.round(100 * numerator/denominator)/100;
    // console.log(gpa);
    
    // alert(gpa);
    // output.showOutput(gpa);
    res.render('gradcal-output-1', {output: gpa, isLogin: isLogin});
});

app.post("/calc-2", function(req, res){
    const data = req.body;
    // console.log(data);
    const numerator = Number(data.calc2CurrCreds) * Number(data.calc2CurrGPA) + Number(data.calc2PrevCreds) * Number(data.calc2PrevGPA);
    const denom = Number(data.calc2CurrCreds) + Number(data.calc2PrevCreds);
    const cgpa = Math.round(100 * numerator/denom)/100;
    // console.log(cgpa);

    res.render('gradcal-output-2', {output: cgpa, isLogin: isLogin});
});

app.post("/calc-3", function(req, res){

    const data = req.body;
    // console.log(data);
    const num = (Number(data.xpointer) * (Number(data.calc3PrevCreds) + Number(data.calc3CurrCreds))) - (Number(data.calc3CurrCGPA) * Number(data.calc3PrevCreds));
    const denom = Number(data.calc3CurrCreds);
    const x = Math.round(100 * num/denom)/100;
    // console.log(x);

    res.render('gradcal-output-3', {output: x, isLogin: isLogin});
});



// ----------------------------------
app.listen(3001, function(){
    console.log("Server running on port 3001...");
});