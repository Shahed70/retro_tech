const exprss = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { urlencoded } = require("express");
const multer = require('multer')
require("dotenv").config();
const authRoute = require('./Routes/auth')
const userRoute = require('./Routes/users')
const categoryRoute = require('./Routes/category')
const postRoute = require('./Routes/posts')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.em8kw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = exprss()
const reqMiddleware = [
    exprss.json(),
    urlencoded({ extended: true }),
    cors(),
    //exprss.static("images"),
];

app.use(reqMiddleware);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Conected to mongodb database');

}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {

    res.send('hello from simple server :)')
})


const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, "./public")
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname +""+ Date.now()+path.extname(file.originalname));
    }
})
const upload = multer({storage}).single('file')
app.post('/api/upload', upload,(req, res)=>{
    
    res.status(200).json('File has been uploaded successfully')
})

app.use('/api/auth', authRoute)

app.use('/api/users', userRoute)

app.use('/api/posts', postRoute)

app.use('/api/category', categoryRoute)



app.listen(process.env.PORT || '5000', () => console.log('Server is running  port 5000'))
