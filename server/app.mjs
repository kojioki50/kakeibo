import express from "express";
import apiRoutes from "./api-routes/index.mjs"
import "../server/helpers/db.mjs"
import cors from "cors";
import env from "dotenv";
import path from "path";
env.config()

const PORT = process.env.port || 8080;
const app = express();

app.use(express.static('build'))
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
}));


app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.get('*', function (req, res) {
  const indexHtml = path.resolve('build', 'index.html');
  res.sendFile(indexHtml);
})

app.use(function (req, res) {
  res.status(404).json({msg: 'Page Not Found'})
})

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ msg: "エラーが発生しました" });
})


app.listen(PORT,  () => {
  console.log(`Server start: http://localhost:${PORT}`);
});
