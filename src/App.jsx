import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Navbar from './components/Navbar';
import TrainList from './features/trains/TrainList';
import ReservationHistory from './features/reservations/ReservationHistory';
import BookReservation from './features/reservations/BookReservation';

import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TrainList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/Book" element={<BookReservation />} />
        <Route path="/reservations"
          element={
           
              <ReservationHistory />
            }
        />
      </Routes>
    </>
  );
}

export default App;
