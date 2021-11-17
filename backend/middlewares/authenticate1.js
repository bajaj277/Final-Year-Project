const jwt = require("jsonwebtoken");
const Admin = require("../model/adminSchema");
const key = process.env.SECRET_KEY;

const authenticate1 = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, key);
    const rootAdmin = await Admin.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootAdmin) {
      throw new Error("Admin not found");
    }
    req.token = token;
    req.rootAdmin = rootAdmin;
    req.adminID = rootAdmin._id;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized: No token provided");
  }
};

module.exports = authenticate1;
