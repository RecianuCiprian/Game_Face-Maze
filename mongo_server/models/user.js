/**
 * Created by Ciprian on 5/24/2016.
 */
var mongoose=require('mongoose');
var bcrypt=require('bcrypt');

var userSchema=mongoose.Schema({
    local:{
        email:String,
        password:String,
        images:[Buffer]
    },
    facebook:{
        id:String,
        token:String,
        email:String,
        images:[Buffer]
    }
});

userSchema.methods.generateHash=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(9));
};

userSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.local.password);
};

module.exports=mongoose.model('user',userSchema);