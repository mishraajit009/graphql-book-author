const express = require("express");
const{ graphqlHTTP } = require('express-graphql');
const app=express();
const schema = require('./schema/schema');
const mongoose=require('mongoose');
const cors=require('cors');
//Dummy data
mongoose.connect();

mongoose.connection.once('open',()=>{
    console.log("Connected to database")
})
//allow cross origin

app.use(cors());

app.use('/graphql',graphqlHTTP({
schema,
graphiql:true
}));

app.listen(4000,(req,res)=>{
    console.log("List request on PORT 4000")
})