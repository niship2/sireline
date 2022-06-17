const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./public/sireline.db");

var edge1 = {}
//db.all("select * from edge limit 100", (err, rows) => {
db.all("select json_group_array(json_object('from',source)) from edge limit 10", (err, rows) => {
    console.log(rows)
    //edge1 = rows
    //edge1.push(rows)
    //rows.forEach(row => console.log(row.source));
});
db.close()

export default ({ query: { word } }, res) => {
    res.status(200).json({ message: `you requested for ${word} ` });
   };