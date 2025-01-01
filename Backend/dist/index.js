"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// MongoDB connection URI
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = 'portalup';
// Connect to MongoDB
// Remove this line
// const options: MongoClientOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
// Replace it with:
const options = {};
mongodb_1.MongoClient.connect(mongoUri, options)
    .then((client) => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
