const mongoose = require('mongoose');

const MylearningSchmea = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    topic:{
        type: String,
    },
    subtopics:[
        {
            
            subtopicname:{
                type: String
            },
            links: [
                {
                 text:{
                   type:String
                   }
                }
            ],
            notes:{
                type:String
            },
            date:{
                type: Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }

});

module.exports = Mylearning = mongoose.model('mylearning',MylearningSchmea);