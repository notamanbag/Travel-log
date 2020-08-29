const express= require('express');
const logEntry = require('../logEntry')
const router = express.Router()

router.get('/',async (req,res,next)=>{
    try {
        const entries = await logEntry.find();
        res.json(entries);
        
    } catch (error) {
        next(error)
        
    }
   
});



router.post('/',async(req,res,next)=>{
    try {
        
        const LogEntry = new logEntry(req.body);
        const createdEntry = await LogEntry.save();
        
        res.json(createdEntry);
    } catch (error) {
        next((error))
        
    }
    
})


module.exports = router;