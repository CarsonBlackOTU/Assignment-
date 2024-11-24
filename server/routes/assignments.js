let express = require('express');
let router = express.Router(); 
let mongoose = require('mongoose'); 
let Assignment = require('../models/assignment_model');

router.get('/', async(req, res, next) => {
    try {
        const AssignmentList = await Assignment.find();
        res.render('assignments/list',{
            title: 'Assignment',
            AssignmentList: AssignmentList
        })}
        catch(err){
            console.error(err);
            res.render('assignments/list', {
                error: 'Error on the server'
            })
        }
});

router.get('/edit/:id', async(req, res, next) => { 
    try {
        const id = req.params.id;
        console.log(id);
        const AssignmentToEdit = await Assignment.findById(id); 
        res.render('assignments/edit', { 
            title: 'Assignment',
            Assignment: AssignmentToEdit 
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
            "duedate": req.body.duedate,
            "description": req.body.description,
            "estTimeToComplete": req.body.estTimeToComplete
        })
        Assignment.findByIdAndUpdate(id, updatedAssignment).then(() => {
            res.redirect('/assignments');
        })
    }
    catch(err) {
        console.error(err);
        next(err);
    }
})

router.get('/add',async(req, res, next) => {
    try {
        res.render('assignments/add', {
            title: 'Add Assignment'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('assignments/list', {
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
            "duedate": req.body.duedate,
            "description": req.body.description,
            "estTimeToComplete": req.body.estTimeToComplete
        });
        Assignment.create(newAssignment).then(() => {
            res.redirect('/assignments');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('/assignments', {
            error:'Error on the server'
        })
    }
});


router.get('/delete/:id', async(req, res, next) => {
    try {
        let id=req.params.id;
        Assignment.deleteOne({_id:id}).then(() => {
            res.redirect('/assignments')
        })
    }
    catch(error) {
        console.error(err);
        res.render('/assignments',{
            error:'Error on the server'
        })
    }
});
module.exports = router;
