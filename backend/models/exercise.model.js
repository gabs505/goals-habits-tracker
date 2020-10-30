const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const exerciseSchema = new Schema({
    name:{type: String, required:true},
    description:{type: String, required:false},
    duration:{type: Number, required:true},
    progress:{type: Array, required:true},
    
},{
    timestamps:true
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;

// startDate:{type: Date, required:true}