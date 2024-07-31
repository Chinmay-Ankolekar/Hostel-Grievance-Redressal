const express = require("express");
const complaintRoutes = express.Router();
const {
  postComplaints,
  putComplaintsByid,
  getAllComplaintsByUser,
  getUserType,
  getUserDetails,
  deleteComplaints
} = require("../controller/complaintController");
const { authorizeWarden } = require("../middleware/auth");

complaintRoutes.post("/complaints", postComplaints);
complaintRoutes.get("/complaints", authorizeWarden, getAllComplaintsByUser);
// complaintRoutes.get("/complaints", getAllComplaintsByUser);
complaintRoutes.post("/complaints/:id", putComplaintsByid);
complaintRoutes.delete("/complaints/:id", deleteComplaints);

complaintRoutes.get("/userType", getUserType);
complaintRoutes.get("/userDetails/:id", getUserDetails);

module.exports = complaintRoutes;
