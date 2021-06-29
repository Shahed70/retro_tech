const router = require('express').Router()
const Users = require('./../models/Users')
const bcrypt = require('bcrypt');

router.post('/register', async  (req, res)=>{

 
    try {
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new Users({
            name:req.body.name,
            email:req.body.email,
            password:hashedPass
        })

        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/login' , async (req , res)=>{
     
       try {
            const user = await Users.findOne({email: req.body.email})
            !user && res.status(400).json('Email does not match')
            
            const passValidate = await bcrypt.compare(req.body.password, user.password)
            !passValidate && res.status(404).json('Password does not match')

            const {password, ...something} = user._doc
            res.status(200).json(something)
        } catch (error) {
            
        }
        
})
// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

module.exports = router;
