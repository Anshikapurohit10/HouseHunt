import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";

import WishList from "./pages/WishList";
import PropertyList from "./pages/PropertyList";

import CategoryPage from "./pages/CategoryPage";
import SearchPage from "./pages/SearchPage";
import Properties from "./components/Properties";
import MyBookings from "./pages/MyBookings";
import HostBookings from "./pages/HostBookings";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
        
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          
          <Route path="/properties" element={<Properties />} />
          <Route path="/host-bookings" element={<HostBookings />} />
          <Route path="/my-bookings" element={<MyBookings />} />      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
