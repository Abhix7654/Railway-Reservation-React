import { useState } from "react";
import axios from "axios";

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [showResults, setShowResults] = useState(false); // 🔄 controls display

  const fetchAllTrains = async () => {
    try {
      const res = await axios.get("http://localhost:8082/api/trains/all");
      setTrains(res.data);
      setShowResults(true);
    } catch (err) {
      console.error("Failed to fetch trains", err);
    }
  };

  const searchByRoute = async () => {
    if (!source || !destination) return;
    try {
      const res = await axios.get(
        `http://localhost:8082/api/trains/search?source=${source}&destination=${destination}`
      );
      setTrains(res.data);
      setShowResults(true);
    } catch (err) {
      alert("No trains found for the given route");
      setTrains([]);
      setShowResults(true);
    }
  };

  const searchByTrainNumber = async () => {
    if (!trainNumber) return;
    try {
      const res = await axios.get(`http://localhost:8082/api/trains/get/${trainNumber}`);
      setTrains([res.data]);
      setShowResults(true);
    } catch (err) {
      alert("Train not found");
      setTrains([]);
      setShowResults(true);
    }
  };

  return (
    <div>
      <h2>🚆 Train Search</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button onClick={searchByRoute}>Search by Route</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          placeholder="Train Number"
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
        />
        <button onClick={searchByTrainNumber}>Search by Train Number</button>
      </div>

      <button onClick={fetchAllTrains}>🔁 View All Trains</button>

      {showResults && (
        <>
          <h3 style={{ marginTop: "30px" }}>Train List</h3>
          {trains.length === 0 ? (
            <p>No trains available.</p>
          ) : (
            <ul>
              {trains.map((train) => (
                <li key={train.id}>
                  <strong>{train.name}</strong> | {train.source} ➡ {train.destination} | Seats: {train.availableSeats}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default TrainList;
