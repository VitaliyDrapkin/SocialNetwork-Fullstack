// const jwt = require("jsonwebtoken");
// const config = require("../config.json");
// const ServerError = require("../errors/server-error");

// //We get a token for decryption and for connecting a socket
// function socketIoAuthorization(socket, next) {
//   if (socket.handshake.query && socket.handshake.query.token) {
//     jwt.verify(socket.handshake.query.token, config.secret, function (
//       err,
//       decoded
//     ) {
//       if (err) {
//         next(new ServerError(ServerError.SOCKET_ERROR));
//       }
//       socket.decoded = decoded;
//       next();
//     });
//   } else {
//     next(new ServerError(ServerError.SOCKET_ERROR));
//   }
// }

// module.exports = socketIoAuthorization;
