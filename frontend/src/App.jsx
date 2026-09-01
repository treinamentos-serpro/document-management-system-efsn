import { useEffect, useState } from 'react';
import DocumentList from './components/DocumentList.jsx';
import UploadComponent from './components/UploadComponent.jsx';
import { listDocuments } from './services/documentApi.js';
import './App.css';

export default function App() {
  const [owner, setOwner] = useState('');
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadDocuments() {
    setIsLoading(true);
    setError('');

    try {
      setDocuments(await listDocuments(owner.trim()));
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <main>
      <header>
        <p className="eyebrow">DMS</p>
        <h1>Gestão de documentos</h1>
      </header>

      <section aria-labelledby="upload-title">
        <div className="section-heading">
          <div>
            <span className="step">01</span>
            <h2 id="upload-title">Enviar documento</h2>
          </div>
        </div>
        <label className="owner-field">
          <span>Proprietário</span>
          <input
            type="text"
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
            placeholder="Identificador do usuário"
          />
        </label>
        <UploadComponent owner={owner} onUploaded={loadDocuments} />
      </section>

      <section aria-labelledby="documents-title">
        <div className="section-heading">
          <div>
            <span className="step">02</span>
            <h2 id="documents-title">Documentos</h2>
          </div>
          <button className="secondary-button" type="button" onClick={loadDocuments}>
            Atualizar lista
          </button>
        </div>
        <DocumentList documents={documents} isLoading={isLoading} error={error} />
      </section>
    </main>
  );
}
