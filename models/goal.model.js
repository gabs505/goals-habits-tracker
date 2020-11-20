const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const goalSchema = new Schema({
    name:{type: String, required:true},
    description:{type: String, required:false},
    duration:{type: Number, required:true},
    progress:{type: Array, required:true},
    startDate:{type:Date,required:true},
    userId:{type: String, required:false}
    
},{
    timestamps:true
})

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
