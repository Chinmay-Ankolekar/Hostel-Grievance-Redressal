const express = require("express");
const complaintRoutes = express.Router();
const { postComplaints,getAllComplaintsByid, getAllComplaintsByUser } = require("../controller/complaintController");

complaintRoutes.route("/complaints").post(postComplaints);

complaintRoutes.route("/complaints").get(getAllComplaintsByUser); 

complaintRoutes.route("/complaints/:id").get(getAllComplaintsByid);

module.exports = complaintRoutes;
