const router = require("express").Router();
const Booking = require("../models/Booking");

// CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const { customerId, hostId, listingId } = req.body;

    const newBooking = new Booking({
      customer: customerId,
      host: hostId,
      listing: listingId,
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET CUSTOMER BOOKINGS
router.get("/customer/:id", async (req, res) => {
  const bookings = await Booking.find({ customer: req.params.id })
    .populate("listing")
    .populate("host");
  res.json(bookings);
});

// GET HOST BOOKINGS
router.get("/host/:id", async (req, res) => {
  const bookings = await Booking.find({ host: req.params.id })
    .populate("listing")
    .populate("customer");
  res.json(bookings);
});

// ACCEPT / REJECT
router.put("/:id", async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(booking);
});
/* DELETE LISTING - Only Owner */



module.exports = router;