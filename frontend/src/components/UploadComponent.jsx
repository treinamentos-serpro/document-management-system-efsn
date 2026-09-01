import { useRef, useState } from 'react';
import { uploadDocument } from '../services/documentApi.js';

export default function UploadComponent({ owner, onUploaded }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file || !owner.trim()) {
      setError('Informe o proprietário e selecione um arquivo.');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      await uploadDocument(file, owner.trim());
      setFile(null);
      inputRef.current.value = '';
      onUploaded();
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <label className="file-field">
        <span>Documento</span>
        <input
          ref={inputRef}
          type="file"
          onChange={(event) => setFile(event.target.files[0] || null)}
        />
      </label>
      <button type="submit" disabled={isUploading || !owner.trim()}>
        {isUploading ? 'Enviando...' : 'Enviar documento'}
      </button>
      {error && <p className="message error" role="alert">{error}</p>}
    </form>
  );
}