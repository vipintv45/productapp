const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/ProductDb');
//mongoose.connect('mongodb+srv://vipin:sravs123@mycluster.npncw.azure.mongodb.net/ProductDb?retryWrites=true&w=majority');

const Schema = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    password: String,
   
})


// var User = mongoose.model('user',userSchema);
// module.exports = User;
module.exports = mongoose.model('USERS',userSchema,'users')  
