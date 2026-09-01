---
name: validar-fluxo-dms
description: "Valida o fluxo de upload, listagem e download do DMS antes de entregar uma alteração."
agent: agent
---

# Validar fluxo do DMS

Atue como QA do Document Management System e valide a alteração atual sem modificar o código da aplicação.

1. Confirme o escopo da alteração e os critérios de aceite em `docs/specs`.
2. Execute os testes automatizados disponíveis no backend.
3. Valide os cenários de maior valor:
   - upload de arquivo válido;
   - listagem com os metadados esperados;
   - download pelo identificador;
   - erros de entrada e arquivo inexistente.
4. Registre apenas falhas reproduzíveis com passos, resultado esperado e resultado obtido.
5. Conclua com `Pronto`, `Pronto com pendências menores` ou `Bloqueado`, citando os testes executados.

Mantenha a verificação proporcional ao escopo. Não inclua dados sensíveis nos artefatos ou no relatório.

Adaptado do fluxo de QA do agente `ai-team-qa` do repositório github/awesome-copilot.