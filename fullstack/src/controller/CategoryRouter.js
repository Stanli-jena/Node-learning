let express = require('express');
let categoryRouter = express.Router();
let mongodb = require('mongodb').MongoClient;
let url = process.env.MONGO_URL;

const category = [
    {
        "id":1,
        "category": "Fashion",
        "thumb":"https://i.ibb.co/56VP0Fn/cloths.jpg"
    },
    {
        "id":2,
        "category":"Electronics",
        "thumb":"https://i.ibb.co/pw5Wtdx/appliances.jpg"
    },
    {
        "id":3,
        "category":"Essentials",
        "thumb":"https://i.ibb.co/0cw34xm/essentials.jpg"
    },
    {
        "id":4,
        "category": "Footwear",
        "thumb":"https://i.ibb.co/r3SZq8S/footware.jpg"
    }
]

function router(menu){
    categoryRouter.route('/')
        .get((req,res)=>{
        mongodb.connect(url,function(err,dc){
            if(err){
                res.status(500).send('Error while connecting')
            }else{
                let dbObj = dc.db('learnode');
                dbObj.collection('category').find().toArray(function(err,result){
                    if(err){
                        res.status(203).send('Error while fetching')
                    }else{
                        res.render('category',{title:'Category Page',category,menu})
                    }
                })
            }
        })    
    })
    
    categoryRouter.route('/details')
    .get((req,res)=>{
        res.send('category details')
    })
    return categoryRouter;
}



    module.exports = router;   