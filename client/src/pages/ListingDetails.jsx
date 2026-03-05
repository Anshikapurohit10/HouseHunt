import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Footer from "../components/Footer"

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();
  const [listing, setListing] = useState(null);

  const getListingDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties/${listingId}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  console.log(listing)


  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  // const start = new Date(dateRange[0].startDate);
  // const end = new Date(dateRange[0].endDate);
  // const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id)
const user = useSelector((state) => state?.user)
  const navigate = useNavigate()
const handleDelete = async () => {
  try {
    const res = await fetch(
      `http://localhost:3001/properties/${listingId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Property deleted successfully");
      navigate("/"); // home page pe bhej do
    } else {
      alert(data.message || "Not authorized");
    }
  } catch (err) {
    console.log("Delete failed:", err.message);
  }
};
  // const handleSubmit = async () => {
  //   try {
  //     const bookingForm = {
  //       customerId,
  //       listingId,
  //       hostId: listing.creator._id,
  //       startDate: dateRange[0].startDate.toDateString(),
  //       endDate: dateRange[0].endDate.toDateString(),
  //       totalPrice: listing.price * dayCount,
  //     }

  //     const response = await fetch("http://localhost:3001/bookings/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(bookingForm)
  //     })

  //     if (response.ok) {
  //       navigate(`/${customerId}/trips`)
  //     }
  //   } catch (err) {
  //     console.log("Submit Booking Failed.", err.message)
  //   }
  // }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
          <div></div>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              src={`http://localhost:3001/${item.replace("public", "")}`}
              alt="listing photo"
            />
          ))}
        </div>

        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>
        <p>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          <img
            src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
          />
          <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

      <div className="title">
  <h1>{listing.title}</h1>

  {user?.role?.toLowerCase() === "host" &&
    listing.creator?._id?.toString() === user?._id?.toString() && (
      <button className="delete_btn" onClick={handleDelete}>
        Delete Property
      </button>
  )}
</div>
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;
