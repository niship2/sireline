export default ({ query: { word } }, res) => {
    res.status(200).json({ message: `you requested for ${word} ` });
   };