const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/ProductDb');
//mongoose.connect('mongodb+srv://vipin:sravs123@mycluster.npncw.azure.mongodb.net/ProductDb?retryWrites=true&w=majority');

const Schema = mongoose.Schema;
var NewProductSchema = new Schema({
  
    productId : Number,
    productName : String,
    productCode : String,
    releaseDate : String,
    description : String,
    price : Number,
    starRating : Number,
    imageUrl : String
})

//var Productdata = mongoose.model('product',NewProductSchema,);
// module.exports = Productdata;
module.exports = mongoose.model('ProductData',NewProductSchema,'products');