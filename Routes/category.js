const router = require('express').Router()
const Category = require('./../models/Category')

//create post


router.post('/create', async (req, res) => {

    try {
        const newCategory = new Category(req.body)
        const category = await newCategory.save()
        res.status(200).json(category)

    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/getCat', async (req, res) => {

    try {
        const category = await Category.find({})

        res.status(200).json(category)

    } catch (error) {
        res.status(404).json(error)
    }
})



module.exports = router