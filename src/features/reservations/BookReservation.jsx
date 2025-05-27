import { useState } from 'react';
import axios from 'axios';

const BookReservation = () => {
  const [form, setForm] = useState({
    trainId: '',
    travelDate: '',
    numberOfSeats: 1
  });

  const [reservation, setReservation] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8083/api/reservations/book", form, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      });

      setReservation(res.data);
      alert("Reservation Successful");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Reservation Failed");
    }
  };

  const handlePayment = async () => {
  const token = localStorage.getItem("token");
  if (!token || !reservation) return;

  try {
    const res = await axios.post("http://localhost:8084/api/payments/pay", {
      reservationId: reservation.id,
      amount: reservation.fare
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    if (res.data.status === "REDIRECT") {
      const stripeWindow = window.open(res.data.message, '_blank');

      const interval = setInterval(async () => {
        try {
          const checkRes = await axios.get(`http://localhost:8084/api/payments/status/${reservation.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });

          if (checkRes.data === "SUCCESS") {
            clearInterval(interval);
            alert("✅ Ticket Booked Successfully!");
          } else  {
            clearInterval(interval);
            alert("❌ Payment Failed.");
          }
        } catch (err) {
          console.error("Polling error", err.message);
        }
      }, 3000);

    } else {
      alert(res.data.message || "Payment initiation failed.");
    }
  } catch (err) {
    console.error("Payment Error:", err.response?.data || err.message);
    alert("Failed to initiate payment.");
  }
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Book Reservation</h2>
        <input
          name="trainId"
          type="number"
          placeholder="Train ID"
          onChange={handleChange}
          required
        />
        <input
          name="travelDate"
          type="date"
          onChange={handleChange}
          required
        />
        <input
          name="numberOfSeats"
          type="number"
          placeholder="Seats"
          onChange={handleChange}
          required
        />
        <button type="submit">Book</button>
      </form>

      {reservation && (
        <div>
          <h3>Reservation successful for PNR: {reservation.pnr}</h3>
          <button onClick={handlePayment}>Pay Now</button>
        </div>
      )}
    </div>
  );
};

export default BookReservation;
