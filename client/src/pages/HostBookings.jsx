import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import "../styles/Booking.scss";
const HostBookings = () => {
  const user = useSelector((state) => state.user);
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await fetch(
      `http://localhost:3001/bookings/host/${user._id}`
    );
    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  const updateStatus = async (bookingId, status) => {
    await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchRequests(); // refresh
  };

  return (
    <>
      <Navbar />
      <h1 className="booking-title">Booking Requests</h1>

{requests.length === 0 && (
  <div className="empty-booking">
    <h2>No booking requests yet</h2>
  </div>
)}

<div className="booking-list">
 {requests.map((booking) => {
  if (!booking.listing) return null; // skip broken booking

  return (
    <div key={booking._id} className="booking-card">
      <h3>{booking.listing.title}</h3>

      <p><strong>Property Type:</strong> {booking.listing.category}</p>
      <p><strong>City:</strong> {booking.listing.city}</p>
      <p><strong>Rent:</strong> ₹{booking.listing.rent}</p>

      <hr />

      <p><strong>Customer:</strong> {booking.customer?.name}</p>

      <p className={`status ${booking.status}`}>
        Status: {booking.status}
      </p>

      {booking.status === "pending" && (
        <div className="action-buttons">
          <button
            className="accept-btn"
            onClick={() => updateStatus(booking._id, "accepted")}
          >
            Accept
          </button>
          <button
            className="reject-btn"
            onClick={() => updateStatus(booking._id, "rejected")}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
})}
</div>
      <Footer />
    </>
  );
};

export default HostBookings;