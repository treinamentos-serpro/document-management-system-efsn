const API_PREFIX = '/api';

async function parseResponse(response) {
  if (response.ok) {
    return response;
  }

  const body = await response.json().catch(() => null);
  throw new Error(body?.error?.message || 'Não foi possível concluir a operação');
}

export async function uploadDocument(file, owner) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('owner', owner);

  const response = await fetch(`${API_PREFIX}/upload`, {
    method: 'POST',
    body: formData,
  });

  await parseResponse(response);
  return response.json();
}

export async function listDocuments(owner) {
  const query = owner ? `?owner=${encodeURIComponent(owner)}` : '';
  const response = await fetch(`${API_PREFIX}/documents${query}`);

  await parseResponse(response);
  return response.json();
}

export async function downloadDocument(id, originalName) {
  const response = await fetch(
    `${API_PREFIX}/documents/${encodeURIComponent(id)}/download`,
  );

  await parseResponse(response);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = originalName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}