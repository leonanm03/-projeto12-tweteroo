import express, { json } from "express";
import cors from "cors";

const PORT = 5000;
const app = express();
app.use(cors());
app.use(json());

const users = [
  {
    username: "teste",
    avatar:
      "https://image.disparada.com.br/wp-content/uploads/2021/03/11113736/img-bolsominion.jpg",
  },
];

const tweets = [
  {
    username: "teste",
    tweet: "batata!!",
  },
];

app.post("/sign-up", (req, res) => {
  const signUp = req.body;
  const existingUser = users.some((u) => u.username === signUp.username);

  if (existingUser) {
    return res.status(409).send("Usuário já existe.");
  }

  if (signUp.username && signUp.avatar) {
    users.push(signUp);
    console.log(users);
    return res.status(201).send("OK");
  }
});

app.get("/tweets", (req, res) => {
  let tweetsObj = tweets.map((tweet) => {
    const owner = users.find((u) => u.username === tweet.username);
    return { ...tweet, avatar: owner.avatar };
  });

  tweetsObj = tweetsObj.reverse();

  res.status(200).send(tweetsObj);
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  tweets.push({ username, tweet });

  if (tweets.length > 10) {
    tweets.shift();
  }

  res.status(201).send("OK");
});

app.listen(PORT, () => {
  console.log(`App server runing in http://localhost:${PORT}`);
  console.log(users);
});
