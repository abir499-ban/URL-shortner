const express = require('express');
const app = express();
const PORT = 8000;
const {connectMongoDB} = require("./connection");
const urlRouter = require('./routes/url');
const Url = require("./model/url");
const path = require('path');
const static_router = require('./routes/staticrouter');
const userRouter = require('./routes/user');
const cookie_parsor = require('cookie-parser');
const {checkforAuthentication,restrictTo} = require('./middleware/auth');

 
connectMongoDB("mongodb://127.0.0.1:27017/URL_Shortner").then(() =>{
    console.log("MongoDB connected");
});

app.set("view engine", "ejs");   
app.set("views", path.resolve("./view"));
app.use(express.json());    //Middle-ware to use body of req object
app.use(express.urlencoded({extended:false}));  //To access the body of req object
app.use(cookie_parsor());

app.use(checkforAuthentication);  //Check for Authentication

app.use('/',  static_router );
    
    // const html = `
    // <html>
    // <head></head>
    // <body>
    // <ol>
    // ${allUrls.map((url) => `<li>${url.shortID}    -   ${url.redirectUrl}  -   ${url.visitedHistory.length}</li>`).join("")}
    // </ol>
    // </body>
    // </html>`
app.use('/url', restrictTo(["NORMAL",'ADMIN']), urlRouter);      //Routing
app.get('/url/:shortid', async(req,res) =>
{
    const shortID = req.params.shortid;
    const entry = await Url.findOneAndUpdate({
        shortID
    }, {
        $push:{
            visitedHistory:{
                timestamp:Date.now(),
            },
        },
    });
    return res.redirect(entry.redirectUrl);
});


app.use('/user',userRouter);

app.listen(PORT, () => console.log('server started on ',PORT));