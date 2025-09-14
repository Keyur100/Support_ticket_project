﻿const { Schema, model } = require("mongoose");
const DepartmentSchema = new Schema({
  name: { type: String, index: true, unique: true },
  isSystem: { type: Boolean, default: false },
  hidden: { type: Boolean, default: false }
});
const Department = model("Department", DepartmentSchema);
module.exports = { Department };
