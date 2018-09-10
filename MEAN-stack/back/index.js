const express = require('express');
const cors =require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = express.Router();
const Issue = require('./models/model');
// import Issue from './models/model';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues', {useNewUrlParser: true });
//event listener
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection established successfuly");
});
router.route('/issues').get((req,res) => {
    Issue.find((err,issues) => {
        if(err)
            console.log("err");
        else
            res.json(issues);
    });
});

router.route('/issues/:id').get((req,res) => {
    Issue.findById(req.params.id, (err,issue) => {
        if(err)
             console.log(err);
        else
            res.json(issue);
    });
});

router.route('/issues/add').post((req,res) => {
    var issue = new Issue(req.body);
    
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': "added successfully"});
        })
        .catch(err => {
            res.status(400).send("failed to create new entry");
        });
    
});

router.route('/issues/update/:id').post((req, res) => {
    
    Issue.findById(req.params.id, (err,issue) => {
        if(!issue)
            return next(new Error("could not load"));
        else{
            issue.name = req.body.name;
            issue.age = req.body.age;
            issue.country = req.body.country;
            issue.gender = req.body.gender;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('update failed');
            });
        }
    });
});

router.route('/issues/delete/:id').get((req,res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err,issue) => {
        if(err)
            res.json(err);
        else
            res.json("removed successfully");
    });
});
app.use('/', router);

port = 4201
app.listen(port, () => console.log(`express server running on port ${port}`));