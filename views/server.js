// (A) INITIALIZE
// (A1) LOAD REQUIRED MODULES
// npm i bcryptjs express body-parser cookie-parser multer jsonwebtoken
const bcrypt = require("bcryptjs"),
      path = require("path"),
      express = require("express"),
      bodyParser = require("body-parser"),
      cookieParser = require("cookie-parser"),
      multer = require("multer"),
      jwt = require("jsonwebtoken");
 
// (A2) EXPRESS + MIDDLEWARE
const app = express();
app.use(multer().array());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// (B) USER ACCOUNTS - AT LEAST ENCRYPT YOUR PASSWORDS!
// bcrypt.hash("PASSWORD", 8, (err, hash) => { console.log(hash); });
const users = {
    "jon@doe.com" : "$2a$08$g0ZKZhiA97.pyda3bsdQx.cES.TLQxxKmbvnFShkhpFeLJTc6DuA6"
  };

  // (C) JSON WEB TOKEN
// (C1) SETTINGS - CHANGE TO YOUR OWN!
const jwtKey = "YOUR-SECRET-KEY",
jwtIss = "YOUR-NAME",
jwtAud = "site.com",
jwtAlgo = "HS512";

// (C2) GENERATE JWT TOKEN
jwtSign = email => {
// (C2-1) RANDOM TOKEN ID
let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&_-", rnd = "";
for (let i=0; i<16; i++) {
rnd += char.charAt(Math.floor(Math.random() * char.length));
}

// (C2-2) UNIX NOW
let now = Math.floor(Date.now() / 1000);

// (C2-3) SIGN TOKEN
return jwt.sign({
iat : now, // issued at - time when token is generated
nbf : now, // not before - when this token is considered valid
exp : now + 3600, // expiry - 1 hr (3600 secs) from now in this example
jti : rnd, // random token id
iss : jwtIss, // issuer
aud : jwtAud, // audience
data : { email : email } // whatever else you want to put
}, jwtKey, { algorithm: jwtAlgo });
};

// (C3) VERIFY TOKEN
jwtVerify = (cookies) => {
if (cookies.JWT===undefined) { return false; }
try {
let decoded = jwt.verify(cookies.JWT, jwtKey);
// DO WHATEVER EXTRA CHECKS YOU WANT WITH DECODED TOKEN
// console.log(decoded);
return true;
} catch (err) { return false; }
}

// (D) EXPRESS HTTP
// (D1) STATIC ASSETS
app.use("/assets", express.static(path.join(__dirname, "assets")))
 
// (D2) HOME PAGE - OPEN TO ALL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/home"));
});
 
// (D3) ADMIN PAGE - REGISTERED USERS ONLY
app.get("/admin", (req, res) => {
  if (jwtVerify(req.cookies)) {
    res.sendFile(path.join(__dirname, "/home2"));
  } else {
    res.redirect("../login");
  }
});