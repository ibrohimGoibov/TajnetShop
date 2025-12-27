"use client";
import React from "react";

const TELEGRAM_BOT_TOKEN = "bot8590072928:AAGP8IIlOLt7_-kPiip3Ng8WsF_wlsoh4Lg";
const TELEGRAM_CHAT_ID = "-1003337986520";

interface TelegramData {
  name: string;
  phone: string;
}

async function sendToTelegram({ name, phone }: TelegramData) {
  try {
    const text = `
📝 Free consultation:
👤 Product Name: ${name}
📞 Phone: ${phone}
    `;

    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      }
    );
  } catch (error) {
    console.error("Ошибка при отправке в Telegram:", error);
  }
}

const TestPage: React.FC = () => {
  const [test, setTest] = React.useState("");

  const handleSend = async () => {
    if (!test) return;
    await sendToTelegram({ name: test, phone: test });
    alert("Отправлено!");
    setTest("");
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={test}
        onChange={(e) => setTest(e.target.value)}
        className="border p-2 rounded mr-2"
        placeholder="Введите текст"
      />
      <button
        onClick={handleSend}
        className="bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-400"
      >
        Send
      </button>
    </div>
  );
};

export default TestPage;
