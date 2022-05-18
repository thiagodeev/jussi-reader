# Jüssi Reader

Lembra do Google Reader? É tipo isso, só que juicier 🧃

O desafio era implementar um web app responsivo (desktop e mobile), de acordo com o layout definido no escopo, utilizando como base as informações contidas nas APIs fornecidas.

## Layout da interface

![Jüssi Reader Wireframe](src/images/jussi_reader_wireframe.png)

## URLs dos endpoints da API: 
- [GET] https://jussi-reader.netlify.app/.netlify/functions/news-one
- [GET] https://jussi-reader.netlify.app/.netlify/functions/news-two

## Requisitos mínimos:
- Implementar layout responsivo para mobile e desktop.
- Implementar menu de categorias para filtragem de artigos.
- Implementar menu de ordenação de artigos por ordem alfabética (titulo) ou cronológica (data).
- Implementar a exibição dos 6 (seis) primeiros artigos na home do web app. Para cada artigo, as informações a serem exibidas serão:
    - título;
    - resumo;
    - categorias (caso possua);
    - imagem destacada (caso possua)
    - data de publicação.
- Implementar uma busca simples de acordo com o título do artigo.
- Implementar paginação de artigos no rodapé da página.
- Os artigos devem conter link com a URL da notícia original.

## Desafios extras:
- Implementar cache local do conteúdo dos artigos, visando o funcionamento offline. 
- Implementar opção de adicionar dinamicamente novos endpoints (APIs) de artigos.
- Implementar a funcionalidade de salvar artigo como favorito. 
- Implementar transições e animações de interface (ex.: ao carregar a página, ao realizar a paginação, etc)

