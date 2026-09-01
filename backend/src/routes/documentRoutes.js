const path = require('node:path');
const { randomUUID } = require('node:crypto');
const express = require('express');
const multer = require('multer');

const storageDirectory = path.resolve(__dirname, '../../storage');
const storage = multer.diskStorage({
  destination: storageDirectory,
  filename: (req, file, callback) => callback(null, randomUUID()),
});
const upload = multer({ storage });

function createDocumentRouter(documentController) {
  const router = express.Router();

  router.post('/upload', upload.single('file'), documentController.upload);
  router.get('/documents', documentController.list);
  router.get('/documents/:id/download', documentController.download);

  return router;
}

module.exports = createDocumentRouter;