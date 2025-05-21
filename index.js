const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Root endpoint
app.get('/', (req, res) => {
  res.send('✅ Timestamp API Ready. Use endpoint: /api/:date?');
});

// Timestamp API
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    date = new Date();
  } else if (!isNaN(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Server is running on port ${PORT}`);
});
