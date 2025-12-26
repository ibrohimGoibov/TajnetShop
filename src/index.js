import { useState } from "react";

interface Order {
  name: string;
  phone: string;
  address: string;
  items: string;
  total: string;
}

export default function Checkout() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const order: Order = {
      name,
      phone,
      address,
      items: "Shoes x1, Hoodie x2",
      total: "$120",
    };

    try {
      const response = await fetch("http://localhost:3001/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      const data: { success: boolean } = await response.json();

      if (data.success) {
        alert("✅ Order sent to Telegram");
      } else {
        alert("❌ Order failed");
      }
    } catch (error) {
      alert("❌ Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col mt-5 gap-4 w-[400px] m-auto"
      onSubmit={submitOrder}
    >
      <input
        className="p-4 rounded-2xl shadow-2xl border border-gray-400"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        className="p-4 rounded-2xl shadow-2xl border border-gray-400"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      <input
        className="p-4 rounded-2xl shadow-2xl border border-gray-400"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <button
        className="wb-btn py-3 rounded-xl bg-violet-500 text-white"
        type="submit"
        disabled={loading}
      >
        {loading ? "Sending..." : "Checkout"}
      </button>
    </form>
  );
}
