const express = require("express");
const complaintRoutes = express.Router();
const { postComplaints,putComplaintsByid, getAllComplaintsByUser } = require("../controller/complaintController");

complaintRoutes.route("/complaints").post(postComplaints);

complaintRoutes.route("/complaints").get(getAllComplaintsByUser); 

complaintRoutes.route("/complaints/:id").post(putComplaintsByid);

module.exports = complaintRoutes;
