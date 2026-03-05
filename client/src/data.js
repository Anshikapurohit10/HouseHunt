import { 
  MdOutlineApartment,
  MdOutlineVilla,
  MdHouse,
  MdBusiness,
  MdBedroomParent,
  MdLocationCity
} from "react-icons/md";

import { BiBuildingHouse } from "react-icons/bi";
import { FaWarehouse } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";

export const categories = [
  {
    label: "All",
    icon: <MdLocationCity />,
  },
  {
    label: "Apartment",
    icon: <MdOutlineApartment />,
    description: "Modern apartments in prime locations",
  },
  {
    label: "Independent House",
    icon: <MdHouse />,
    description: "Standalone residential houses",
  },
  {
    label: "Villa",
    icon: <MdOutlineVilla />,
    description: "Premium villas with luxury amenities",
  },
  {
    label: "PG / Hostel",
    icon: <BsFillHouseDoorFill />,
    description: "Affordable shared accommodations",
  },
  {
    label: "Studio",
    icon: <MdBedroomParent />,
    description: "Compact studio apartments",
  },
  {
    label: "Commercial",
    icon: <MdBusiness />,
    description: "Shops, offices and commercial spaces",
  },
  {
    label: "Warehouse",
    icon: <FaWarehouse />,
    description: "Storage and industrial properties",
  },
  {
    label: "Gated Community",
    icon: <BiBuildingHouse />,
    description: "Secure residential communities",
  },
];
export const types = [
  {
    name: "Full Property",
    description: "Tenant rents the entire property",
    icon: <MdHouse />,
  },
  {
    name: "Private Room",
    description: "Single private room within a property",
    icon: <BsFillHouseDoorFill />,
  },
  
];
export const facilities = [
  { name: "Lift" },
  { name: "24/7 Security" },
  { name: "Power Backup" },
  { name: "Parking" },
  { name: "Water Supply" },
  { name: "Balcony" },
  { name: "Air Conditioning" },
  { name: "WiFi" },
  { name: "Furnished" },
  { name: "Semi-Furnished" },
];