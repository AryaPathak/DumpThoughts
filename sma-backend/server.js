const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = 3000;

var cors = require('cors')

app.use(cors())

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello");
})


app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));