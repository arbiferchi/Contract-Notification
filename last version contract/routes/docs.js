const express = require('express');
const Doc = require('../models/docs'); // Adjust the path if needed
const contract = require('../models/contract');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const isAuth = require('../middleware/isAuth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/documents/upload', upload.single('file'), async (req, res) => {
  try {
    const { contractId } = req.body;
    const file = req.file;

    if (!contractId || !file) {
      return res.status(400).json({ message: 'Contract ID and file are required' });
    }

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(contractId)) {
      return res.status(400).json({ message: 'Invalid Contract ID format' });
    }

    const newDoc = new Doc({
      contractId, // Correctly create ObjectId instance
      fileName: file.originalname,
      contentType: file.mimetype,
      size: file.size,
      filePath: file.path // Save file path
    });

    const savedDoc = await newDoc.save();
    res.status(201).json(savedDoc);
  } catch (error) {
    console.error('Error uploading document:', error); // Log the error
    res.status(500).json({ message: 'Error uploading document', error: error.message });
  }
});

// Route to open or download the file by ID
router.get('/documents/open/:id', async (req, res) => {
  try {
    const doc = await Doc.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const filePath = doc.filePath;

    // Serve the file for download
    res.download(filePath, doc.fileName, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ message: 'Error downloading file', error: err.message });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving document', error: error.message });
  }
});
///////
router.get('/documents/view/:id', async (req, res) => {
  try {
    const doc = await Doc.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    let filePath = path.normalize(doc.filePath); // Normalize the file path

    if (typeof filePath !== 'string' || !filePath) {
      return res.status(400).json({ message: 'Invalid file path' });
    }

    console.log('Normalized file path:', filePath);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('File does not exist:', err);
        return res.status(404).json({ message: 'File not found' });
      }

      res.sendFile(filePath, (err) => {
        if (err) {
          console.error('Error sending file:', err);
          res.status(500).json({ message: 'Error retrieving document', error: err.message });
        }
      });
    });
  } catch (error) {
    console.error('Error retrieving document:', error);
    res.status(500).json({ message: 'Error retrieving document', error: error.message });
  }
});

  router.get('documents/telecharger/:id', async (req, res) => {
    try {
      const doc = await Doc.findById(req.params.id);
      if (!doc) {
        return res.status(404).json({ message: 'Document not found' });
      }

      res.download(doc.filePath, doc.fileName, (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).json({ message: 'Error downloading file', error: err.message });
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error downloading document', error: error.message });
    }
  });



// Download a document by ID
router.get('/download/:id', (req, res) => {
  const fileId = req.params.id;
  const filePath = path.join(__dirname, '../uploads', fileId);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }

    res.download(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Internal Server Error');
      }
    });
  });
});
////////

router.get('/documents/telecharger/:id', async (req, res) => {
  try {
    const doc = await Doc.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Log document details
    console.log('Document found:', doc);

    // Ensure file path is correctly constructed
    const file = `${__dirname}/uploads`; 

    // Log file path
    console.log('File path:', filePath);

    // Attempt to download the file
    res.download(file, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ message: 'Error downloading file', error: err.message });
      }
    });
  } catch (error) {
    console.error('Error in download route:', error);
    res.status(500).json({ message: 'Error downloading document', error: error.message });
  }
});

// Get Doc by ID
router.get('/:id', async(req,res) =>{
    try {
        const data = await docs.findOne({_id : req.params.id});
        res.status (200).send ({msg : "the doc is", data});
    
    } catch (error) {
        res.status (400).send ({msg: "cannot get doc ", error})
    }
})
router.get('/contract/:contractId', isAuth, async (req, res) => {
  try {
      const { contractId } = req.params;
      const documents = await Doc.find({ contractId }).lean();  // Changed `doc` to `Doc`

      if (!documents.length) {
          return res.status(404).send({ msg: "No documents found for this contract" });
      }

      res.status(200).send({ msg: "Documents retrieved successfully", data: documents });
  } catch (error) {
      res.status(400).send({ msg: "Cannot retrieve documents", error: error.message });
  }
});



// ... existing code from your question

// New route for serving PDFs
router.get('/:id/download', isAuth, async (req, res) => {
        try {
          const { id } = req.params;
      
          const doc = await doc.findById(id);
          if (!doc) {
            return res.status(404).send({ msg: "Document not found" });
          }
      
          // Implement access control logic here (e.g., check user permissions)
      
          // Generate a temporary, signed URL only after doc is retrieved
          const temporaryUrl = generateTemporaryUrl(doc.filePath);
      
          res.status(200).send({ msg: "Download URL generated", url: temporaryUrl });
        } catch (error) {
          res.status(400).send({ msg: "Failed to generate download URL", error: error.message });
        }
      });
      
      function generateTemporaryUrl(filePath) {
        // ... logic to generate signed URL with expiry using filePath
      }
      
  

module.exports = router;