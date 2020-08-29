const mongoose = require('mongoose');

const {Schema } = mongoose;

const logEntrySchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:String,
    comments:String,
    rating:{
        type:Number,
        min:0,
        max:10,
        default:0
    },
    latitude:{
        type:Number,
        required:true,
        min: -90,
        max:90
    },
    longitude:{
        type:Number,
       required:true,
        min:-180,
        max:180
    },
    visitDate:{
        type: Date,
       required:true
    },
    image:String
},{timestamps:true}
)
const log = mongoose.model("Log",logEntrySchema);

module.exports = log;   