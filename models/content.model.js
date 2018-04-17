var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ContentSchema = new Schema({
    topic: {
        type: String,
        require
    },
    user_say: {
        type: String,
        require
    },
    answer: [
        {
            type: String
        }],
    lang: {
        type: String,
        default: "vi"
    },
    updatetime: {
        type: Date
    }
})




module.exports = mongoose.model('Topic', ContentSchema);