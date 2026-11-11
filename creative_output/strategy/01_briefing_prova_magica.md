# Briefing verificável — Prova Mágica do Polo Norte

Fonte de cada dado: arquivos do projeto (`index.html`, `obrigado.html`, `termos.html`, `js/app.js`, `js/kit-magico.js`, `js/livrinho.js`). Nada abaixo foi inventado; o que não está no projeto aparece em **Dados faltantes**.

## Produto e oferta
| Item | Dado confirmado | Fonte |
|---|---|---|
| Nome | Prova Mágica do Polo Norte (loja "Natal Mágico" no site) | `index.html` |
| Formato | Kit 100% digital em PDF para imprimir; nada físico é enviado | `termos.html` |
| Entrega | Gerado na hora, na página de obrigado, após o pagamento | `obrigado.html`, `js/obrigado.js` |
| Preço base | R$ 9,90, pagamento único | `index.html`, `js/app.js` (PRICE.kit = 990) |
| Versão com foto | R$ 24,90 | `js/app.js` (PRICE.foto = 2490) |
| Checkout | Cakto (link base `sep2jqf_1273980`; com foto `35xqxz7_1290406`) | `js/app.js` |
| Garantia | 7 dias (art. 49 CDC) | `termos.html` |
| Suporte | Somente WhatsApp (15) 99766-3247 | `termos.html`, rodapé |

## Entregáveis (o que pode ser mostrado e citado)
1. Carta do Papai Noel com nome, boa ação, gostos e recado da família (opcional).
2. Certificado Oficial da Lista dos Bonzinhos com número de registro e **código mágico (QR Code)**.
3. Código mágico → abre a página "Livro da Lista dos Bonzinhos" com o nome, a boa ação e "Confirmado" (`lista.html`).
4. 2 bilhetes da Rena Faísca.
5. Meu Livrinho Mágico de Natal: 29 páginas com o nome da criança (colorir, caça-palavras com o nome, labirinto, calendário do Advento, jogo da velha, carteirinha de elfo, missões de bondade, carta e envelope para o Papai Noel, enfeites, máscara).
6. Guia dos pais (2 páginas).
7. Versão com foto: foto da criança na carta, no certificado e na carteirinha.

## Mecanismo único (prova central)
"A única carta do Papai Noel que a criança pode conferir": o QR Code do certificado abre o Livro com o nome dela. É verificável: a página existe e funciona (testada).

## Público
Pais, mães, avós, tios e padrinhos de crianças de 3 a 10 anos no Brasil. A comunicação é sempre com o adulto.

## Materiais existentes
- Mockups: `images/mockup-escaneando-qr.webp`, `mockup-kit-completo.webp`, `mockup-prova-magica.webp`, `mockup-celular-livro.webp`, `mockup-caderno-colorir.webp`. São ilustrações geradas por IA, não fotos do produto impresso.
- Peças reais geradas pelo site: carta, certificado, bilhetes, livrinho e a tela do Livro.
- Áudios de narração do Papai Noel (8), ainda sem vídeo com lip sync.

## Restrições
- Não alegar entrega física, vídeo personalizado ou ligação do Papai Noel.
- Não falar diretamente com a criança e não prometer presentes.
- Não atribuir condições negativas ao espectador ("você que está sem dinheiro").
- Não inventar depoimentos, avaliações, número de vendas, escassez ou prazo.
- Conteúdo com pessoa realista gerada por IA deve ser marcado como IA na Meta.

## Dados faltantes (precisam ser confirmados antes de usar)
| Falta | Impacto |
|---|---|
| Prazo promocional real (data em que o preço sobe) | Sem ele, **não** usar "por tempo limitado". Usar só a urgência natural do calendário (dias até o Natal, tempo para imprimir). |
| Depoimentos e fotos reais de clientes | Nenhuma prova social pode ser usada ainda. |
| Fotos reais do kit impresso | Hoje só existem mockups de IA; vale fotografar uma impressão real. |
| Domínio final do site | Necessário para a URL do anúncio. |
| Pixel da Meta | Não instalado; sem ele não há dados de CPA/ROAS. |
| Música natalina com licença comercial | Os vídeos saem só com voz até haver uma faixa licenciada. |
| Dados de campanha (CTR, CPC, CPA, ROAS, vendas) | Nenhum ainda; a priorização abaixo é hipótese, não resultado. |
