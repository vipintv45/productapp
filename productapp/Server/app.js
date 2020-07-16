const mongoose =require('mongoose');
const jwt = require('jsonwebtoken')
const express = require('express');
const ProductData = require('./src/model/Productdata');
const User =require('./src/model/userdata');
const cors = require('cors');
var bodyparser = require('body-parser');
var app = new express();
app.use(cors());
app.use(bodyparser.json());



function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request1')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token==='null'){
        return res.status(401).send('Unauthorized request2')
    }
    let payload = jwt.verify(token,'secretKey')
    if(!payload)
    {
        return res.status(401).send('Unauthorized request3')
    }
    req.userId = payload.subject
    next()
}


app.get('/products',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS")
    ProductData.find()
                .then(function(products){
                    res.send(products);
                });
});


app.post('/insert',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS");
    console.log(req.body);
    var product =
    {
        productId : req.body.product.productId,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageUrl : req.body.product.imageUrl
    }
    var product = new ProductData(product);
    product.save();


   
});



app.post('/edit',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS");
    
    var product =
    {   
        productId : req.body.product.productId,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageUrl : req.body.product.imageUrl
    }
   
    console.log("Data got in server in edit "+product._id);
    ProductData.updateOne(
        {_id:req.body.product._id},{$set:product},
        function(err,res)
        {
        if(err){console.log(err)}
        }
        
        )
       
    });
       
       
app.post('/delete',verifyToken,function(req,res){
            res.header("Access-Control-Allow-Origin","*")
            res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS")
            
          
           
            console.log('backend server itemis'+req.body.product._id);
            ProductData.deleteOne({_id:req.body.product._id} )
                        .then(function(products){
                            res.send(products);
                        });
                        console.log('remove() is executed')
   
});

app.post('/register',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS")
     let userData= req.body;
     let user = new User(userData);
     user.save((err,registeredUser)=>{
         if(err){console.log(err)}
         else{
            let payload = {subject:user._id}
            let token = jwt.sign(payload,'secretKey') 
            res.status(200).send({token})}

     })

     

})

app.post('/login',(req,res)=>{
    let userData =req.body;
    User.findOne({email: userData.email},(err,user)=>{
        if(err)
            {
                console.log(err);
            }
        else{
            if(!user)
                {
                    res.status(401).send('inavlid email')
                }
            else if(user.password != userData.password)
                {
                    res.status(401).send('invalid password')
                }
            else{
                let payload = {subject:user._id}
                let token = jwt.sign(payload,'secretKey') 
                res.status(200).send({token})
                   // res.status(200).send(user)
                }
            }
    })


})




 



app.listen(3000,function(){
    console.log('listenig to the port 3000');
})