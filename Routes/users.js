const router = require('express').Router()
const Users = require('./../models/Users')
const bcrypt = require('bcrypt');

router.put('/:id', async (req, res) => {
    const id = req.params.id
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await  bcrypt.hash(req.body.password, salt)
        try {
            const upDateuser = await Users.findByIdAndUpdate(id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(upDateuser)
        } catch (error) {
            res.status(401).json(error)
        }

    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleteUser = await Users.findByIdAndDelete(id)
        res.status(200).json("User has been deleted")
    } catch (error) {
        res.status(401).json(error)
    }
})
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await Users.findById(id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
