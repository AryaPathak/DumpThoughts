const express = require('express');
const userRoutes = require('./src/user/routes');

const app = express();
const PORT = 3000;

var cors = require('cors')

app.use(cors())

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Hello");
})

app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));