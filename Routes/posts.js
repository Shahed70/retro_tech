const router = require('express').Router()
const Posts = require('./../models/Posts')

//create post


router.post('/create', async (req, res) => {
    const file = req.file
    const { title, dectn, name, categories } = req.body
    console.log( title, dectn, name,  file)
})

//update
router.put('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await Posts.findById(id)
        if (post.name === req.body.name) {
            try {
                const upDatePost = await Posts.findByIdAndUpdate(id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(upDatePost)
            } catch (error) {
                res.status(401).json('Your can update only your posts')
            }
        }

    } catch (err) {
        res.status(500).json(err)
    }
})


//delete post 1
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deletePost = await Posts.findByIdAndDelete(id)
        res.status(200).json("Post has been deleted")
    } catch (error) {
        res.status(401).json("Something went wrong")
    }
})


//get all posts
router.get('/allPosts', async (req, res) => {
    try {
        const posts = await Posts.find({})

        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/searchPosts', async (req, res) => {
    const category = req.query.category
    try {
        let posts;
        if (category) {
            posts = await Posts.find({
                categories: {
                    $in: [category]
                }
            })
        } else {
            posts = await Posts.find({})
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(404).json(error)
    }
})

//get 1 post
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await Posts.findById(id)

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router