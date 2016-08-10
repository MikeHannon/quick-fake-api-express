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
  var self = this;
  this.index = function(req,res){
    User.find({}, catch_data.bind(res));
  }
  this.create = function(req, res) {
    self.createData(req.body, catch_data.bind(res));
  }
  this.createData = function(data, cb){
    var user = new User(data);

    user.save(cb);
  }
  this.show = function(req,res){
    User.findOne(req.params, catch_data.bind(res));
  }

  //update is expecting a req.body with a name property in it.
  this.update = function(req,res){
    if (!req.body.name) return res.json({ error : 'no_name_in_body'});

    User.update({ _id: req.params._id }, { $set : { name : req.body.name } }, catch_data.bind(res));
  }
}
module.exports = new ObjConstructor();
