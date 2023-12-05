// module.exports = function(req, res, next) {
//     const { full_name, user_email, user_password, type } = req.body;
  
//     function validEmail(userEmail) {
//       return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
//     }
  
//     if (req.path === "/register") {
//       console.log(!user_email.length);
//       if (![full_name, user_email, user_password, type ].every(Boolean)) {
//         return res.json("Missing Credentials");
//       } else if (!validEmail(user_email)) {
//         return res.json("Invalid Email");
//       }
//     } else if (req.path === "/login") {
//       if (![user_email, user_password].every(Boolean)) {
//         return res.json("Missing Credentials");
//       } else if (!validEmail(user_email)) {
//         return res.json("Invalid Email");
//       }
//     }
  
//     next();
//   };