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

complaintRoutes.post("/complaints", postComplaints);
complaintRoutes.get("/complaints", getAllComplaintsByUser);
complaintRoutes.post("/complaints/:id", putComplaintsByid);
complaintRoutes.delete("/complaints/:id", deleteComplaints);

complaintRoutes.get("/userType", getUserType);
complaintRoutes.get("/userDetails/:id", getUserDetails);

module.exports = complaintRoutes;
