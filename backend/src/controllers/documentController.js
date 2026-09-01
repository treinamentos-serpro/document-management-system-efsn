const fs = require('node:fs/promises');

class DocumentController {
  constructor(documentService) {
    this.documentService = documentService;
  }

  upload = async (req, res, next) => {
    try {
      const document = this.documentService.createDocument(req.file, req.body.owner);
      res.status(201).json(document);
    } catch (error) {
      if (req.file) {
        await fs.unlink(req.file.path).catch(() => {});
      }
      next(error);
    }
  };

  list = (req, res, next) => {
    try {
      const documents = this.documentService.listDocuments(req.query.owner);
      res.json(documents);
    } catch (error) {
      next(error);
    }
  };

  download = (req, res, next) => {
    try {
      const document = this.documentService.getDocumentForDownload(req.params.id);
      res.download(document.filePath, document.originalName, (error) => {
        if (error) {
          next(error);
        }
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = DocumentController;