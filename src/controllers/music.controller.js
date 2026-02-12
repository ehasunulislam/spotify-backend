const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");

async function createMusic(req, res) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res
        .status(403)
        .json({ message: "you don't have access to create an music" });
    }

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: decoded.id,
    });

    res.status(201).json({
      message: "Music created Successfully",
      music,
    });
  } catch (err) {
    console.log(err.message);

    return res.status(401).json({
      message: "unauthorized",
    });
  }
}

module.exports = { createMusic };
