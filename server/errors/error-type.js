const ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message:
      "A big fuck up which we'll never tell you of had just happened. And now : A big fat lie....'A general error ....'",
    isShowStackTrace: true,
  },
  EMAIL_ALREADY_EXIST: {
    id: 2,
    httpCode: 601,
    message: "User name already exist",
    isShowStackTrace: false,
  },
  UNAUTHORIZED: {
    id: 3,
    httpCode: 401,
    message: "Invalid email or password",
    isShowStackTrace: false,
  },
  SOCKET_ERROR: {
    id: 4,
    httpCode: 838,
    message: "Invalid token",
    isShowStackTrace: false,
  },
  SERVER_VALIDATION_ERROR: {
    id: 4,
    httpCode: 666,
    message: "Validation Failed",
    isShowStackTrace: false,
  },
  REFRESH_TOKEN_ERROR: {
    id: 5,
    httpCode: 401,
    message: "Refresh token failed",
    isShowStackTrace: false,
  },
};

module.exports = ErrorType;
