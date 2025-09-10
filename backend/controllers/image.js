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
