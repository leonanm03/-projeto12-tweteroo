import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.get("/hello", (req, res) => {
  res.send("Meu primeiro servidor, yay!");
});

app.listen(5000, () => {
  console.log("App server listening in door 5000");
});
