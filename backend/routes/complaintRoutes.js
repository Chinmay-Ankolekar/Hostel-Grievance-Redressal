const express = require("express");
const complaintRoutes = express.Router();
const { postComplaints,putComplaintsByid, getAllComplaintsByUser, getUserType, getUserDetails, deleteComplaints } = require("../controller/complaintController");

complaintRoutes.route("/complaints").post(postComplaints);

complaintRoutes.route("/complaints").get(getAllComplaintsByUser); 

complaintRoutes.route("/complaints/:id").post(putComplaintsByid);

complaintRoutes.route("/userType").get(getUserType);

complaintRoutes.route("/userDetails/:id").get(getUserDetails);

complaintRoutes.route("/complaints/:id").delete(deleteComplaints)

module.exports = complaintRoutes;
