const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http"); // More basic server than express.
const httpServer = http.createServer(server); // Need express
const socketServerCreator = require("./socketIo/serverCreator");

socketServerCreator(httpServer); // Need the http

const keys = require("./keys");
const usersRoute = require("./routes/users-route");
const messagesRoute = require("./routes/messages-route");
const friendsRoute = require("./routes/friends-route");
const profileRoute = require("./routes/profile-route");
const postsRoute = require("./routes/posts-route");
const commentsRoute = require("./routes/comments-route");
const likesRoute = require("./routes/likes-route");
const filesRoute = require("./routes/files-route");
const errorHandler = require("./errors/error-handler");
const cookieParser = require("cookie-parser");
const loginFilter = require("./middleware/login-filter");
const scanUnauthorizedError = require("./middleware/scanUnauthorizedError");

server.use(express.json());
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3001;
server.use(cors({ origin: "http://localhost:3000", credentials: true }));

server.use("/upload", express.static("./upload"));
server.use("/users", usersRoute);

server.use(loginFilter());
server.use(scanUnauthorizedError);

server.use("/messages", messagesRoute);
server.use("/friends", friendsRoute);
server.use("/posts", postsRoute);
server.use("/comments", commentsRoute);
server.use("/likes", likesRoute);
server.use("/profile", profileRoute);

server.use("/files", filesRoute);

server.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`Successfully connect to MongoDB`);

    httpServer.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  } catch (error) {
    console.log("Data base error" + error);
  }
}

start();
