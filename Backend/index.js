// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const docxToPDF = require("docx-pdf");
// const path = require("path");
// const pdfParse = require("pdf-parse");
// const fs = require("fs");

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // Setting up file storage
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "uploads");
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// // Endpoint to convert Word to PDF and retrieve metadata
// app.post("/convertFile", upload.single("file"), (req, res, next) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({
//                 message: "No file uploaded",
//             });
//         }

//         // Define output file path
//         const outputPath = path.join(
//             __dirname,
//             "files",
//             `${req.file.originalname.replace(/\.[^/.]+$/, "")}.pdf`
//         );

//         docxToPDF(req.file.path, outputPath, async(err, result) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(500).json({
//                     message: "Error converting docx to PDF",
//                 });
//             }

//             // Retrieve metadata of the converted PDF
//             try {
//                 const pdfBuffer = fs.readFileSync(outputPath);
//                 const pdfMetadata = await pdfParse(pdfBuffer);

//                 res.json({
//                     message: "File converted successfully",
//                     metadata: pdfMetadata.info,
//                     downloadPath: `/files/${path.basename(outputPath)}`,
//                 });
//             } catch (metadataError) {
//                 console.log(metadataError);
//                 res.status(500).json({
//                     message: "File converted but unable to extract metadata",
//                 });
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: "Internal server error",
//         });
//     }
// });

// // Serve static files (converted PDFs)
// app.use("/files", express.static(path.join(__dirname, "files")));

// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });
// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");
// const util = require("util");
// const docxToPDF = require("docx-pdf");
// const HummusRecipe = require("hummus-recipe");

// const app = express();
// const port = 3000;

// app.use(cors());

// // Setup file storage
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "uploads");
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// // Convert Word to PDF and apply password protection
// app.post("/convertFile", upload.single("file"), async(req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         const outputFilePath = path.join(
//             __dirname,
//             "files",
//             `${req.file.originalname.replace(/\.[^/.]+$/, "")}.pdf`
//         );

//         // Convert .doc/.docx to PDF
//         const convertToPdf = util.promisify(docxToPDF);
//         await convertToPdf(req.file.path, outputFilePath);

//         // Add password protection using hummus-recipe
//         const protectedFilePath = path.join(
//             __dirname,
//             "files",
//             `${req.file.originalname.replace(/\.[^/.]+$/, "")}_protected.pdf`
//         );

//         const pdfDoc = new HummusRecipe(outputFilePath, protectedFilePath);
//         pdfDoc.encrypt({
//             userPassword: "secure123", // Password to open the PDF
//             ownerPassword: "owner123", // Admin password
//             userProtectionFlag: 4, // Disable copying, allow printing
//         });
//         pdfDoc.endPDF();

//         // Send response with download path
//         res.status(200).json({
//             message: "File converted and protected successfully",
//             downloadPath: `/files/${path.basename(protectedFilePath)}`,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error processing the file" });
//     }
// });

// // Serve static files for downloads
// app.use("/files", express.static(path.join(__dirname, "files")));

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const util = require("util");
const docxToPDF = require("docx-pdf");
const pdfParse = require("pdf-parse");
const HummusRecipe = require("hummus-recipe");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Setup file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Endpoint to convert Word to PDF, retrieve metadata, and apply password protection
app.post("/convertFile", upload.single("file"), async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // Define paths
        const outputFilePath = path.join(
            __dirname,
            "files",
            `${req.file.originalname.replace(/\.[^/.]+$/, "")}.pdf`
        );

        const protectedFilePath = path.join(
            __dirname,
            "files",
            `${req.file.originalname.replace(/\.[^/.]+$/, "")}_protected.pdf`
        );

        // Convert .doc/.docx to PDF
        const convertToPdf = util.promisify(docxToPDF);
        await convertToPdf(req.file.path, outputFilePath);

        // Retrieve metadata of the converted PDF
        const pdfBuffer = fs.readFileSync(outputFilePath);
        const pdfMetadata = await pdfParse(pdfBuffer);

        // Apply password protection using hummus-recipe
        const pdfDoc = new HummusRecipe(outputFilePath, protectedFilePath);
        pdfDoc.encrypt({
            userPassword: "secure123", // Password to open the PDF
            ownerPassword: "owner123", // Admin password
            userProtectionFlag: 4, // Disable copying, allow printing
        });
        pdfDoc.endPDF();

        // Send response with metadata and download path
        res.status(200).json({
            message: "File converted, metadata extracted, and protected successfully",
            metadata: pdfMetadata.info,
            downloadPath: `/files/${path.basename(protectedFilePath)}`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error processing the file" });
    }
});

// Serve static files for downloads
app.use("/files", express.static(path.join(__dirname, "files")));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});