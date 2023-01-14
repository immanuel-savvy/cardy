import express from "express";
import cors from "cors";
import ds_conn from "./ds/conn";
import router from "./routes";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(express.static(__dirname + "/Assets"));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
app.use(bodyParser.json({ limit: "100mb" }));

router(app);

app.get("/", (req, res) => res.send("<div><h1>Hi, its Cardy.</h1></div>"));

app.listen(1178, () => {
  ds_conn();

  console.log("Cardy Backend started on :1178");
});
