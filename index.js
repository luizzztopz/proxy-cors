import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type') || 'text/plain';
    const data = await response.text();
    res.set('Content-Type', contentType);
    res.send(data);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).send('Error fetching URL');
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Proxy server running on port ${port}`))
