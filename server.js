import express from 'express';
import {
  getUser,
  getUsers,
  createUser,
  getTimes,
  getTimesFromUserId,
  getTimeFromId,
  createTime,
} from './script/database.js';
import { randomScrambleForEvent } from 'cubing/scramble';

const app = express();

app.set('view engine', 'ejs');

async function getScramble(event) {
  const scramble = await randomScrambleForEvent(event);
  return scramble;
}

app.get('/', (req, res) => {
    res.render('index.ejs');
  });


app.get('/times', (req, res) => {
  res.render('times.ejs');
});

app.get('/scramble/:event', async (req, res) => {
  const event = req.params.event
  const scramble = await getScramble(event)
    res.send(scramble.toString())
})

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke !');
});

const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
