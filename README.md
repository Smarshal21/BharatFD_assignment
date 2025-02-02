# 🚀 BharatFD

## **Project Overview**
BharatFD is a full-stack web application that enables users to create, store, and translate text seamlessly. The platform utilizes TinyMCE for a rich-text editing experience, MongoDB for efficient data storage, and Google Cloud Translate to provide multilingual support. Users can input content in English, and the system automatically generates translations in Hindi and Bengali, ensuring broader accessibility.

## **Working Overview**
![Workflow Image](/Screenshots/1.image.png)


### **Steps:**
1. User enters content in the form using TinyMCE editor.
2. On submission, the content is stored in MongoDB.
3. Google Cloud Translate automatically translates the text into Hindi and Bengali.
4. Translated content is displayed based on user selection.

## **Tech Stack**
- **Frontend:** HTML, CSS, JavaScript (TinyMCE editor)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Cloud Services:** Google Cloud Translate API

## **Setup Instructions**
1. **Clone repository:**  
   ```sh
   git clone https://github.com/<username>/<reponame>.git
   ```
2. **Install dependencies:**  
   ```sh
   npm install
   ```
3. **Configure environment:** Create a `.env` file and add the following:
   ```env
   MONGO_URI=your-mongodb-connection-url
   TINYMCE_API_KEY=your-tinymce-api-key
   GOOGLE_APPLICATION_CREDENTIALS=./key.json
   ```
4. **Setup TinyMCE:** Get API key from [TinyMCE](https://www.tiny.cloud/) and allow domain access.
5. **Setup Google Cloud API:** Generate credentials for Translate API and save as `key.json`.
6. **Run server:**  
   ```sh
   npm start
   ```

## **Example API Usage**

### **POST /faqs** - Add a new FAQ
#### **Request Body:**
```json
{
  "question": "How does the monsoon affect agriculture?",
  "answer": "Monsoon rains are crucial for crops like rice and wheat."
}
```

### **GET /faqs** - Retrieve FAQs in a specific language
#### **Request:**
```sh
GET /faqs?lang=bn
```
#### **Response:**
```json
[
  {
    "question": "বর্ষাকাল কৃষিতে কীভাবে প্রভাব ফেলে?",
    "answer": "বর্ষার বৃষ্টি ধান ও গমের জন্য অত্যন্ত গুরুত্বপূর্ণ।"
  }
]
```
