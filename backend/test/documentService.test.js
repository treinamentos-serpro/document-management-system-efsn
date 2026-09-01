const assert = require('node:assert');
const { test } = require('node:test');
const DocumentRepository = require('../src/repositories/documentRepository');
const DocumentService = require('../src/services/documentService');

function createService() {
  return new DocumentService(new DocumentRepository());
}

function createFile() {
  return {
    filename: 'document-id',
    originalname: 'relatorio.pdf',
    size: 1024,
    path: '/storage/document-id',
  };
}

test('cria documento com proprietário normalizado sem expor o caminho interno', () => {
  const service = createService();

  const document = service.createDocument(createFile(), '  user-1  ');

  assert.deepStrictEqual(document, {
    id: 'document-id',
    originalName: 'relatorio.pdf',
    size: 1024,
    uploadedAt: document.uploadedAt,
    owner: 'user-1',
  });
  assert.match(document.uploadedAt, /^\d{4}-\d{2}-\d{2}T/);
});

test('rejeita upload sem arquivo ou proprietário válido', () => {
  const service = createService();

  assert.throws(
    () => service.createDocument(undefined, 'user-1'),
    { message: 'O arquivo é obrigatório', statusCode: 400 },
  );
  assert.throws(
    () => service.createDocument(createFile(), '   '),
    { message: 'O proprietário é obrigatório', statusCode: 400 },
  );
});

test('lista documentos pelo proprietário informado', () => {
  const service = createService();
  service.createDocument(createFile(), 'user-1');
  service.createDocument({ ...createFile(), filename: 'another-id' }, 'user-2');

  const documents = service.listDocuments(' user-1 ');

  assert.strictEqual(documents.length, 1);
  assert.strictEqual(documents[0].owner, 'user-1');
  assert.strictEqual(documents[0].filePath, undefined);
});

test('rejeita filtro de proprietário vazio e download inexistente', () => {
  const service = createService();

  assert.throws(
    () => service.listDocuments(''),
    { message: 'O proprietário deve ser um texto não vazio', statusCode: 400 },
  );
  assert.throws(
    () => service.getDocumentForDownload('missing-id'),
    { message: 'Documento não encontrado', statusCode: 404 },
  );
});