const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('URL query param missing');

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).send('Error fetching URL');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Proxy rodando na porta', PORT));
