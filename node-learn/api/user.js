let express = require('express')
let router = express.Router();



router.get('/getdata',(req,res)=>{
	console.log(req.query)
	res.send(req.query)
})
router.post('/postdata',(req,res)=>{
	console.log(req.body)
	res.send(req.body)
})

module.exports = router
