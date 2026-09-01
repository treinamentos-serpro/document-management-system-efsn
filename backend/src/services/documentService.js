class DocumentService {
  constructor(documentRepository) {
    this.documentRepository = documentRepository;
  }

  createDocument(file, owner) {
    if (!file) {
      const error = new Error('O arquivo é obrigatório');
      error.statusCode = 400;
      throw error;
    }

    if (typeof owner !== 'string' || !owner.trim()) {
      const error = new Error('O proprietário é obrigatório');
      error.statusCode = 400;
      throw error;
    }

    const document = {
      id: file.filename,
      originalName: file.originalname,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      owner: owner.trim(),
      filePath: file.path,
    };

    this.documentRepository.save(document);
    return this.toMetadata(document);
  }

  listDocuments(owner) {
    if (owner !== undefined && (typeof owner !== 'string' || !owner.trim())) {
      const error = new Error('O proprietário deve ser um texto não vazio');
      error.statusCode = 400;
      throw error;
    }

    return this.documentRepository
      .findAll(owner?.trim())
      .map((document) => this.toMetadata(document));
  }

  getDocumentForDownload(id) {
    const document = this.documentRepository.findById(id);

    if (!document) {
      const error = new Error('Documento não encontrado');
      error.statusCode = 404;
      throw error;
    }

    return document;
  }

  toMetadata(document) {
    const { filePath, ...metadata } = document;
    return metadata;
  }
}

module.exports = DocumentService;