import { useEffect, useState } from 'react';
import axios from 'axios';

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:8083/api/reservations/history',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReservations(response.data);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        alert('Could not load reservations');
      }
    };

    fetchReservations();
  }, []);

  return (
    <div>
      <h2>My Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <ul>
          {reservations.map((r) => (
            <li key={r.reservationId}>
              <strong>PNR:</strong> {r.pnr} | <strong>Train:</strong> {r.trainId} |{" "}
              <strong>Status:</strong> {r.status} | <strong>Fare:</strong> ₹{r.fare}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservationHistory;
