﻿const jwt = require("jsonwebtoken");
const { UserAuth } = require("../models/user.model");
module.exports = async function (req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    req.user = null;
    return next();
  }
  const token = header.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const user = await UserAuth.findById(payload.sub).lean();
    if (!user) return res.status(401).json({ success: false, error: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};
