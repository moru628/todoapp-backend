const Express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const registerModel = require("./models/register")
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const taskRoutes = require('./routes/taskRoutes')
const eventRoutes = require('./routes/eventRoutes')
const postRoutes = require('./routes/postRoutes')
const connectToDatabase = require('./config/db'); 
const bookingRoutes = require('./routes/bookingRoutes')
const app = Express()
app.use(cors())
app.use(Express.json())

let database
async function initializeServer() {
    try {
        database = await connectToDatabase();
        console.log("Database connected");
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

initializeServer();


app.use('/', userRoutes); 
app.use('/', uploadRoutes);
app.use('/upload', Express.static(path.join(__dirname, 'upload')));
app.use('/', taskRoutes);
app.use('/', eventRoutes);
app.use('/', postRoutes);
app.use('/', bookingRoutes)

app.get('/server/todoapp/getNotes', async(req,res) => {
    try{
        const notes = await database.collection("todoApp").find({}).toArray()
        console.log("Fetched notes:", notes);
        res.json(notes)
    }catch(error){
        console.error("Error fetching notes:", error); 
        res.status(500).json({error: "error fetching notes"})
    }
})

const PORT = process.env.PORT || 5050;
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})