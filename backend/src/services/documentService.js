class DocumentService {
  constructor(documentRepository) {
    this.documentRepository = documentRepository;
  }

  createDocument(file, owner) {
    if (!file) {
      throw this.createHttpError('O arquivo é obrigatório', 400);
    }

    const normalizedOwner = this.getRequiredOwner(owner);

    const document = {
      id: file.filename,
      originalName: file.originalname,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      owner: normalizedOwner,
      filePath: file.path,
    };

    this.documentRepository.save(document);
    return this.toMetadata(document);
  }

  listDocuments(owner) {
    const normalizedOwner = owner === undefined
      ? undefined
      : this.getRequiredOwner(owner, 'O proprietário deve ser um texto não vazio');

    return this.documentRepository
      .findAll(normalizedOwner)
      .map((document) => this.toMetadata(document));
  }

  getDocumentForDownload(id) {
    const document = this.documentRepository.findById(id);

    if (!document) {
      throw this.createHttpError('Documento não encontrado', 404);
    }

    return document;
  }

  getRequiredOwner(owner, errorMessage = 'O proprietário é obrigatório') {
    if (typeof owner !== 'string' || !owner.trim()) {
      throw this.createHttpError(errorMessage, 400);
    }

    return owner.trim();
  }

  createHttpError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }

  toMetadata(document) {
    const { filePath, ...metadata } = document;
    return metadata;
  }
}

module.exports = DocumentService;