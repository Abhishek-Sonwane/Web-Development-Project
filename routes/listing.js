const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
// for storing data in local folders
// const upload = multer({dest : 'uploads/'});

// Home Routes
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.create)
  );

// New Route
router.route("/new").get(isLoggedIn, listingController.renderNewForm);

// Show Route
router
  .route("/:id")
  .get(wrapAsync(listingController.show))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.renderUpdateForm)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.renderDeleteForm));

// Edit Route
router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
