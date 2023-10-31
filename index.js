const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
require("dotenv").config();


const transport = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL,
        pass : process.env.PASS
    }
});

const randomOtp = Math.floor(Math.random()*1000000);
app.get("/mail", (req,res)=>{
    res.render("mail")
});

app.post("/mail", (req,res)=>{
    let {to ,subject, text} = req.body;

    const mailOption = {
        from : "bincybee151@gmail.com",
        to : to,
        subject : subject,
        text : text,
        html : `<h3>Your otp is ${randomOtp}</h3>`
    }
    transport.sendMail(mailOption, (err,info)=>{
        if(err){
            console.log(err)
        }
        else(
            console.log(info)
        )
    })
    res.send("Mail Sent Successfully")
});

app.get("/:otp",(req,res)=>{
    const {otp} = req.params;

    if (randomOtp == otp){
        res.send("otp matched")
    }
    else{
        res.send("")
    }
});


app.listen(8090, ()=>{
    console.log('server is listening on http://localhost:8090')
})