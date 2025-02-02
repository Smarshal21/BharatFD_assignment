const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { Translate } = require("@google-cloud/translate").v2;
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS);

const translator = new Translate();
console.log("Google Translate API connected!");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.error("DB connection error:", error));

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    question_hi: String,
    question_bn: String,
    answer_hi: String,
    answer_bn: String,
  },
});

faqSchema.methods.translateContent = function (language) {
  return {
    question: this.translations[`question_${language}`] || this.question,
    answer: this.translations[`answer_${language}`] || this.answer,
  };
};

const FAQ = mongoose.model("FAQ", faqSchema);

const autoTranslate = async (faq) => {
  const targetLanguages = ["hi", "bn"];
  for (const lang of targetLanguages) {
    const [qTranslated] = await translator.translate(faq.question, lang);
    const [aTranslated] = await translator.translate(faq.answer, lang);
    faq.translations[`question_${lang}`] = qTranslated;
    faq.translations[`answer_${lang}`] = aTranslated;
  }
  return faq;
};

app.post("/faqs", async (req, res) => {
  try {
    let newFAQ = new FAQ(req.body);
    newFAQ = await autoTranslate(newFAQ);
    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/faqs", async (req, res) => {
  try {
    const requestedLang = req.query.lang || "en";
    const faqList = await FAQ.find();
    const translatedFAQs = faqList.map((faq) => faq.translateContent(requestedLang));
    res.json(translatedFAQs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Service active at http://localhost:${PORT}`));
