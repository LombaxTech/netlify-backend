const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const server = require("http").Server(app);
const io = require("socket.io")(server, { wsEngine: "ws" });

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("connected"))
    .catch((err) => console.log(`error of: ${err}`));

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Home served from Heroku",
    });
});

// routes
const postRoutes = require("./routes/post");
app.use("/", postRoutes);

// socket stuff
io.on("connection", (socket) => {
    socket.on("message", (e) => {
        io.emit("message", e);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`started listening on port ${PORT}`));
