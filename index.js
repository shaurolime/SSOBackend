const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const app = express();

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello server is running')
    .end();
});
app.use("/auth", authRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running!");
});
