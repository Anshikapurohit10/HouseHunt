import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPropertyList = async () => {
    if (!user?._id) return;

    try {
      const response = await fetch(
        `https://househunt-8vj2.onrender.com/users/${user._id}/properties`,
        { method: "GET" }
      );

      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, [user]);

  if (!user) {
    navigate("/login");
    return null;
  }

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <h1 className="title-list">My Posted Properties</h1>

      <div className="list">
        {propertyList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            rent,
            status,
          }) => (
            <ListingCard
              key={_id}
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              rent={rent}
              status={status}   // Available / Rented
            />
          )
        )}
      </div>

      <Footer />
    </>
  );
};

export default PropertyList;
