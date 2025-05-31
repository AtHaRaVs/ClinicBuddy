const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Server is working!");
});

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`🚀 Test server running at http://localhost:${PORT}`);
});
