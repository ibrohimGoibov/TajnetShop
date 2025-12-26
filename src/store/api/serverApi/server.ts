const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = "8073343366:AAGYP1KtQPz9zEQDeeBSfISGIt60bkJsoCI";
const CHAT_ID = "ТВОЙ_CHAT_ID";

app.post("/send-product", async (req, res) => {
  const { name, price } = req.body;

  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: `🛒 Нажали на продукт\n📦 Название: ${name}\n💰 Цена: ${price}`
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка отправки" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));