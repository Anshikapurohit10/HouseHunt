const router = require("express").Router();
const multer = require("multer");

const Listing = require("../models/Listing");
const User = require("../models/User")

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      furnishing,
      streetAddress,
      city,
      province,
      country,
      bedroomCount,
      bathroomCount,
      area,
      occupancy,
      amenities,
      title,
      description,
      rent,
      deposit,
    } = req.body;

    const listingPhotos = req.files;

    if (!listingPhotos || listingPhotos.length === 0) {
      return res.status(400).json({ message: "No photos uploaded" });
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      furnishing,
      streetAddress,
      city,
      province,
      country,
      bedroomCount,
      bathroomCount,
      area,
      occupancy,
      amenities: JSON.parse(amenities), // important
      listingPhotoPaths,
      title,
      description,
      rent,
      deposit,
      status: "Available",
    });

    await newListing.save();

    res.status(200).json(newListing);
  } catch (err) {
    console.log("Create listing error:", err);
    res.status(500).json({ message: "Failed to create listing", error: err.message });
  }
});

/* GET lISTINGS BY CATEGORY */
router.get("/", async (req, res) => {
  const qCategory = req.query.category

  try {
    let listings
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator")
    } else {
      listings = await Listing.find().populate("creator")
    }

    res.status(200).json(listings)
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message })
    console.log(err)
  }
})

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params

  try {
    let listings = []

    if (search === "all") {
      listings = await Listing.find().populate("creator")
    } else {
      listings = await Listing.find({
        $or: [
          { category: {$regex: search, $options: "i" } },
          { title: {$regex: search, $options: "i" } },
        ]
      }).populate("creator")
    }

    res.status(200).json(listings)
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message })
    console.log(err)
  }
})

/* LISTING DETAILS */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params
    const listing = await Listing.findById(listingId).populate("creator")
    res.status(202).json(listing)
  } catch (err) {
    res.status(404).json({ message: "Listing can not found!", error: err.message })
  }
})
router.delete("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Property not found" });
    }

    // 🔐 Owner Check
    if (listing.creator.toString() !== req.body.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await listing.deleteOne();

    res.status(200).json({ message: "Property deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* LISTING DETAILS */

module.exports = router
