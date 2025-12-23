const Task = require('../models/Task');

exports.getAllTasks = async (req, res) =>{

    try{
            // 1. FILTERING AND SORTING
        let query = Task.find({owner: req.user.id});
        if (req.query.sort) query = query.sort(req.query.sort.split(',').join(' '));


        // 2. PAGINATION
        const page = req.query.page * 1|| 1;
        const limit = req.query.limit *1 || 10;
        query = query.skip((page-1)*limit).limit(limit);

        const tasks  = await query;
        resjson({results: tasks.length, data: tasks});
    }catch(e) {res.status(500).json(err);}


};


// MONGODB AGGREGATION 

exports.getStats = async (req, res) => {
    const stats = await Task.aggregate([
        {$match : {owner: req.user._id}},
    {$group : {_id: '$status', count : { $sum: 1}}}
    ]);
    res.json(stats);
}