const mongoose=require("mongoose");

const UserSchema =new mongoose.Schema({
email:{
    type: String,
    required:true,

},
name:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true
},
image:{
    type:String,
},
favCarsID: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Car'
},
ownedCars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car'
}]
})
const User = mongoose.model('User', UserSchema);

module.exports = User;