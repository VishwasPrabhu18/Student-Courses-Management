import UserModel from "../models/users.js";

export const fetchImages = async (req, res) => {
  const { q } = req.query;
  const PAGES = req.query.pages || 1;
  const PER_PAGE = req.query.per_page || 12;

  const response = await fetch(
    `${process.env.PIXABAY_URL}?key=${process.env.PIXABAY_API_KEY}&q=${q}&image_type=photo&per_page=${PER_PAGE}&page=${PAGES}`
  );

  const data = await response.json();
  const imageUrls = data.hits.map((hit) => hit.webformatURL);
  res.json(imageUrls);
};

export const uploadImage = async (req, res) => {
  const { id } = req.user;
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.profilePic = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
    await user.save();

    res.json({
      message: "Profile pic uploaded successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
