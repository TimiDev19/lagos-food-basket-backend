const router = require('express').Router()
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const User = require('../model/user')

router.post("/", upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)

        //Create instance of user
        let user = new User({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        })
        await user.save()
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
})

router.get("/", async (req, res) => {
    try{
        let user = await User.find();
        res.json(user)
    } catch (err) {
        console.log(err)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let user = await User.findById(req.params.id)

        await cloudinary.uploader.destroy(user.cloudinary_id)

        await user.remove()
        res.json(user)
    } catch (err) {
        console.log(err)
    }
})

router.put("/:id", upload.single("image"), async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        await cloudinary.uploader.destroy(user.cloudinary_id)
        const result = await cloudinary.uploader.upload(req.file.path)
        const data = {
            name: req.body.name || user.name,
            avatar: result.secure_url || user.avatar,
            cloudinary_id: result.public_id || user.cloudinary_id
        }
        user = await user.findByIdAndUpdate(req.params.id, data, {new: true})
        res.json(user)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router