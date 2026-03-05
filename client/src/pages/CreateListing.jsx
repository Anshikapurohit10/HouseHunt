import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories, types, facilities } from "../data";

import { RemoveCircleOutline, AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const CreateListing = () => {
  const navigate = useNavigate();
  const creatorId = useSelector((state) => state.user?._id);

  /* PROPERTY BASIC INFO */
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [furnishing, setFurnishing] = useState("Unfurnished");

  /* LOCATION */
  const [location, setLocation] = useState({
    streetAddress: "",
    city: "",
    province: "",
    country: "",
  });

  const handleLocationChange = (e) => {
    setLocation({ ...location, [e.target.name]: e.target.value });
  };

  /* PROPERTY DETAILS */
  const [bedroomCount, setBedroomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [area, setArea] = useState("");
  const [occupancy, setOccupancy] = useState(1);

  /* AMENITIES */
  const [amenities, setAmenities] = useState([]);

  const handleAmenities = (name) => {
    if (amenities.includes(name)) {
      setAmenities(amenities.filter((item) => item !== name));
    } else {
      setAmenities([...amenities, name]);
    }
  };

  /* DESCRIPTION */
  const [descriptionData, setDescriptionData] = useState({
    title: "",
    description: "",
    rent: "",
    deposit: "",
    phone: "",
  });

  const handleDescriptionChange = (e) => {
    setDescriptionData({
      ...descriptionData,
      [e.target.name]: e.target.value,
    });
  };

  /* PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    setPhotos([...photos, ...e.target.files]);
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
if (!category) {
  alert("Please select a category");
  return;
}

if (!type) {
  alert("Please select a rental type");
  return;
}
    const formData = new FormData();

    formData.append("creator", creatorId);
    formData.append("category", category);
    formData.append("type", type);
    formData.append("furnishing", furnishing);

    formData.append("streetAddress", location.streetAddress);
    formData.append("city", location.city);
    formData.append("province", location.province);
    formData.append("country", location.country);

    formData.append("bedroomCount", bedroomCount);
    formData.append("bathroomCount", bathroomCount);
    formData.append("area", area);
    formData.append("occupancy", occupancy);

    formData.append("amenities", JSON.stringify(amenities));

    formData.append("title", descriptionData.title);
    formData.append("description", descriptionData.description);
    formData.append("rent", descriptionData.rent);
    formData.append("deposit", descriptionData.deposit);

    photos.forEach((photo) => {
      formData.append("listingPhotos", photo);
    });

    try {
      const response = await fetch(
        "http://localhost:3001/properties/create",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error creating listing:", error.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="create-listing">
        <h1>Create Property Listing</h1>

        <form onSubmit={handleSubmit}>
          <h2>Property Category</h2>
          <div className="category-list">
            {categories.map((item, index) => (
              <div
                key={index}
                className={`category ${category === item.label ? "selected" : ""}`}
                onClick={() => setCategory(item.label)}
              >
                {item.icon}
                <p>{item.label}</p>
              </div>
            ))}
          </div>

          <h2>Rental Type</h2>
          <div className="type-list">
            {types.map((item, index) => (
              <div
                key={index}
                className={`type ${type === item.name ? "selected" : ""}`}
                onClick={() => setType(item.name)}
              >
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>

          <h2>Location Details</h2>
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={location.streetAddress}
            onChange={handleLocationChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={location.city}
            onChange={handleLocationChange}
            required
          />
          <input
            type="text"
            name="province"
            placeholder="State"
            value={location.province}
            onChange={handleLocationChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={location.country}
            onChange={handleLocationChange}
            required
          />

          <h2>Property Details</h2>

          <p>Bedrooms</p>
          <button type="button" onClick={() => bedroomCount > 1 && setBedroomCount(bedroomCount - 1)}>-</button>
          {bedroomCount}
          <button type="button" onClick={() => setBedroomCount(bedroomCount + 1)}>+</button>

          <p>Bathrooms</p>
          <button type="button" onClick={() => bathroomCount > 1 && setBathroomCount(bathroomCount - 1)}>-</button>
          {bathroomCount}
          <button type="button" onClick={() => setBathroomCount(bathroomCount + 1)}>+</button>

          <p>Area (sq ft)</p>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
          />

          <p>Maximum Occupancy</p>
          <input
            type="number"
            value={occupancy}
            onChange={(e) => setOccupancy(e.target.value)}
            required
          />

          <h2>Amenities</h2>
          <div className="amenities">
            {facilities.map((item, index) => (
              <div
                key={index}
                className={`facility ${amenities.includes(item.name) ? "selected" : ""}`}
                onClick={() => handleAmenities(item.name)}
              >
                {item.icon}
                <p>{item.name}</p>
              </div>
            ))}
          </div>

          <h2>Pricing</h2>
          <input
            type="number"
            name="rent"
            placeholder="Monthly Rent (₹)"
            value={descriptionData.rent}
            onChange={handleDescriptionChange}
            required
          />
          <input
            type="number"
            name="deposit"
            placeholder="Security Deposit (₹)"
            value={descriptionData.deposit}
            onChange={handleDescriptionChange}
            required
          />

          <h2>Description</h2>
          <input
            type="text"
            name="title"
            placeholder="Spacious 2BHK Apartment in City Center"
            value={descriptionData.title}
            onChange={handleDescriptionChange}
            required
          />
          <textarea
            name="description"
            placeholder="Write detailed property description..."
            value={descriptionData.description}
            onChange={handleDescriptionChange}
            required
          />

          <h2>Upload Photos</h2>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUploadPhotos}
            required
          />
<input
  type="tel"
  name="phone"
  placeholder="Phone Number"
  value={descriptionData.phone}
  onChange={handleDescriptionChange}
  required
/>
          <button type="submit" className="submit_btn">
            POST PROPERTY
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreateListing;