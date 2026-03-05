import { useEffect, useState } from "react";
import "../styles/List.Debugger.scss";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // 🔹 Fetch Properties
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("https://househunt-8vj2.onrender.com/properties");
        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error("Failed to fetch listings:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // 🔹 Open Booking Modal
  const handleBooking = (listing) => {
    setSelectedListing(listing);
  };

  // 🔹 Delete Property (Only Owner)
  const handleDelete = async (listing) => {
    try {
      const res = await fetch(
        `https://househunt-8vj2.onrender.com/${listing}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setListings(listings.filter((item) => item._id !== listing));
        alert("Property deleted successfully");
      } else {
        alert(data.message || "Not authorized");
      }
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <h1 className="title-list">Available Properties</h1>

      <div className="list">
        {listings.length === 0 && <p>No properties available</p>}

        {listings.map((listing) => (
          <div key={listing._id} className="listing_card_wrapper">
            <ListingCard
              listingId={listing._id}
              creator={listing.creator?._id}
              listingPhotoPaths={listing.listingPhotoPaths}
              city={listing.city}
              province={listing.province}
              country={listing.country}
              category={listing.category}
              title={listing.title}
              description={listing.description}
              rent={listing.rent}
            />

            {/* 🔹 Book Button - Only Customer */}
            {user?.role === "customer" && (
              <button
                className="book_btn"
                onClick={() => handleBooking(listing)}
              >
                Book Now
              </button>
            )}

{user?.role?.toLowerCase() === "host" && (
  <button>Delete Property</button>
)}
          </div>
        ))}

        {/* 🔹 Booking Modal */}
        {selectedListing && (
          <div className="booking_modal">
            <div className="modal_content">
              <h2>{selectedListing.title}</h2>
              <p>{selectedListing.description}</p>
              <p>City: {selectedListing.city}</p>
              <p>Rent: ₹{selectedListing.rent}</p>
              <p>Host Phone: {selectedListing.creator?.phone}</p>

              <button
                onClick={async () => {
                  try {
                    const res = await fetch(
                      "https://househunt-8vj2.onrender.com/bookings",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          customerId: user._id,
                          hostId: selectedListing.creator._id,
                          listingId: selectedListing._id,
                        }),
                      }
                    );

                    if (res.ok) {
                      alert("Booking Request Sent!");
                      setSelectedListing(null);
                    } else {
                      alert("Booking failed");
                    }
                  } catch (err) {
                    console.error(err.message);
                  }
                }}
              >
                Confirm Booking
              </button>

              <button onClick={() => setSelectedListing(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Properties;
