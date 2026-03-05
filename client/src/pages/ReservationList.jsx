import { useEffect, useState } from "react";
import "../styles/List.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";
import { useDispatch, useSelector } from "react-redux";
import { setReservationList } from "../redux/state";

const ReservationList = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?._id);
  const reservationList = useSelector((state) => state.user?.reservationList || []);
  const [loading, setLoading] = useState(true);

  // Fetch reservations from backend
  const getReservationList = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`https://househunt-8vj2.onrender.com/users/${userId}/reservations`);
      if (!response.ok) throw new Error("Failed to fetch reservations");

      const data = await response.json();
      dispatch(setReservationList(data));
    } catch (err) {
      console.error("Fetch Reservation List failed!", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReservationList();
  }, [userId]);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="reservation-page">
        <h1 className="title-list">Your Reservations</h1>

        {reservationList.length === 0 ? (
          <p className="no-reservation">You have no reservations yet.</p>
        ) : (
          <div className="list">
            {reservationList.map(({ listingId, hostId, startDate, endDate, totalPrice, booking }) => (
              <ListingCard
                key={listingId._id}
                listingId={listingId._id}
                creator={hostId._id}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                booking={booking ?? true} // default to true
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReservationList;
