# Lote 2 — Cinco conceitos de anúncio (Prova Mágica do Polo Norte)

Hipóteses para teste, **sem garantia de desempenho**. Nenhum dado de campanha existe ainda; toda prioridade abaixo é julgamento estratégico, não resultado.

Base: `01_briefing_prova_magica.md`, `02_matriz_angulos_lote1.md`, `03_analise_audios_papai_noel.md`, conferidos nos arquivos do site.

---

## 0. Fatos conferidos no site para este lote

| Fato usado nos conceitos | Confirmado em |
|---|---|
| Kit digital em PDF para imprimir; nenhum item físico é enviado | `termos.html` (seção 2), `index.html` (nota da oferta e FAQ) |
| R$ 9,90 (kit) e R$ 24,90 (com foto), pagamento único | `index.html` (tabela de planos), `js/app.js` (`PRICE = { kit: 990, foto: 2490 }`) |
| Kit base baixado na hora, após o pagamento, na página de obrigado | `index.html` ("Depois da compra"), `obrigado.html` (botões de download) |
| A **boa ação** digitada aparece na carta ("uma notícia muito especial: você [boa ação]"), no certificado ("está na Lista dos Bonzinhos… porque [boa ação]") e no 2º bilhete da rena | `js/kit-magico.js` (linhas 118, 149, 173) |
| Campo de **recado da família** impresso dentro da carta: "Um recado de quem ama você: “…”" (opcional) | `js/kit-magico.js` (linha 122) |
| Bilhete da Rena Faísca: "ele escondeu uma prova mágica no seu certificado" | `js/kit-magico.js` (linha 167), `index.html` ("A rena dá a pista") |
| Certificado com número de registro e código mágico (QR) que abre o "Livro da Lista dos Bonzinhos" | `js/kit-magico.js`, `lista.html` |
| Livrinho de 29 páginas com o nome; inclui **7 missões de bondade**, calendário do Advento, carteirinha de elfo, caça-palavras, labirinto, jogo da velha, máscara, enfeites, carta e envelope para o Papai Noel | `js/livrinho.js`, `index.html` |
| Guia dos pais (2 páginas) sugere entregar o livrinho no começo de dezembro e usar as missões durante o mês | `js/livrinho.js` (linhas 303 e 311) |
| Passo a passo do site: carta na árvore/janela dias antes; na noite de Natal, carta + certificado + bilhete; "quando perguntarem se é de verdade, escaneiem juntos" | `index.html` (seção "como funciona") |
| Garantia de 7 dias (art. 49 do CDC) | `termos.html` (seção 7) |

**Inconsistência encontrada (não usar até resolver):** `obrigado.html` diz que a foto "entra na carta e no certificado na hora", mas `js/app.js` (linha 285) ainda tem a mensagem "o envio da foto é combinado com o suporte. Prazo: até 24 horas". Por isso **nenhum conceito deste lote promete entrega imediata da versão com foto**; a versão com foto não é o foco do lote.

**Regras aplicadas a todos os conceitos:** falar com o adulto, nunca com a criança; não sugerir vídeo, ligação ou entrega física do Papai Noel; nenhum depoimento, avaliação, número de vendas ou prazo promocional; urgência só do calendário natural; peças com Papai Noel ou pessoa realista gerados por IA marcados como IA na Meta; texto fixo de rodapé em todas as peças: **"Kit digital em PDF para imprimir"**.

---

## 1. Matriz do lote 2 (cada linha com par dor/gatilho diferente)

| ID | Persona | Dor | Desejo | Gatilho principal | Emoção | Objeção atacada | Ocasião |
|---|---|---|---|---|---|---|---|
| L2-01 | Pai ou mãe de criança de 7–10 anos que já "investiga" | A criança mais velha começa a desconfiar e a magia parece perto do fim | Garantir mais um Natal de encanto | **Prova verificável** (demonstração real do QR) | Surpresa / encantamento ("uau, funciona") | "É genérico, a criança não vai acreditar" | Fase dos 7–10 anos |
| L2-02 | Mãe que trabalha fora, 30–42 anos, filhos de 4–8 | Fim de ano corrido, sem tempo para produzir surpresa | Fazer o momento acontecer sem produção | **Facilidade / rapidez** (1-2-3, baixa na hora) | Alívio | "Dá trabalho montar" | Novembro e começo de dezembro |
| L2-03 | Pais de 4–8 anos que valorizam educação e gentileza | O bom comportamento do dia a dia passa sem reconhecimento | Valorizar uma atitude real da criança e incentivar gentileza | **Reforço positivo + especificidade** (a boa ação real escrita na carta e no certificado; 7 missões de bondade) | Orgulho / ternura | "Carta personalizada é só trocar o nome" | Dezembro inteiro (missões) |
| L2-04 | Avó/avô 55–70 anos (também madrinha/padrinho) que passa o Natal longe | Distância: não estar junto na noite de Natal | Estar presente na lembrança do neto | **Pertencimento / presença** (o recado da vó dentro da carta do Papai Noel) | Saudade / afeto | "Presente à distância é frio" | Natal com família separada |
| L2-05 | Pai (ou mãe) 30–45 anos que gosta de "fazer a cena", crianças de 4–8 | A noite de Natal passa rápido e se resume a abrir presentes | Transformar a véspera numa pequena aventura em família | **Curiosidade / narrativa em sequência** (pista da rena → certificado → código) | Diversão / expectativa | "É só um papel" | Noite de 24 de dezembro |

Diferença em relação ao lote 1: L2-01 aprofunda C01/C10 com outra persona (criança mais velha) e emoção; L2-02 aprofunda C05 com reaproveitamento de AD_006; L2-03 aprofunda C09 acrescentando o ritual das 7 missões; L2-04 aprofunda C07 com um mecanismo novo (o recado na carta); L2-05 é ângulo novo (ritual da véspera / caça à prova).

---

## 2. Conceitos

Durações estimadas a ~2,4 palavras/segundo (fala calma em português do Brasil), mais pausas. **Toda duração precisa ser verificada no áudio real gravado**, porque o ritmo de narração, as pausas e a leitura de "R$ 9,90" ("nove e noventa") mudam o tempo final.

### L2-01 — "Aos 8 anos, eles investigam" (prova verificável)

- **Hipótese:** pais de crianças de 7–10 anos, que já ouvem perguntas desconfiadas, respondem mais a uma **demonstração real** do código mágico do que a uma promessa emocional; mostrar o fluxo funcionando reduz a objeção "a criança não vai acreditar / é genérico".
- **Dor:** a criança mais velha começa a desconfiar.
- **Desejo:** ganhar mais um Natal de magia.
- **Gatilho:** prova verificável (demonstração ao vivo).
- **Persona:** pai ou mãe de criança de 7–10 anos (incluir criativo com pai, não só mãe).
- **Emoção:** surpresa / encantamento.
- **Gancho (10 palavras):** "Aos 8 anos, eles começam a investigar o Papai Noel."
- **Formato:** vídeo 9:16 de 20 s (gravação de tela real + mãos segurando o certificado impresso); recorte 4:5 para feed.
- **Roteiro (alvo 20 s, ~42 palavras — verificar no áudio real):**
  - 0–3 s: "Com sete, oito anos, eles começam a investigar."
  - 3–6 s: "Então deixe a prova pronta."
  - 6–10 s: "O certificado vem com um código mágico."
  - 10–16 s: "Aponta o celular… e o Livro da Lista dos Bonzinhos mostra o nome, confirmado."
  - 16–20 s: "Kit digital para imprimir, nove e noventa."
- **CTA:** "Clique em Saiba Mais e veja o código mágico funcionando."
- **Título:** "A prova que ela pode conferir"
- **Texto na tela:** 0 s "Aos 8 anos, eles investigam 🔍" → 6 s "A prova está no certificado" → 12 s "Nome confirmado ✓" → 17 s "R$ 9,90 · PDF para imprimir".
- **Proposta visual:** abertura com mão de adulto segurando o certificado impresso (sem rosto de criança); corte seco para gravação de tela **real** do celular lendo o QR e abrindo `lista.html` (animação de busca → nome confirmado); fechamento no kit sobre a mesa. Luz quente, sem trilha até haver música licenciada.
- **Prova necessária:** gravação de tela real do QR abrindo o Livro com um nome de exemplo (não simular a tela); foto real do certificado impresso (hoje só há mockup de IA).
- **Áudio:** **narração nova** (voz adulta em off, não do Papai Noel). Variante B opcional: reaproveitar **AD_004** (15,4 s, gatilho "conferir o nome") sobre a mesma gravação de tela — mas o gancho de AD_004 é a escola (ângulo C03), então a variante B testa outra dor; conferir a transcrição completa antes.
- **Prioridade de teste:** **Alta** (mecanismo único + prova demonstrável, baixo custo de produção).

### L2-02 — "A carta do Noel vem pronta" (facilidade)

- **Hipótese:** para a mãe com rotina cheia, o bloqueio é o esforço percebido; mostrar que o kit é gerado pronto (preenche → paga → baixa na hora → imprime) converte melhor do que falar de magia.
- **Dor:** fim de ano corrido, sem tempo para preparar surpresa (formulado como situação da época, nunca como falha da pessoa).
- **Desejo:** fazer o momento acontecer sem produção.
- **Gatilho:** facilidade / rapidez (processo em 3 passos).
- **Persona:** mãe que trabalha fora, 30–42 anos, filhos de 4–8.
- **Emoção:** alívio.
- **Gancho (10 palavras):** "Fim de ano voando? A carta do Noel vem pronta."
- **Formato:** vídeo 9:16 de 17–18 s + estático 1:1 / 4:5 em 3 passos.
- **Roteiro A — reaproveitamento:** áudio **AD_006** (17,1 s; gancho "Na correria, momentos especiais acabam ficando para depois"; gatilho "pronto para imprimir"). Cobrir com Papai Noel em lip sync nos primeiros segundos e depois inserir as telas reais do processo. Conferir na transcrição se a fala não atribui culpa direta ao espectador; se atribuir, usar o roteiro B.
- **Roteiro B — narração nova (alvo 18 s, ~41 palavras — verificar no áudio real):** "Dezembro passa voando. Por isso a surpresa já vem pronta: você preenche o nome e a boa ação, paga e baixa na hora. Carta do Papai Noel, certificado e livrinho de vinte e nove páginas. É só imprimir. Nove e noventa."
- **CTA:** "Clique em Saiba Mais e prepare a surpresa em poucos minutos."
- **Título:** "Você só preenche e imprime"
- **Texto na tela:** "1. Preencha o nome" → "2. Baixe na hora" → "3. Imprima" → "R$ 9,90 · kit digital".
- **Proposta visual:** tela dividida em 3 passos com prints **reais** do formulário (`index.html#personalizar`) e da página de obrigado com os botões "Baixar a Prova Mágica (PDF)" e "Baixar o Livrinho Mágico · 29 páginas"; terminar com a folha saindo da impressora (foto real) ou o kit na árvore.
- **Prova necessária:** prints reais do formulário e da página de obrigado; cronometrar o fluxo real antes de usar qualquer "em X minutos" (hoje **não** usar número de minutos).
- **Áudio:** **reaproveita AD_006** (roteiro A) ou narração nova (roteiro B).
- **Prioridade de teste:** **Alta** (já existe áudio; objeção comum em novembro/dezembro).

### L2-03 — "Gentileza de verdade, escrita na carta" (reforço positivo)

- **Hipótese:** pais que valorizam educação respondem a um kit que reconhece **uma atitude real** da criança (a boa ação aparece na carta, no certificado e no bilhete) e propõe um ritual de dezembro (7 missões de bondade) — diferente da "carta com o nome" genérica.
- **Dor:** o bom comportamento do dia a dia passa sem reconhecimento.
- **Desejo:** valorizar uma atitude real e incentivar gentileza durante o mês.
- **Gatilho:** reforço positivo + especificidade da personalização.
- **Persona:** pais de crianças de 4–8 anos interessados em educação e valores.
- **Emoção:** orgulho / ternura.
- **Gancho (9 palavras):** "Gentileza de verdade, escrita na carta do Papai Noel."
- **Formato:** carrossel estático (4–5 cards) + vídeo 4:5 de 25 s com mãos e papéis (sem rosto de criança).
- **Roteiro (alvo 25 s, ~54 palavras — verificar no áudio real):** "Este ano, a carta do Papai Noel pode lembrar uma coisa boa que seu filho fez de verdade. Você escreve a boa ação — ajudou a avó, dividiu o brinquedo — e ela aparece na carta e no certificado. No livrinho, sete missões de bondade para o mês de dezembro. Kit para imprimir, nove e noventa."
- **CTA:** "Clique em Saiba Mais e escreva a boa ação dele."
- **Título:** "O Papai Noel ficou sabendo"
- **Texto na tela:** "Uma boa ação de verdade" → "Na carta e no certificado" → "+ 7 missões de bondade" → "R$ 9,90 · PDF para imprimir".
- **Carrossel:** card 1 gancho; card 2 trecho real da carta com a boa ação destacada ("uma notícia muito especial: você…"); card 3 certificado com "porque [boa ação]"; card 4 página das 7 missões de bondade; card 5 oferta.
- **Proposta visual:** close em papel impresso com marca-texto dourado sobre a frase da boa ação; paleta creme, vermelho e dourado do site; exemplos de boa ação neutros e fictícios (ex.: "ajudou a guardar os brinquedos").
- **Prova necessária:** carta, certificado e página das missões **reais** gerados pelo site com um nome fictício; não usar foto real de criança sem autorização.
- **Áudio:** **narração nova** (nenhum dos 8 áudios fala da boa ação ou das missões). Pode ir sem voz (só texto + legenda) no carrossel.
- **Prioridade de teste:** **Média** (ângulo diferenciado, mas depende de leitura de detalhe; testar após os de prioridade alta).

### L2-04 — "O recado da vó dentro da carta" (presença à distância)

- **Hipótese:** avós e padrinhos que passam o Natal longe compram quando percebem que podem **participar com a própria voz**: o campo de recado imprime a mensagem deles dentro da carta do Papai Noel, e o PDF pode ser enviado para a família imprimir.
- **Dor:** distância — não estar junto na noite de Natal.
- **Desejo:** estar presente na lembrança do neto.
- **Gatilho:** pertencimento / presença (o recado pessoal dentro da carta).
- **Persona:** avó ou avô de 55–70 anos; variação para madrinha/padrinho.
- **Emoção:** saudade / afeto.
- **Gancho (10 palavras):** "O recado da vó dentro da carta do Papai Noel."
- **Formato:** vídeo 4:5 de 25 s + estático 1:1 e 9:16 (público 55+ consome bem feed e WhatsApp).
- **Roteiro (alvo 25 s, ~54 palavras — verificar no áudio real):** "Tem avó que não vai estar perto na noite de Natal. Mas o recado dela pode chegar dentro da carta do Papai Noel. Você escreve o recado, coloca o nome do neto, baixa o PDF e manda para a família imprimir. Junto vêm o certificado com código mágico e o livrinho. Nove e noventa."
- **CTA:** "Clique em Saiba Mais e escreva o seu recado."
- **Título:** "Seu recado na carta do Papai Noel"
- **Texto na tela:** "Longe no Natal?" → "Seu recado vai dentro da carta" → "Envie o PDF para a família" → "R$ 9,90".
- **Proposta visual:** celular de uma pessoa mais velha digitando o recado no formulário (tela real) → close da carta impressa com a linha "Um recado de quem ama você: “…”" destacada → mão de outra pessoa recebendo o PDF no WhatsApp (tela simulada só se rotulada como ilustração; preferir gravação real). Narração em terceira pessoa, **não** em primeira pessoa de "avó cliente", para não parecer depoimento.
- **Prova necessária:** carta real gerada com recado de exemplo; **teste real** de baixar o PDF no celular e compartilhar pelo WhatsApp (Android e iPhone), já que o site diz que o download fica "neste mesmo navegador"; se a avó usar IA realista no vídeo, marcar como IA.
- **Áudio:** **narração nova** (voz feminina madura, calorosa). Nenhum dos 8 áudios cobre avós/distância.
- **Prioridade de teste:** **Média** (persona nova e mecanismo forte, mas público e compartilhamento do PDF ainda não validados).

### L2-05 — "A rena deixou uma pista" (ritual da véspera)

- **Hipótese:** pais que gostam de "montar a cena" respondem a uma narrativa em sequência — bilhete da rena → certificado → código mágico — que transforma o kit numa pequena aventura na noite de Natal; a lacuna de curiosidade ("qual é a pista?") segura a atenção nos primeiros segundos.
- **Dor:** a noite de Natal passa rápido e se resume a abrir presentes.
- **Desejo:** criar uma pequena aventura em família na véspera.
- **Gatilho:** curiosidade / narrativa em sequência.
- **Persona:** pai (ou mãe) de 30–45 anos, crianças de 4–8, que gosta de brincadeira e encenação.
- **Emoção:** diversão / expectativa.
- **Gancho (8 palavras):** "A Rena Faísca deixou uma pista na árvore."
- **Formato:** vídeo 9:16 de 25 s em "capítulos" (1, 2, 3) + estático 4:5 em sequência.
- **Roteiro (alvo 25 s, ~52 palavras — verificar no áudio real):** "Que tal uma pequena aventura na noite de Natal? Primeiro, o bilhete da Rena Faísca avisa: o Papai Noel escondeu uma prova mágica. A criança encontra o certificado com o nome dela. Vocês escaneiam o código juntos… e o Livro da Lista dos Bonzinhos confirma. Kit digital para imprimir, nove e noventa."
- **CTA:** "Clique em Saiba Mais e monte a aventura da véspera."
- **Título:** "Uma caça à prova na noite de Natal"
- **Texto na tela:** "Pista 1: o bilhete da rena 🦌" → "Pista 2: o certificado" → "Pista 3: o código mágico" → "R$ 9,90 · PDF para imprimir".
- **Proposta visual:** câmera em primeira pessoa (POV do adulto) na sala à noite: bilhete preso na árvore → envelope com o certificado → celular lendo o QR (gravação real) → Livro com nome confirmado; luzes de Natal desfocadas, sem rosto de criança.
- **Prova necessária:** bilhete e certificado reais impressos; gravação real do QR; deixar claro que a "aventura" é montada pela família seguindo o guia dos pais (o site não oferece caça ao tesouro como item — o add-on "Caça ao Tesouro" está oculto/desativado em `index.html` e **não pode ser citado**).
- **Áudio:** **narração nova** recomendada. Variante opcional: testar **AD_008** (35,0 s, "Imagine a criança esperando uma surpresa…") como trilha de voz, somente se a transcrição completa combinar com a sequência e após corte para ~25 s (o corte também precisa ser verificado no áudio).
- **Prioridade de teste:** **Média-alta** (ângulo novo, forte para o fim de novembro e dezembro; produção um pouco maior).

---

## 3. Uso dos 8 áudios já gravados

| Áudio | Uso neste lote | Observação |
|---|---|---|
| AD_001 (33,8 s) | Não usado | Continua no conceito C02 do lote 1 (dúvida "existe?"). |
| AD_002 (32,8 s) | Não usado | Continua no C03 (escola). |
| AD_003 (15,2 s) | Não usado | Continua no C02. |
| AD_004 (15,4 s) | Variante B de **L2-01** | Gancho é escola; usar só como teste de dor diferente sobre a gravação de tela. |
| AD_005 (15,8 s) | Não usado | Continua no C06 (nostalgia). |
| AD_006 (17,1 s) | Roteiro A de **L2-02** | Conferir a transcrição quanto a tom de culpa. |
| AD_007 (35,2 s) | Não usado | Continua no C06. |
| AD_008 (35,0 s) | Variante opcional de **L2-05** | Precisa de corte e conferência da transcrição. |

As transcrições completas (`*_transcricao.txt`) e os tempos por palavra (`LEGENDAS/*.words.json`) citados em `03_analise_audios_papai_noel.md` **não foram encontrados no repositório**; a análise deste lote usou só a tabela-resumo. Antes de reaproveitar qualquer áudio, conferir a fala completa (preço citado, frases sobre prazo e possíveis promessas). Os áudios do Papai Noel são voz sintética (ElevenLabs) e o vídeo terá lip sync por IA: marcar como IA na Meta e nunca sugerir que o kit inclui vídeo ou ligação.

---

## 4. Plano de teste sugerido (hipótese)

1. **Rodada 1:** L2-01, L2-02 e L2-05, orçamento igual, mesmo público amplo de pais (3 dores/gatilhos diferentes: prova x facilidade x curiosidade). Se possível, rodar junto com os vencedores do lote 1.
2. **Rodada 2:** L2-03 e L2-04; L2-04 com público 50+ separado para não competir com o público de pais.
3. Leitura mínima de ~1.000 impressões por criativo antes de qualquer decisão; comparar CTR e CPC no início e CPA só depois que o pixel estiver ativo. Não atribuir causalidade a um único elemento (gancho, voz, visual) sem teste isolado.

---

## 5. Dados faltantes

| Falta | Impacto neste lote |
|---|---|
| Pixel da Meta e dados de campanha (CTR, CPC, CPA, ROAS, vendas) | Prioridades são hipótese; sem pixel não há CPA/ROAS. |
| Depoimentos e fotos reais de clientes | Nenhuma prova social usada; L2-04 em terceira pessoa para não parecer depoimento. |
| Fotos reais do kit impresso | Todos os conceitos dependem de papel impresso real; hoje só há mockups de IA. |
| Gravação de tela real do QR abrindo `lista.html` | Essencial para L2-01 e L2-05. |
| Transcrições completas dos áudios AD_001–AD_008 | Necessárias para confirmar o reaproveitamento de AD_004, AD_006 e AD_008. |
| Teste de baixar e compartilhar o PDF pelo WhatsApp no celular | Essencial para L2-04. |
| Tempo real do fluxo de compra (preencher → pagar → baixar) | Sem ele, não usar "em X minutos" em L2-02. |
| Inconsistência da versão com foto (na hora x até 24 h) | Não prometer prazo da versão com foto até corrigir `js/app.js` ou `obrigado.html`. |
| Prazo promocional real | Não existe; nenhuma peça usa "por tempo limitado". |
| Domínio final | `index.html` aponta `https://natalmagico.store/` como canonical; confirmar se está no ar antes de usar na URL do anúncio. |
| Música natalina com licença comercial | Vídeos só com voz. |
| Limite de caracteres dos campos boa ação e recado | Confirmar no formulário antes de mostrar exemplos longos na tela. |

---

## 6. Handoff

### Para **video-performance**
- **L2-01** — vídeo 9:16 de 20 s: gravação de tela real do QR + certificado impresso; narração nova em off (roteiro na seção 2); variante B com AD_004.
- **L2-02** — vídeo 9:16 de 17–18 s: roteiro A com **AD_006** (lip sync do Papai Noel + prints reais do processo) e roteiro B com narração nova.
- **L2-04** — vídeo 4:5 de 25 s: narração nova feminina madura em terceira pessoa; tela real do formulário com o recado + carta impressa.
- **L2-05** — vídeo 9:16 de 25 s em 3 capítulos (POV do adulto); narração nova; variante opcional com AD_008 cortado.
- **L2-03** — vídeo 4:5 de 25 s opcional (mãos + papéis), narração nova ou só legenda.
- Para todos: legendas queimadas, rodapé "Kit digital em PDF para imprimir", marcar IA quando houver Papai Noel/pessoa sintética, **medir a duração real do áudio** e ajustar o texto na tela aos tempos reais; sem música até haver licença.

### Para **visual-conversion**
- **L2-03** — carrossel de 5 cards (gancho, carta com boa ação destacada, certificado "porque…", página das 7 missões, oferta), 1:1 e 4:5.
- **L2-02** — estático em 3 passos (preencher, baixar, imprimir) com prints reais, 1:1 / 4:5 / 9:16.
- **L2-04** — estático com a linha do recado destacada na carta ("Seu recado vai dentro da carta"), 1:1 / 4:5 / 9:16.
- **L2-05** — estático 4:5 em sequência "Pista 1 → 2 → 3".
- **L2-01** — estático 4:5 com antes/depois (certificado → tela "Nome confirmado ✓").
- Para todos: usar peças **reais** geradas pelo site com nome fictício; mockups de IA só como apoio e nunca como foto do produto; nenhuma foto real de criança sem autorização; preço R$ 9,90 sempre junto de "PDF para imprimir".
