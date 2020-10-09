const express = require("express");
const mongoose = require ("mongoose");
const routes= require ("./routes")

const PORT = process.env.PORT || 3001;
const app = express();

// Defining middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets- Heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Defining API routes here
app.use(routes)

//Connecting  to mongoose
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {useNewUrlParser: true});
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
