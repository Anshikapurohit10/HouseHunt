import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import "../styles/List.scss";
import "../styles/Booking.scss";
const MyBookings = () => {
  const user = useSelector((state) => state.user);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch(
        `https://househunt-8vj2.onrender.com/bookings/customer/${user._id}`
      );
      const data = await res.json();
      setBookings(data);
    };

    if (user) fetchBookings();
  }, [user]);

  return (
    <>
      <Navbar />
    <h1 className="booking-title">My Bookings</h1>

{bookings.length === 0 && (
  <div className="empty-booking">
    <h2>No bookings yet 😔</h2>
    <p>Start exploring and book your perfect stay!</p>
  </div>
)}

<div className="booking-list">
  {bookings.map((booking) => (
    <div key={booking._id} className="booking-card">
      <h3>{booking.listing.title}</h3>
      <p><strong>Host:</strong> {booking.host.name}</p>
      <p className={`status ${booking.status}`}>
        Status: {booking.status}
      </p>
    </div>
  ))}
</div>
      <Footer />
    </>
  );
};

export default MyBookings;
