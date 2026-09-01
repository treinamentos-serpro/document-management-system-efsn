class DocumentRepository {
  constructor() {
    this.documents = new Map();
  }

  save(document) {
    this.documents.set(document.id, document);
    return document;
  }

  findAll(owner) {
    return Array.from(this.documents.values()).filter(
      (document) => !owner || document.owner === owner,
    );
  }

  findById(id) {
    return this.documents.get(id);
  }
}

module.exports = DocumentRepository;