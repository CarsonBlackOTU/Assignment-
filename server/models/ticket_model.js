let mongoose = require('mongoose');
// create a book model
let AssignmentModel = mongoose.Schema({
    name: String,
    class: String,
    duedate: Date,
    description: String,
    estTimeToComplete: Number
    },
    {
        collection: "assignments"
    }
);
module.exports = mongoose.model('Assignment', AssignmentModel);