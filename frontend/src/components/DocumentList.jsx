import DownloadButton from './DownloadButton.jsx';

function formatSize(size) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 ** 2) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 ** 2).toFixed(1)} MB`;
}

export default function DocumentList({ documents, isLoading, error }) {
  if (isLoading) {
    return <p className="empty-state">Carregando documentos...</p>;
  }

  if (error) {
    return <p className="message error" role="alert">{error}</p>;
  }

  if (documents.length === 0) {
    return <p className="empty-state">Nenhum documento encontrado.</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tamanho</th>
            <th>Enviado em</th>
            <th><span className="sr-only">Ações</span></th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id}>
              <td>{document.originalName}</td>
              <td>{formatSize(document.size)}</td>
              <td>{new Date(document.uploadedAt).toLocaleString('pt-BR')}</td>
              <td><DownloadButton document={document} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}