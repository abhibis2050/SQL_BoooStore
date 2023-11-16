const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "test",
});

const allowedDomains = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:5175",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedDomains.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

// const code = `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY "91tajmahal"`;

// db.query(code, (error) => {
//     if (error) {
//         console.error("Error altering user: " + error.message);
//       } else {
//         console.log("User altered successfully");
//       }
//   });

app.get("/", (req, res) => {
  res.json({ message: "this is our message" });
});

app.get("/books", (req, res) => {
  const q = "SELECT * from books";

  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    }
    {
      return res.json(data);
    }
  });
});

app.post("/createBooks", (req, res) => {
  const { title, description, cover,price } = req.body;

  console.log(req.body)
  const q = "INSERT INTO books (`title`,`description`,`cover`,`price`) VALUES(?)";
  const values = [title, description, cover,price];

  db.query(q, [values], (err, data) => {
    if (err) {
      return res.json(err);
    }
    {
      return res.json(data);
    }
  });
});


app.delete("/books/:id",(req,res)=>{
    const {id} = req.params

    const q = "DELETE FROM books WHERE id=?"

    db.query(q,[id],(err,data)=>{
        if (err) {
            return res.json(err);
          }
          {
            return res.json({data:data , message:"Book Deleted Successfully"});
          }
    })
})


app.put("/books/:id",(req,res)=>{
    const {id} = req.params
    const { title, description, cover,price } = req.body;
    console.log(req.body)

    const q = "UPDATE books SET `title`=?,`description`= ?,`price`= ?,`cover` = ? WHERE id=?"

   const values = [title, description,price,cover];


    db.query(q,[...values,id],(err,data)=>{
        if (err) {
            return res.json(err);
          }
          {
            return res.json({data:data , message:"Book Updated Successfully"});
          }
    })
})

app.listen(8800, () => {
  console.log("connected to backend");
});
