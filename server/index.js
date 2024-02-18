const express=require('express');
const app=express();
const mongoose=require('mongoose');
const loginRoute=require('./routes/loginRoute');
const signupRoute=require('./routes/signupRoute');
const cors=require('cors');


mongoose.connect('mongodb+srv://dinnu:dinnu@cluster0.ciq0jbr.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db=mongoose.connection;
app.use(cors());
app.get('/',(req,res)=>{
    res.send('hello  guys');
})
db.once('open', () => {
    console.log('MongoDb Connected');
});
app.use('/login',loginRoute);
app.use('/signup',signupRoute);
const PORT=8000;
app.listen(PORT,()=>{
    console.log("application started");
});
