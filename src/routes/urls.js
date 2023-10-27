const express = require("express");
const Url = require("../models/Url");
const dotenv = require("dotenv");
const { nanoid } = require("nanoid");
dotenv.config({ path: "../config/.env" });
const bodyParser = require("body-parser");
const path = require("path");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = express.Router();


// Load Index HTML Main Page
router.get("/", (request, response, next) => {
  response.sendFile(path.join(__dirname, "../../public/index.html"));
});

// Create a New Short Url
router.post("/short", async (request, response) => {
  const { originalUrl } = request.body;
  const urlCode = nanoid(10);

  const checkIfUrlIsCreated = await Url.findOne({ originalUrl: originalUrl })

  try {
    let url = await Url.findOne({ originalUrl });
    let baseUrl = "hm";
    
    if (checkIfUrlIsCreated) {
      response
        .status(500)
        .json({ message: "Original Url duplicated in the database" });
    } else {
      const shortUrl = `${baseUrl}/${urlCode}`;
      url = new Url({
        originalUrl,
        shortUrl,
        urlCode,
        date: new Date(),
      });

      await url.save();
      response.send(url);
      
    }
  } catch (err) {
    console.error(err);
    response.status(500).json("Internal server error");
  }
});

// GET All Urls From the Database
router.get("/urls", async (request, response) => {
  try {
    const urls = await Url.find();
    response.json(urls);
  } catch (error) {
    console.error(error);
  }
});

// Validation Test with Duplicated Records
router.get("/test", async (request, response) => {

    const { originalUrl } = request.body

    const checkurl = await Url.findOne({ originalUrl: originalUrl })

  if(checkurl) {
    response.status(500).json({ message: "Duplicated Record in the Database"})
  } else {
    response.status(200).json({ message: "New Record Created" })
  }
});

router.get("/:urlCode", async (request, response) => {
  try {
    const url = await Url.findOne({ urlCode: request.params.urlCode })

    if(url) {
      await Url.updateOne({
        surlCodehortUrl: request.params.urlCode, 
      });
      return response.redirect(url.originalUrl)
    } else {
      response.status(404).json('Not Found')
    }
  } catch (error) {
    console.log(error)
    response.status(500).json('Server Error')
  }
})

module.exports = router;

// https://github.com/thebikashweb/easy-link-app/blob/master/server/src/services/urlServices.ts
