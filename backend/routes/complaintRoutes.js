const express = require("express");
const complaintRoutes = express.Router();
const {
  postComplaints,
  getAllComplaintsByid,
  getAllComplaints,
} = require("../controller/complaintController");

complaintRoutes.route("/complaints").post(postComplaints);

complaintRoutes.route("/complaints").get(getAllComplaints);

complaintRoutes.route("/complaints/:id").get(getAllComplaintsByid);

module.exports = complaintRoutes;
