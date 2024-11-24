let mongoose = require('mongoose');

let AssignmentModel = mongoose.Schema({
    name: String,
    class: String,
    duedate: String,
    description: String,
    estTimeToComplete: String
    },
    {
        collection: "assignments"
    }
);
module.exports = mongoose.model('Assignment', AssignmentModel);