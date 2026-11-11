# Lote 2 — Três conceitos de imagem (visual-conversion)

Etapa de **estratégia**: conceitos, especificações e prompts. **Nenhuma imagem final foi gerada nesta etapa** e nenhum serviço pago ou API externa foi usado. As 9 peças estão no `manifesto_imagens.csv` com status `planejado`.

Entrada: `creative_output/strategy/04_lote2_cinco_conceitos.md` (handoff para visual-conversion), `01_briefing_prova_magica.md`, `manifesto_imagens.csv` e `prompts_imagens.md` (Lote 1: C01, C04, C07, C08, C09, C10).

---

## 1. Escolha dos 3 conceitos e justificativa

| Handoff | Abordagem visual | Repete o Lote 1? | Decisão |
|---|---|---|---|
| **L2-05** "A rena deixou uma pista" | **Curiosidade / narrativa em sequência** | Não. Nenhuma peça do Lote 1 usa o bilhete da rena como protagonista nem a ideia de "pistas". | **Escolhido (Conceito A)** |
| **L2-02** 3 passos (preencher, baixar, imprimir) | **Demonstração do processo / facilidade** | Não. O Lote 1 mostra o produto pronto; nenhuma peça mostra o site e o download. | **Escolhido (Conceito B)** |
| **L2-04** recado da vó dentro da carta | **Cena emocional + benefício concreto** (a linha real do recado) | Parcial: C07 já fala com avós. A diferença é o mecanismo: C07 é um chamado de persona com o kit de mockup em branco; L2-04 mostra **a frase real do recado impressa na carta**. | **Escolhido (Conceito C)**, com composição e paleta bem diferentes de C07 |
| L2-01 antes/depois certificado → "Nome confirmado" | Demonstração do QR | **Sim**: C01 e C10 já fazem certificado + tela do Livro. Um estático novo seria quase igual a C10. | Fica para o **vídeo** (gravação de tela real), onde a demonstração ganha força. |
| L2-03 carrossel boa ação + 7 missões | Reforço positivo | **Sim**: C09 já destaca a boa ação na carta; C08 já mostra o livrinho. | Adiado. Se voltar, usar só o card das "7 missões de bondade" como peça própria. |

Resultado: três abordagens diferentes entre si (curiosidade, processo, emoção) e diferentes do padrão do Lote 1 também no visual. O Lote 1 usa sempre fundo azul-noite, título em cima, peças no meio e pílula de preço embaixo; o Lote 2 quebra esse padrão com fundo de neve (A), interface clara em passos (B) e close de papel em tela cheia (C).

---

## 2. Regras aplicadas às 9 peças

- Falar com o adulto; nunca com a criança. Nada de entrega física, vídeo ou ligação do Papai Noel.
- Preço: **R$ 9,90** (versão padrão), sempre junto de "PDF para imprimir". A versão com foto (R$ 24,90) **não aparece** neste lote (inconsistência de prazo de entrega da foto ainda aberta, ver `04_lote2…`, seção 0).
- Rodapé fixo em todas as peças: **"Kit digital em PDF para imprimir"** (Inter Medium, 26–28 px, 70% de opacidade).
- Sem depoimentos, avaliações, número de vendas, escassez ou prazo. A única garantia citável é a de **7 dias** (`termos.html`, seção 7), e só na legenda.
- Todas as peças usam páginas **reais** geradas pelo site com nome fictício ("Sofia"). Mockups de IA de `images/mockup-*.webp` **não** entram neste lote. Se a camada opcional de foto por IA do Conceito C for usada, a peça leva "Imagem ilustrativa" e precisa ser marcada como IA na Meta.
- Tipografia: Inter (Bold/ExtraBold no título, Medium no apoio) de `/usr/share/fonts/opentype/inter`. A letra cursiva só aparece dentro das páginas reais do kit (não recriar a fonte cursiva nas frases do anúncio).
- Margens: 64 px nas laterais em todos os formatos. **Área segura do 9:16 (1080x1920):** nada essencial nos primeiros 270 px (14%, barra de perfil) nem nos últimos 670 px (35%, legenda e botões do Reels). Todo texto, preço e peça-chave ficam entre **y = 270 e y = 1250**. A faixa de baixo recebe só fundo e o rodapé fixo (que pode ser coberto sem prejuízo, pois também está na legenda).
- Título do anúncio com no máximo 6 palavras; legibilidade conferida em tela de 360 px de largura (título ≥ 64 px no 1:1/4:5, ≥ 72 px no 9:16).

---

## 3. Conceito A — L2-05 "A rena deixou uma pista" (curiosidade)

- **Ângulo:** curiosidade / narrativa em sequência. O kit vira uma pequena "caça à prova" montada pela família na noite de Natal: bilhete da rena → certificado → código mágico.
- **Público:** pai ou mãe de 30–45 anos, crianças de 4–8, que gosta de brincar e "fazer a cena". Público amplo de pais (rodada 1 do plano de teste).
- **Gancho na arte (5 palavras):** **"A rena deixou uma pista"**
- **Apoio (1 linha):** "Pista 1 → 2 → 3 até o nome dela no Livro"
- **Foco visual único:** o bilhete real "Psiu, Sofia!" com a Rena Faísca e sua lupa, de onde sai uma trilha de pegadas de neve que leva ao certificado e ao celular.

### Paleta
Fundo "neve" `#F6F2EA` com textura de flocos sutil (branco 40%); pegadas e linha pontilhada `#9FB4BF`; números das pistas em círculos `#A3302A` com algarismo `#FFFFFF`; título `#14222B`; destaque da palavra "pista" em `#A3302A`; preço em pílula `#14222B` com texto `#EDC994`. Cores de `obrigado.html`/site.

### Composição
**1:1 (1080x1080)**
- Título em 2 linhas, alinhado à esquerda, x = 64, y = 64–250 (Inter ExtraBold 78 px).
- Bilhete 1 (metade de cima de `bilhetes.jpg`, recorte 1054x740) inclinado −4°, à esquerda, largura 560 px, y ≈ 300–700. Círculo "1" no canto.
- Trilha de pegadas em curva (S suave) saindo da lupa da rena para a direita e para baixo.
- Certificado (`prova-2.png`, recorte da página do certificado) com largura 400 px, à direita, y ≈ 560–850, círculo "2"; ao lado, recorte do celular com `lista-hd.png` (largura 190 px) sobreposto ao canto do certificado, círculo "3".
- Faixa inferior y = 930–1040: pílula "R$ 9,90 · PDF para imprimir" à esquerda; rodapé fixo à direita em 2 linhas.

**4:5 (1080x1350)** (formato principal do handoff)
- Título centralizado, y = 80–300 (2 linhas, 84 px). Apoio "Pista 1 → 2 → 3 até o nome dela no Livro" y = 320 (34 px).
- Sequência vertical em zigue-zague, cada peça com seu número: bilhete 1 à esquerda (largura 600, y 400–820), certificado à direita (largura 520, y 760–1050), celular com Livro à esquerda (largura 230, y 900–1190).
- Pegadas ligam 1 → 2 → 3. Pílula de preço y = 1220; rodapé y = 1300.

**9:16 (1080x1920)**
- Título y = 280–520 (2 linhas, 92 px), apoio y = 540.
- Sequência em coluna única, cada item com número à esquerda: bilhete (largura 760, y 620–1000), certificado (largura 620, y 980–1140, parcialmente atrás), celular (largura 220, x à direita, y 960–1240).
- Pílula de preço y = 1170–1240 (dentro da área segura).
- y > 1250: só neve, pegadas que somem e o rodapé fixo (y ≈ 1820).

### Assets
- **Reais (já existem):** `scratchpad/bilhetes.jpg` (bilhete 1 "Psiu, Sofia!"), `Prova-Magica-Sofia.pdf` → `static_assets/prova-2.png` (certificado), `static_assets/lista-hd.png` (tela real do Livro com "Confirmado").
- **A produzir aqui:** pegadas vetoriais (SVG desenhado à mão, 2 formas de casco alternadas) e círculos numerados; textura de neve (ruído + desfoque no Pillow); moldura simples de celular (retângulo arredondado preto 36 px de raio) para a captura do Livro.
- **Não usar:** o add-on "Caça ao Tesouro" (oculto em `index.html`). A "aventura" é só a ordem de entrega sugerida pelo site.

### Prompt de imagem (opcional; não é necessário para produzir)
> Fotografia realista vista de cima de uma sala de estar à noite, piso de madeira com uma trilha de pequenas pegadas de rena feitas de neve artificial levando até a base de uma árvore de Natal iluminada; luzes quentes desfocadas no canto superior; muito espaço vazio no centro para sobrepor papéis; sem pessoas, sem rostos, sem texto, sem letras, sem logotipos; tons creme, vermelho e dourado; proporção 4:5.

Se usado como fundo, é imagem gerada por IA: incluir "Imagem ilustrativa" e marcar IA na Meta. A versão padrão do conceito não precisa dele.

### Legenda do anúncio
> Que tal transformar a noite de Natal numa pequena aventura? 🦌
> Pista 1: o bilhete da Rena Faísca avisa que o Papai Noel escondeu uma prova mágica.
> Pista 2: o certificado com o nome da criança.
> Pista 3: vocês apontam o celular para o código dourado e o Livro da Lista dos Bonzinhos mostra o nome dela.
> Você monta a sequência com o guia dos pais. Kit digital em PDF para imprimir, R$ 9,90. Nada físico é enviado.

- **Título (campo da Meta):** "Uma caça à prova no Natal"
- **CTA:** botão **Saiba mais**; frase final da legenda: "Clique em Saiba Mais e monte a aventura da véspera."
- **Hipótese de teste:** a lacuna de curiosidade ("qual é a pista?") e a sequência numerada aumentam a parada no feed (CTR de link) entre pais de 4–8 anos em comparação a C01/C10, que mostram a prova direto. Métrica inicial: CTR de link e CPC, ≥ 1.000 impressões por peça.
- **Produzível aqui sem custo?** **Sim.** Todos os elementos são reais ou vetoriais simples (Pillow/ImageMagick + Inter). O fundo por IA é opcional.

---

## 4. Conceito B — L2-02 "Você só preenche e imprime" (facilidade)

- **Ângulo:** demonstração do processo. Mostra o caminho real do site em 3 passos: preencher → baixar → imprimir.
- **Público:** mãe que trabalha fora, 30–42 anos, filhos de 4–8; quem acha que "dá trabalho montar".
- **Gancho na arte (5 palavras):** **"Você só preenche e imprime"**
- **Apoio:** nenhum número de minutos (o fluxo ainda não foi cronometrado). Etiquetas dos passos: "1 Preencha o nome", "2 Baixe na hora", "3 Imprima".
- **Foco visual único:** três "cartões de passo" em sequência horizontal (1:1) ou vertical (4:5, 9:16), cada um com um print real do site; o passo 3 termina numa folha A4 real.

### Paleta
Interface clara para contrastar com o Lote 1: fundo `#F8F3E9` (creme do cartão de `obrigado.html`); cartões brancos `#FFFFFF` com borda `#CDBF9F` e sombra suave; números em círculos `#14222B` com algarismo `#EDC994` (o mesmo estilo de `.ob-steps`); título `#14222B`; seta e destaque `#A3302A`; pílula de preço `#A3302A` com texto branco.

### Composição
**1:1 (1080x1080)**
- Título centralizado, y = 64–200 (1 ou 2 linhas, 72 px).
- 3 cartões lado a lado (largura 300, altura 560, espaço 36 px), y = 260–820, com setas `→` vermelhas entre eles. Cada cartão: círculo numerado no topo, rótulo (Inter Bold 30 px) e o print recortado:
  1. formulário com "Primeiro nome: Sofia" e o campo "Uma conquista ou boa ação" preenchido;
  2. página de obrigado com os botões "Baixar a Prova Mágica (PDF)" e "Baixar o Livrinho Mágico · 29 páginas (PDF)";
  3. folha A4 da carta (`carta.jpg`) com leve sombra e borda branca, como papel impresso.
- Pílula "R$ 9,90 · PDF para imprimir" centralizada, y = 880–950; rodapé y = 1020.

**4:5 (1080x1350)**
- Título à esquerda, y = 72–260 (2 linhas, 84 px).
- 3 cartões empilhados na vertical (largura 952, altura 270 cada, espaço 24), y = 300–1140. Cada cartão: número + rótulo à esquerda (largura 380) e print à direita (largura 520, cortado na parte relevante).
- Pílula de preço y = 1180–1250; rodapé y = 1300.

**9:16 (1080x1920)**
- Título y = 280–500 (2 linhas, 92 px).
- 3 cartões empilhados (largura 952, altura 230 cada), y = 540–1250, versão compacta do 4:5: só número, rótulo de 3 palavras e um detalhe do print (botão de baixar no passo 2; folha A4 no passo 3).
- Pílula de preço dentro do cartão 3 (canto inferior direito) para não cair abaixo de y = 1250.
- y > 1250: só fundo creme e rodapé fixo.

### Assets
- **Reais (já existem):** `scratchpad/carta.jpg` (carta real da Sofia para o passo 3).
- **A produzir aqui (Playwright/Chromium com o site servido localmente):**
  1. captura do formulário `index.html#personalizar` em 390 px de largura (escala 3x) com "Sofia" e uma boa ação fictícia ("ajudou a cuidar do irmão mais novo");
  2. captura **nova** de `obrigado.html` com os dois botões de download atuais. **Não usar** `scratchpad/ob.png`: é uma versão antiga, com "Baixar meu kit mágico (PDF)" e a frase "o caderno chega pela Cakto", que não existe mais na página.
- **Foto real opcional:** folha saindo da impressora (fotografar em casa) para substituir a folha digital do passo 3.

### Prompt de imagem (opcional; só para trocar o passo 3)
> Fotografia realista em close de uma impressora doméstica branca imprimindo uma folha A4 de papel creme com bordas decorativas natalinas vermelhas e douradas; mesa de madeira clara; um raminho de pinheiro e luzes de Natal desfocadas ao fundo; sem pessoas, sem texto legível na folha, sem logotipos de marca na impressora; luz natural quente; proporção 1:1.

A folha gerada por IA não pode parecer a carta real; usar só como ilustração do ato de imprimir, com "Imagem ilustrativa" e marcação de IA. A versão padrão usa a carta real e dispensa o prompt.

### Legenda do anúncio
> Dezembro passa voando. Por isso a surpresa do Papai Noel já vem pronta. ✨
> 1. Você preenche o nome e uma boa ação da criança.
> 2. Paga e baixa na hora, na própria página.
> 3. Imprime em casa: carta do Papai Noel, certificado com código mágico, bilhetes da rena e o livrinho de 29 páginas com o nome dela.
> Kit digital em PDF para imprimir, R$ 9,90, pagamento único. Nada físico é enviado. Garantia de 7 dias.

- **Título (campo da Meta):** "Você só preenche e imprime"
- **CTA:** botão **Saiba mais**; frase final: "Clique em Saiba Mais e prepare a surpresa."
- **Hipótese de teste:** para mães com rotina cheia, ver as telas reais do processo reduz a objeção "dá trabalho" e gera mais cliques do que peças focadas na magia (C01/C10) no mesmo público. Métrica inicial: CTR de link e CPC; quando o pixel estiver ativo, taxa de início de checkout.
- **Produzível aqui sem custo?** **Sim.** Prints via Playwright do site local + carta real; nada pago.

---

## 5. Conceito C — L2-04 "Seu recado vai dentro da carta" (cena emocional)

- **Ângulo:** presença à distância. Quem passa o Natal longe escreve um recado que sai impresso **dentro** da carta do Papai Noel, na linha "Um recado de quem ama você: “…”" (`js/kit-magico.js`, linha 122).
- **Público:** avó/avô de 55–70 anos; variação para madrinha/padrinho e tios. Público 50+ separado na rodada 2.
- **Gancho na arte (6 palavras):** **"Seu recado vai dentro da carta"**
- **Linha de contexto acima do título (pequena, 3 palavras):** "Longe no Natal?"
- **Foco visual único:** close real da carta, em tela cheia, com a frase do recado destacada por um traço de marca-texto dourado. É o oposto de C07 (persona + kit inteiro em mockup).

### Paleta
Papel creme da própria carta ocupando o quadro; vinheta escura `#071C26` a 55% nas bordas para dar o clima de noite; destaque do recado: faixa `#EDC994` a 45% atrás da linha vermelha original (`#A3302A`); título em branco `#FFFFFF` sobre a vinheta (ou `#14222B` sobre o papel no 1:1); pílula de preço `#14222B` com texto `#EDC994`.

### Composição
**1:1 (1080x1080)**
- Fundo: carta real ampliada ~1,6x, cortada para mostrar "Olá, Sofia!" no topo e a linha do recado no terço inferior, inclinada −3°.
- "Longe no Natal?" (Inter Medium 34 px, `#A3302A`) y = 64; título (Inter ExtraBold 70 px, `#14222B`) y = 110–260 numa faixa creme opaca para não brigar com a letra cursiva.
- Linha do recado destacada, centrada em y ≈ 640; seta curta à mão (traço dourado) apontando para ela.
- Pílula "R$ 9,90 · PDF para imprimir" y = 900–970; rodapé y = 1030.

**4:5 (1080x1350)**
- Carta em tela cheia; vinheta escura no topo (y 0–330) com "Longe no Natal?" (`#EDC994`) y = 90 e título branco 84 px y = 140–320.
- Linha do recado destacada na zona de leitura, y ≈ 720; lacre vermelho da carta visível no canto inferior direito.
- Faixa inferior escura (y 1150–1350): apoio "Envie o PDF para a família imprimir" (34 px), pílula de preço y = 1210, rodapé y = 1305.

**9:16 (1080x1920)**
- Carta em tela cheia na vertical (a carta é A4 retrato e ocupa a altura de forma natural).
- Vinheta do título y = 270–560: "Longe no Natal?" y = 290, título branco 92 px y = 340–540.
- Linha do recado destacada em y ≈ 960 (centro da área segura).
- Apoio e pílula de preço y = 1100–1240.
- y > 1250: assinatura "Papai Noel" e lacre da carta (sem informação essencial) e rodapé fixo.

### Assets
- **Reais (já existem):** `scratchpad/carta.jpg` serve de referência de layout, mas o recado dela é "Te amamos muito, filha!" (voz de pais).
- **A produzir aqui:** gerar **uma carta nova pelo site** (gerador local `js/kit-magico.js`, mesmo fluxo usado para `Prova-Magica-Sofia.pdf`) com nome "Sofia" e recado fictício na voz da avó, curto para caber em 1–2 linhas, por exemplo: **"A vovó está com saudade e muito orgulhosa de você!"**. Renderizar a página em alta resolução (pdftoppm, 300 dpi) para o close não perder nitidez.
- **Camada emocional opcional:** mãos de uma senhora segurando a carta impressa. Não existe foto real; as opções são fotografar (mãos de uma pessoa da família, com autorização) ou o prompt abaixo (IA, marcado).

### Prompt de imagem (opcional; para a variante "com mãos")
> Fotografia realista em close de mãos de uma senhora idosa, com anel simples e pele com marcas da idade, segurando com cuidado uma folha A4 de papel creme com moldura natalina vermelha e dourada; sala aconchegante à noite, luzes de Natal desfocadas em dourado ao fundo; a folha aparece em leve ângulo e **sem texto legível** (a carta real será aplicada por cima na edição); sem rosto, sem logotipos, sem letras; tons quentes; proporção 4:5.

Na variante com mãos, a carta real é aplicada por cima em perspectiva (ImageMagick `-distort Perspective`), a peça leva "Imagem ilustrativa" e é marcada como IA na Meta. A variante padrão (só o close da carta real) dispensa IA.

### Legenda do anúncio
> Vai passar o Natal longe dos netos? O seu recado pode chegar dentro da carta do Papai Noel. 🎄
> Você escreve o nome da criança, uma boa ação dela e o seu recado. Ele sai impresso na carta: "Um recado de quem ama você".
> Depois é só baixar o PDF e mandar para a família imprimir. Junto vêm o certificado com código mágico, os bilhetes da rena e o livrinho de 29 páginas.
> Kit digital em PDF para imprimir, R$ 9,90. Nada físico é enviado.

- **Título (campo da Meta):** "Seu recado na carta do Papai Noel"
- **CTA:** botão **Saiba mais**; frase final: "Clique em Saiba Mais e escreva o seu recado."
- **Hipótese de teste:** para avós e padrinhos, ver a **própria frase** impressa na carta (benefício concreto) converte melhor do que o chamado de persona de C07 ("Para avós que moram longe"). Teste direto C07 × L2-04 no mesmo público 50+, mesmo orçamento; métrica inicial CTR de link e CPC.
- **Produzível aqui sem custo?** **Sim** na versão padrão (carta real gerada localmente + Pillow/ImageMagick). A variante com mãos depende de foto real ou de uma ferramenta de IA externa (não usada nesta etapa).
- **Pendência antes de publicar:** testar de verdade baixar o PDF no celular e enviar pelo WhatsApp (Android e iPhone), porque a legenda diz "mandar para a família imprimir" e o site informa que o download fica "neste mesmo navegador".

---

## 6. Resumo das 9 peças

| Arquivo | Formato | Conceito | Gancho | Assets principais | Produzível aqui |
|---|---|---|---|---|---|
| PMPN_L2-05_pista-rena_1x1.png | 1080x1080 | L2-05 | A rena deixou uma pista | bilhete real, certificado real, `lista-hd.png`, pegadas vetoriais | Sim |
| PMPN_L2-05_pista-rena_4x5.png | 1080x1350 | L2-05 | A rena deixou uma pista | idem | Sim |
| PMPN_L2-05_pista-rena_9x16.png | 1080x1920 | L2-05 | A rena deixou uma pista | idem | Sim |
| PMPN_L2-02_tres-passos_1x1.png | 1080x1080 | L2-02 | Você só preenche e imprime | prints novos do formulário e de `obrigado.html`, carta real | Sim |
| PMPN_L2-02_tres-passos_4x5.png | 1080x1350 | L2-02 | Você só preenche e imprime | idem | Sim |
| PMPN_L2-02_tres-passos_9x16.png | 1080x1920 | L2-02 | Você só preenche e imprime | idem | Sim |
| PMPN_L2-04_recado-carta_1x1.png | 1080x1080 | L2-04 | Seu recado vai dentro da carta | carta nova gerada com recado da avó | Sim (variante com mãos: não) |
| PMPN_L2-04_recado-carta_4x5.png | 1080x1350 | L2-04 | Seu recado vai dentro da carta | idem | Sim (variante com mãos: não) |
| PMPN_L2-04_recado-carta_9x16.png | 1080x1920 | L2-04 | Seu recado vai dentro da carta | idem | Sim (variante com mãos: não) |

## 7. Checklist para a etapa de produção (quando aprovada)
1. Servir o site localmente e capturar com Playwright: formulário preenchido e `obrigado.html` atual (não reaproveitar `ob.png`).
2. Gerar a carta com o recado da avó pelo gerador do site e renderizar em 300 dpi.
3. Montar as 9 peças em Pillow/ImageMagick com Inter; conferir ortografia, preço "R$ 9,90" e rodapé em cada uma.
4. Conferir o 9:16 com a sobreposição da interface do Reels (nada essencial fora de y 270–1250) e todas as peças reduzidas para 360 px de largura.
5. Atualizar o status no manifesto de `planejado` para `gerado - revisar no celular` só depois de validar que os arquivos existem.
