let express = require('express');
let router = express.Router(); 
let mongoose = require('mongoose'); 
let Assignment = require('../models/ticket_model');

router.get('/', async(req, res, next) => {
    try {
        const AssignmentList = await Assignment.find();
        res.render('tickets/list',{
            title: 'Assignment',
            AssignmentList: AssignmentList
        })}
        catch(err){
            console.error(err);
            res.render('tickets/list', {
                error: 'Error on the server'
            })
        }
});

router.get('/edit/:id', async(req, res, next) => { // Every profile or account has a specific token or ID that indicates specific privileges.
    try {
        const id = req.params.id;
        console.log(id);
        const AssignmentToEdit = await Assignment.findById(id); // Mongoose query
        res.render('tickets/edit', { 
            title: 'Assignment',
            Assignment: AssignmentToEdit // Send the document with the requested ID.
        })
    }
    catch(err) {
        console.error(err);
        next(err);
    }
})
router.post('/edit/:id', async(req, res, next) => {
    try {
        let id = req.params.id;
        let updatedAssignment = Assignment({
            "_id": id,
            "name": req.body.name,
            "class": req.body.class,
            "duedate": req.body.class,
            "description": req.body.description,
            "Estimated Time to Complete": req.body.estTimeToComplete
        })
        Assignment.findByIdAndUpdate(id, updatedAssignment).then(() => {
            res.redirect('/asignments');
        })
    }
    catch(err) {
        console.error(err);
        next(err);
    }
})

router.get('/add',async(req, res, next) => {
    try {
        res.render('tickets/add', {
            title: 'Add Assignment'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('tickets/list', {
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add', async(req, res, next) => {
    try {
        let newAssignment = Assignment({
            "name": req.body.name,
            "class": req.body.class,
            //"duedate": req.body.class,
            "description": req.body.description,
            "Estimated Time to Complete": req.body.estTimeToComplete
        });
        Assignment.create(newAssignment).then(() => {
            res.redirect('/tickets');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('/tickets', {
            error:'Error on the server'
        })
    }
});

/* Delete Functionality - Carson */ 

router.get('/delete/:id', async(req, res, next) => {
    try {
        let id=req.params.id;
        Assignment.deleteOne({_id:id}).then(() => {
            res.redirect('/tickets')
        })
    }
    catch(error) {
        console.error(err);
        res.render('/tickets',{
            error:'Error on the server'
        })
    }
});
module.exports = router;
