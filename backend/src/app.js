const express = require('express');
const DocumentController = require('./controllers/documentController');
const DocumentRepository = require('./repositories/documentRepository');
const createDocumentRouter = require('./routes/documentRoutes');
const DocumentService = require('./services/documentService');

const app = express();
const PORT = process.env.PORT || 3000;

const documentRepository = new DocumentRepository();
const documentService = new DocumentService(documentRepository);
const documentController = new DocumentController(documentService);

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(createDocumentRouter(documentController));

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'Erro interno do servidor' : error.message;
  return res.status(statusCode).json({ error: { message } });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`DMS backend ouvindo na porta ${PORT}`);
  });
}

module.exports = app;
