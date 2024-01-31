const express = require("express");
const serviceAccount = require("./serviceAccountKey.json");
const { initializeApp, cert } = require("firebase-admin/app");
const cors = require("cors");

const main = () => {
  const app = express();
  const PORT = 3000;
  const server = require("http").createServer(app);

  initializeApp({
    credential: cert(serviceAccount),
  });

  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());
  app.use(cors());

  app.use("/", require("./routes"));

  server.listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
  });

  app.get("/", function (req, res) {
    res.send("hello world");
  });
};

main();
