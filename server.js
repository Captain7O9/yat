import express, { json } from 'express'
import {
  getUser,
  getUsers,
  createUser,
  getTimes,
  getTimesFromUserId,
  getTimeFromId,
  createTime,
} from './script/database.js'
import {randomScrambleForEvent} from 'cubing/scramble'

const app = express()

app.set('view engine', 'ejs')

async function getScramble(event) {
  const scramble = await randomScrambleForEvent(event)
  return scramble
}

app.get('/', (req, res) => {
    res.render('index.ejs')
  });


app.get('/times/:userId', async (req, res) => {
  const userId = Number(req.params.userId)
  console.log(userId);
  const times = await getTimesFromUserId(userId)
  console.log(times)
  res.render('times.ejs', {
    times
  })
});

app.get('/scramble/:event', async (req, res) => {
  const event = req.params.event
  const scramble = await getScramble(event)
    res.send(scramble.toString())
})

app.post('/time', express.json(), async (req, res) => {
  console.log(await req.body)
  const { user_id, scramble, scramble_size, time } = req.body
  const createdTime = await createTime(user_id, scramble, scramble_size, time)
  res.status(201).send(createdTime)
})

app.use(express.static('public'))

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke !')
});

const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
