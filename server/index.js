const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); // When we want to be able to accept JSON.

const controller = require('./controllers/controller')


app.get("/api/fortune", controller.Fortunes)
app.get("/api/compliment", controller.Compliments);
app.post(`/api/login`, controller.login)
app.post(`/api/register`, controller.register)

let port = 4000
app.listen(port, () => console.log(`Hey You, You're finally awake on port ${port}`));
