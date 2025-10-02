const express = require("express");
const Router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const facultyCordController = require("../controllers/facoultiCordinatorControllers");

const FacultyImagesDir = path.join(__dirname, "..", "public", "Faculty_Images");
if (!fs.existsSync(FacultyImagesDir)) {
  fs.mkdirSync(FacultyImagesDir, { recursive: true });
}

const tempStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FacultyImagesDir);
  },
  filename: function (req, file, cb) {
    const tempFileName = `${Date.now()}_${file.originalname}`;
    cb(null, tempFileName);
  },
});

const upload = multer({ storage: tempStorage });

const renameFilesMiddleware = (req, res, next) => {
  if (!req.body.cordinatorId) {
    return res.status(400).json({ message: "cordinatorId is required" });
  }

  const cordinatorId = req.body.cordinatorId.replace(/\s+/g, "_");

  if (req.files["cordinatorImage"]) {
    const cordinatorImageFile = req.files["cordinatorImage"][0];
    const logoExtension = path.extname(cordinatorImageFile.originalname);
    const newLogoFileName = `${cordinatorId}${logoExtension}`;
    fs.renameSync(
      cordinatorImageFile.path,
      path.join(FacultyImagesDir, newLogoFileName)
    );
    req.files["cordinatorImage"][0].filename = newLogoFileName;
  }
  next();
};

Router.post(
  "/api/add-faculty-cordinate",
  upload.fields([{ name: "cordinatorImage" }]),
  renameFilesMiddleware,
  facultyCordController.addFacultyCordintesTo
);

Router.put(
  "/api/edit-faculty-cordinate",
  upload.fields([{ name: "cordinatorImage" }]),
  renameFilesMiddleware,
  facultyCordController.editingCordinate
);

Router.delete(
  "/api/delete-faculty-cordinate/:cordinatorId",
  facultyCordController.deleteCordinate
);

Router.get(
  "/api/get-faculty-cordinate",
  facultyCordController.getCordianteData
);
Router.get(
  "/api/get-faculty-cordinate-by-event-dept/:department/:event",
  facultyCordController.getCordianteDataByEventAndDept
);
module.exports = Router;
