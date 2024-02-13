const express = require('express');
const { createClient } = require('redis');
const ShortUniqueId = require('short-unique-id')

const app = express();

app.use(express.json())
// body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
// use ejs as template engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.status(200).render('index', {host: req.hostname})
})

const client = createClient({
    password: process.env.REDIS_PWD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 19334
    }
})

client.on('error', err => console.error('Redis Client Error', err));
client.connect();

app.post('/shorten', async (req, res) => {
  const { urlraw, expiration } = req.body
  const { randomUUID } = new ShortUniqueId({ length: 6 });

  try {
    if (urlraw.includes("http://")) {
      throw new Error("URL is not secure");
    }
    const rid = randomUUID()
    await client.set(rid, urlraw , {
      EX: parseInt(expiration) * 60,
      NX: true,
    });
    res.status(200).send(rid);
  } catch(err) {
    res.status(400).send(err.message)
  }
})

app.get('/shorten/:rid', async(req, res) => {
  const { rid } = req.params
  try {
    const url = await client.get(rid);
    if (url === null) throw new Error("url does not exist, may have expired or not been set");
    if (!url.includes("https://")) {
      res.redirect(`https://${url}`);
    }
    else {
      res.redirect(url);
    }
  } catch (err) {
    res.status(400).send(err.message)
  }

})

app.listen(3000, () => {
  console.log("server listening on port 3000...")
})
