const router=require('express').Router();
let Goal=require('../models/goal.model');
const auth=require('../middleware/auth')

router.route('/').get((req,res)=>{
    Goal.find()
    .then(goals=> res.json(goals))
    .catch(err=> res.status(400).json('Error: '+ err));

});

router.route('/add').post(auth,(req,res)=>{
    const name= req.body.name;
    const description=req.body.description;
    const duration=Number(req.body.duration);
    const progress=req.body.progress;
    const startDate= req.body.startDate;
    const userId= req.body.userId;
    
    const newGoal = new Goal({
        name,
        description,
        duration,
        progress,
        startDate,
        userId
    });
    
    newGoal.save()
    .then(goals=> res.json('Goal aded!'))
    .catch(err=> res.status(400).json('Error: '+ err));

});

router.route('/:id').get((req,res)=>{
    Goal.findById(req.params.id)
    .then(goal=> res.json(goal))
    .catch(err=> res.status(400).json('Error: '+ err));

});

router.route('/:id').delete((req,res)=>{
    Goal.findByIdAndDelete(req.params.id)
    .then(goal=> res.json('Goal deleted.'))
    .catch(err=> res.status(400).json('Error: '+ err));

});


router.route('/update/:id').post((req,res)=>{
    Goal.findById(req.params.id)
    .then(goal=>{

        goal.name= req.body.name;
        goal.description=req.body.description;
        goal.duration=Number(req.body.duration);
        goal.progress=req.body.progress;
        goal.startDate= req.body.startDate;
    
        goal.save()
        .then(()=> res.json('Goal updated!'))
        .catch(err=> res.status(400).json('Error: '+ err));

    })
    
    .catch(err=> res.status(400).json('Error: '+ err));

});



module.exports=router;