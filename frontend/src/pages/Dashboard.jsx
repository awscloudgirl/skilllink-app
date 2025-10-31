import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  // Load bookings from backend
  const loadBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load bookings. Please log in again.");
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Create a new booking
  const addBooking = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return alert("Please enter a topic");

    try {
      await API.post("/bookings", {
        topic,
        message,
        date: new Date(),
      });
      setTopic("");
      setMessage("");
      loadBookings();
    } catch (err) {
      console.error(err);
      alert("Could not create booking.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Your Bookings</h1>

      <form
        onSubmit={addBooking}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mb-8"
      >
        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-3 rounded"
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Add Booking
        </button>
      </form>

      <div className="w-full max-w-md">
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center">No bookings yet.</p>
        ) : (
          bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-4 rounded-lg shadow-sm mb-3 border"
            >
              <p className="font-semibold">{b.topic}</p>
              {b.message && (
                <p className="text-sm text-gray-600 mt-1">{b.message}</p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(b.date).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
