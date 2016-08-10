var mongoose =require('mongoose'),
    User =  mongoose.model('users');

function catch_data(err,data){
  console.log('in pre-response');
  if (err){
    this.json(err);
    return
  }
  this.json(data);
}

function ObjConstructor(){
  this.index = function(req,res){
    User.find({}, catch_data.bind(res));
  }
  this.create = function(data){
    var user = new User(data);
    user.save();
  }
  this.show = function(req,res){
    User.findOne(req.params, catch_data.bind(res));
  }
}
module.exports = new ObjConstructor();
