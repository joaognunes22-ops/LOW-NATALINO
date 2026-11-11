# Plano de produção — vídeos do Lote 2 (Prova Mágica do Polo Norte)

Status: **somente planejamento.** Nenhum vídeo foi gerado, renderizado ou enviado a serviço externo nesta etapa. Nenhum crédito pago foi usado.
Entrada: `creative_output/strategy/04_lote2_cinco_conceitos.md` (handoff para video-performance), `01_briefing_prova_magica.md`, `creative_output/video/storyboard_papai_noel.md`, `creative_output/video/manifesto_videos.csv`.
Data do plano: 11/11/2026.

Todas as durações abaixo são **estimativas**. A duração final de cada vídeo é definida pelo áudio real (narração do ElevenLabs ou áudio existente), medido com `ffprobe`; o texto na tela é ajustado aos tempos de palavra transcritos (faster-whisper), nunca o contrário. Nenhum áudio será cortado, trocado ou acelerado sem autorização.

---

## 1. Inventário e validação de ferramentas

Reconferido neste ambiente em 11/11/2026, só com comandos de versão (nada instalado, nada executado contra serviços).

### 1.1 Disponível aqui

| Ferramenta | Versão / estado conferido | Uso no lote 2 |
|---|---|---|
| ffmpeg | 6.1.1 (Ubuntu); filtros `ass`, `subtitles` (libass) e `drawtext`; encoders `libx264` e `aac` | Montagem, legendas queimadas, export H.264/AAC, `blackdetect`, `volumedetect`/`ebur128`, recortes 9:16 ↔ 4:5 |
| ffprobe | junto do ffmpeg | Medir duração, resolução, codec, fps, canais |
| Pillow | 12.3.0 | Cartões (selo de preço, "Saiba Mais", títulos de capítulo), PNG com emoji para sobrepor |
| ImageMagick | 6.9.12-98 (`convert`, `montage`, `identify`) | Folha de contato de frames para inspeção visual |
| pdftoppm | 24.02.0 | Rasterizar páginas reais dos PDFs do kit em alta resolução |
| Node | 22.23.4 | Scripts de captura |
| Playwright + Chromium | 1.63.0 (`require('playwright')` ok) | **Gravação de tela real** de `lista.html` servida localmente (`recordVideo`), com viewport de celular; também prints reais do formulário `index.html#personalizar` |
| faster-whisper | 1.2.1; modelos `small` e `medium` em cache local | Transcrição com tempo por palavra das narrações novas; conferência final da fala no vídeo |
| Fontes | Inter / Inter Display (OTF); Noto Color Emoji | Legendas e textos. Emoji colorido via libass não é confiável: emojis (🔍, 🦌, ✓) serão desenhados em PNG com Pillow e sobrepostos, ou trocados por texto |
| Hardware | 4 CPUs, **sem GPU** | Render x264 de 20–25 s em 1080×1920 é viável na CPU (estimativa: 1–3 min por versão, a medir) |

Materiais reais já existentes (fora do repositório, no scratchpad da sessão `/tmp/claude-0/-home-user-LOW-NATALINO/67fe8c12-a09f-5d53-ba98-8eb871797e64/scratchpad/`):

| Material | Arquivo | Observação |
|---|---|---|
| Kit real gerado pelo site (nome fictício "Sofia") | `Prova-Magica-Sofia.pdf` (5 páginas A4), `kit.pdf` | Carta, certificado com QR, bilhetes da rena — rasterizar com `pdftoppm` |
| Livrinho real | `Livrinho-Magico-Sofia.pdf` (29 páginas) | Inclui a página das 7 missões de bondade e o guia dos pais |
| Capturas já feitas | `static_assets/lista-hd.png`, `prova-1.png`, `prova-2.png`, `liv-*.png`; `lista-mob.png`, `obrigado.png`, `ob*.png` | Prints reais; servem de referência, mas os vídeos devem usar gravação nova |
| Script de captura de `lista.html` | `shot_lista.js` | `lista.html` recebe os dados em base64 no hash (`#{n,d,r,y}`) — permite gravar a tela com nome e boa ação fictícios |
| 8 áudios do Papai Noel + transcrições + tempos por palavra | `PAPAI_NOEL_META_ADS/AUDIOS_ORIGINAIS/`, `RELATORIO_DE_PRODUCAO/*_transcricao.txt`, `LEGENDAS/*.words.json` | Voz sintética (ElevenLabs), mono 44,1 kHz |
| Foto de referência do Papai Noel | `PAPAI_NOEL_META_ADS/REFERENCIAS/papai_noel_referencia.jpg` | 941×1672 (menor que 1080×1920: o vídeo do Hedra precisa sair em ≥1080 p de largura ou haverá ampliação) |

No repositório: mockups em `images/` (`mockup-escaneando-qr.webp`, `mockup-kit-completo.webp`, `mockup-celular-livro.webp`, `mockup-prova-magica.webp`, `mockup-caderno-colorir.webp`) — **são ilustrações de IA**, só podem entrar como apoio rotulado, nunca como "foto do produto" ou como prova da leitura do QR. Fundos reais do kit: `images/carta-fundo.webp`, `certificado-fundo.webp`, `bilhete-rena-fundo.webp`, `lista-fundo.webp`, `images/livrinho/*`.

### 1.2 Indisponível aqui

| Item | Situação |
|---|---|
| Lip sync / avatar falante | **Não disponível.** O SadTalker instalado teve a execução bloqueada pela política da sessão; não será usado. |
| Geração de voz (TTS) | Não há. Narração nova é feita pelo usuário no ElevenLabs. |
| Geração de vídeo por IA (OmniHuman, Kling, Veo etc.) | Sem chaves de API (fal.ai, Hedra, ElevenLabs, OpenAI não configuradas). Nada será chamado. |
| Câmera / celular físico | Não há: a **leitura do QR pela câmera** e as **fotos do kit impresso** não podem ser feitas aqui. |
| Impressora | Não há. |
| Música licenciada | Nenhuma faixa. Todos os vídeos saem **só com voz**. |
| GPU | Não há (não é necessária para a edição). |

### 1.3 Depende do usuário

| Item | Para quais vídeos |
|---|---|
| Vídeos de lip sync do Papai Noel gerados no Hedra (site) a partir de AD_004 e AD_006 — os mesmos já previstos no lote 1 | L2-01B, L2-02A |
| Narrações novas no ElevenLabs (site), 4–5 roteiros, vozes indicadas em cada vídeo | L2-01A, L2-02B, L2-03, L2-04, L2-05 |
| Filmagem com celular real: câmera lendo o QR do certificado impresso e abrindo o Livro | L2-01A/B, L2-05 |
| Fotos/vídeos curtos do kit **impresso de verdade** (mãos, sem rosto de criança) | todos |
| Gravação real do fluxo de compra até a página de obrigado (ou autorização para gravar aqui em ambiente de teste, sem pagamento real) e teste de compartilhar o PDF pelo WhatsApp | L2-02, L2-04 |
| Decisões: aprovar roteiros finais, escolher vozes, autorizar (ou não) uso de AD_008, autorizar serviço pago caso queira lip sync fora do Hedra | todos |

---

## 2. Regras comuns a todos os vídeos do lote 2

- **Formatos:** master 9:16 **1080×1920**; quando o conceito pede feed, versão 4:5 **1080×1350**. MP4 H.264 (yuv420p, 30 fps), AAC 48 kHz; `+faststart`. Sempre também **versão sem legenda**.
- **Áudio:** voz original sem cortes, sem aceleração; o vídeo termina em até 0,5 s após o fim da fala. Sem música (sem licença). Verificar pico ≤ −1 dBFS; qualquer ganho/limitador só com aviso no relatório.
- **Legendas queimadas** (libass, Inter Bold, branco com contorno escuro, palavras-chave em dourado `#E8B84A`), no máximo 2 linhas, ≤ 32 caracteres por linha, sincronizadas pelos tempos de palavra do faster-whisper e **revisadas à mão** (ex.: "R$ 9,90" e não "nove e noventa").
- **Área segura 9:16:** nada essencial nos 250 px do topo nem nos ~420 px de baixo (interface do Reels/Stories). Legenda entre y ≈ 1180 e 1420; **rodapé fixo "Kit digital em PDF para imprimir"** em todas as peças, faixa discreta em y ≈ 1440–1490, sempre visível. Em 4:5, legenda no terço inferior e rodapé a 60 px da borda.
- **Inserções:** só materiais reais gerados pelo site (carta, certificado, bilhetes, livrinho, tela do Livro, formulário, página de obrigado). Mockups de IA só como fundo/apoio e nunca no lugar de prova.
- **Leitura do QR:** a tela do Livro é **gravada de verdade** (`lista.html` real); a etapa "câmera apontando para o QR" só entra se filmada pelo usuário com celular real. Proibido simular a leitura com mockup.
- **Conteúdo:** falar com o adulto; sem depoimento, avaliação, números de venda, escassez ou prazo; não sugerir vídeo/ligação/entrega física do Papai Noel; não prometer prazo da versão com foto; não citar o add-on "Caça ao Tesouro"; nenhuma foto de criança real sem autorização escrita.
- **IA / rotulagem na Meta:** marcar como "feito com IA" toda peça que tenha (a) Papai Noel com lip sync ou (b) voz sintética realista (ElevenLabs) — ou seja, **todas as peças deste lote que usam narração do ElevenLabs**, por prudência. Mockups de IA visíveis também exigem o rótulo. No relatório de cada vídeo, listar o que é real e o que é IA.
- **Nomenclatura:** `creative_output/video/L2-0X[A|B]_<tema>_<9x16|4x5>[_sem_legenda].mp4`; legendas `.ass` e transcrições ao lado em `creative_output/video/lote2/`.

---

## 3. Plano por vídeo

### L2-01A — "Aos 8 anos, eles investigam" (prova verificável) · prioridade ALTA

| Campo | Plano |
|---|---|
| Duração-alvo | ~20 s (≈42 palavras; medir no áudio real) |
| Formato | 9:16 1080×1920 (master) + 4:5 1080×1350 (feed) + versões sem legenda |
| Voz | **Narração nova** no ElevenLabs, voz adulta em off, **masculina** (o conceito pede incluir o pai), tom calmo e cúmplice. Não é a voz do Papai Noel. |
| Roteiro | O da seção 2 de `04_lote2_cinco_conceitos.md` (sem alteração) |

Storyboard (tempos estimados; reajustar aos tempos reais da fala):

| Tempo | Fala | Imagem | Texto na tela |
|---|---|---|---|
| 0,0–3,0 | "Com sete, oito anos, eles começam a investigar." | Mão de adulto (pai) segurando o certificado impresso, luz quente; leve zoom digital (Ken Burns) se for foto | "Aos 8 anos, eles investigam" + 🔍 (PNG) |
| 3,0–6,0 | "Então deixe a prova pronta." | Close do QR e do número de registro no certificado impresso | — |
| 6,0–10,0 | "O certificado vem com um código mágico." | **Vídeo real do usuário:** celular apontando a câmera para o QR | "A prova está no certificado" |
| 10,0–16,0 | "Aponta o celular… e o Livro da Lista dos Bonzinhos mostra o nome, confirmado." | **Gravação de tela real** de `lista.html` (Playwright, viewport 390×844 @3x), animação de busca → nome "Sofia" → "Confirmado"; moldura de celular simples | "Nome confirmado ✓" (✓ em PNG) |
| 16,0–20,0 | "Kit digital para imprimir, nove e noventa." | Kit impresso sobre a mesa (foto real) | Selo "R$ 9,90 · PDF para imprimir"; cartão "Saiba Mais" no final |

| Campo | Plano |
|---|---|
| Assets existentes | PDF real `Prova-Magica-Sofia.pdf` (certificado com QR), `lista.html` local, fontes, `images/certificado-fundo.webp` |
| Assets a produzir aqui | Gravação de tela de `lista.html` (webm → mp4 1080 px), rasterização do certificado (pdftoppm 300 dpi), cartões PNG (selo, "Saiba Mais", rodapé, emojis), legendas `.ass`, montagem e export |
| Depende do usuário | Narração; **vídeo de 3–5 s do celular lendo o QR do certificado impresso** (sem rosto de criança); foto/vídeo do certificado impresso na mão de adulto e do kit na mesa |
| Fallback sem filmagem | Abrir com o certificado real rasterizado (PDF) em vez da foto impressa, e cortar direto para a gravação de tela; **sem** mostrar câmera simulada. Rotular a abertura como "exemplo do certificado" |
| Legendas | Queimadas, sincronizadas pelo faster-whisper (modelo `medium`), "R$ 9,90" escrito em algarismos |
| IA / rotulagem | Voz sintética → marcar "feito com IA" na Meta. Nenhum mockup de IA nesta peça |
| Validação | ffprobe 1080×1920 / 1080×1350, H.264/AAC, 30 fps; duração = áudio + ≤ 0,5 s; `blackdetect` sem quadro preto; pico ≤ −1 dBFS; transcrição do vídeo final = roteiro; folha de contato (1 frame/s) conferindo que a tela do Livro é a real e que o nome bate com o certificado mostrado; textos dentro da área segura |

### L2-01B — variante com AD_004 (Papai Noel) · prioridade MÉDIA (teste de dor diferente)

**Conferência da transcrição de AD_004 (15,4 s):**
`[0,0–2,7] disseram na escola que eu não existo?` · `[4,1–7,2] Imagine a surpresa ao receber minha carta` · `[7,2–11,2] e conferir o próprio nome pelo código mágico.` · `[11,6–13,2] Tudo por R$ 9,90.` · `[13,8–15,2] Clique em Saiba mais.`

**Veredito: serve, com ressalvas.**
- A parte central ("conferir o próprio nome pelo código mágico", 7,2–11,2 s) casa exatamente com a gravação de tela do QR → bom encaixe.
- Sem preço errado, prazo ou promessa indevida; preço R$ 9,90 correto.
- Ressalva 1: o gancho é **escola** (ângulo C03), não "eles investigam"; testa outra dor, como o estrategista já indicou.
- Ressalva 2: a primeira palavra transcrita começa em minúscula em 0,0 s ("disseram…"), o que sugere que o áudio pode começar cortado ou sem sujeito; **ouvir o início antes de usar**. Além disso, a frase em 1ª pessoa do Papai Noel ("…que eu não existo?") pode soar como fala direta à criança — se o usuário achar ambígua, não usar.
- Ressalva 3: são 15,4 s, não 20 s; o vídeo terá 15,4 s (sem cortar nem esticar o áudio).

| Campo | Plano |
|---|---|
| Duração | 15,4 s (áudio real, medido) |
| Formato | 9:16 + 4:5 + versões sem legenda |
| Voz | AD_004 existente (Papai Noel, ElevenLabs), sem alteração |
| Storyboard | 0,0–4,1: Papai Noel em lip sync (vídeo do Hedra, peito para cima, nada cobrindo a boca) · 4,1–7,2: Papai Noel + cartão inferior com a carta real · 7,2–11,2: tela cheia com a gravação real de `lista.html` (corte só na pausa entre "carta" e "e conferir", não sobre fonema) · 11,2–15,4: volta ao Papai Noel com selo "R$ 9,90" (11,6 s) e "Saiba Mais" (13,8 s) |
| Assets | Vídeo Hedra de AD_004 (o mesmo já previsto no lote 1 — **sem custo extra**), gravação de tela de L2-01A, carta real |
| Fallback sem Hedra | Voz em off sobre certificado + tela do Livro (sem rosto do Papai Noel). Mantém rótulo de IA pela voz |
| IA / rotulagem | Papai Noel com lip sync por IA + voz sintética → marcar como IA |
| Validação | Igual a L2-01A + inspeção de frames da boca/barba/olhos nos trechos de lip sync; corte de cena só em pausas (≥ 0,3 s) |

### L2-02A — "A carta do Noel vem pronta" com AD_006 · prioridade ALTA

**Conferência da transcrição de AD_006 (17,1 s):**
`[0,0–4,4] Na correria, momentos especiais acabam ficando para depois.` · `[5,0–8,4] Mas uma surpresa pode mudar o Natal.` · `[8,7–12,2] Minha carta personalizada vem pronta para imprimir.` · `[12,8–13,8] Só R$ 9,90.` · `[14,4–16,9] Clique em Saiba mais e surpreenda.`

**Veredito: serve.** A abertura descreve uma situação da época ("na correria…"), sem atribuir culpa ao espectador (não diz "você deixou para depois"). Não cita prazo, não promete entrega física. Limite: a fala menciona só a **carta pronta para imprimir**; os 3 passos (preencher → baixar na hora → imprimir) e o livrinho entram **apenas como texto na tela com prints reais**, sem número de minutos.

| Campo | Plano |
|---|---|
| Duração | 17,1 s (áudio real) |
| Formato | 9:16 + 4:5 + versões sem legenda |
| Voz | AD_006 existente, sem alteração |

| Tempo | Fala | Imagem | Texto na tela |
|---|---|---|---|
| 0,0–4,7 | "Na correria, momentos especiais…" | Papai Noel em lip sync (Hedra) | "Fim de ano voando?" |
| 4,7–8,6 | "Mas uma surpresa pode mudar o Natal." | Papai Noel; corte na pausa 8,4–8,7 | — |
| 8,6–10,4 | "Minha carta personalizada…" | Print real do formulário `index.html#personalizar` preenchido com nome fictício | "1. Preencha o nome" |
| 10,4–12,5 | "…vem pronta para imprimir." | Print real da página de obrigado com os botões "Baixar a Prova Mágica (PDF)" e "Baixar o Livrinho Mágico · 29 páginas" → carta real | "2. Baixe na hora" → "3. Imprima" |
| 12,5–17,1 | "Só R$ 9,90. Clique em Saiba mais…" | Volta ao Papai Noel (ou kit impresso real) | Selo "R$ 9,90 · kit digital"; "Saiba Mais" em 14,4 s |

| Campo | Plano |
|---|---|
| Assets existentes | Prints reais em scratchpad (`obrigado.png`, `ob*.png`), PDF real da carta |
| A produzir aqui | Nova captura limpa (Playwright) do formulário e da página de obrigado em viewport de celular, com dados fictícios e sem dados de pagamento; cartões; legendas; montagem |
| Depende do usuário | Vídeo Hedra de AD_006 (mesmo do lote 1); opcional: foto real da folha saindo da impressora |
| IA / rotulagem | Lip sync + voz sintética → marcar como IA |
| Validação | Igual a L2-01B; conferir que nenhum print mostra dado pessoal real, nem tempo/prazo ("em X minutos" proibido) |

### L2-02B — "A carta do Noel vem pronta" com narração nova · prioridade ALTA

| Campo | Plano |
|---|---|
| Duração-alvo | ~18 s (≈41 palavras; medir) |
| Formato | 9:16 + 4:5 + versões sem legenda |
| Voz | **Narração nova** no ElevenLabs, voz **feminina adulta** (30–40), ritmo leve, tom de alívio — roteiro B da estratégia |
| Storyboard | 0–3 s "Dezembro passa voando." — mesa com agenda/ notebook desfocado (foto real do usuário ou fundo `images/interior-natal.webp`, que é ilustração) · 3–9 s "você preenche o nome e a boa ação, paga e baixa na hora" — tela real do formulário → página de obrigado (gravação Playwright), passos 1-2 · 9–14 s "Carta do Papai Noel, certificado e livrinho de vinte e nove páginas" — páginas reais rasterizadas (carta, certificado, capa e 2 páginas do livrinho) em sequência rápida · 14–16 s "É só imprimir." — foto real da impressão (ou kit real) · 16–18 s "Nove e noventa." — selo + "Saiba Mais" |
| Assets | Os mesmos de L2-02A + páginas do `Livrinho-Magico-Sofia.pdf` |
| Depende do usuário | Narração; opcional foto da impressão. **"Paga" deve ser ilustrado sem mostrar checkout real com dados** — usar só a transição formulário → obrigado, ou um cartão "Pagamento único" |
| IA / rotulagem | Voz sintética → marcar como IA; se `interior-natal.webp` (ilustração de IA) aparecer, também |
| Validação | Igual a L2-01A |

### L2-03 (opcional) — "Gentileza de verdade, escrita na carta" · prioridade MÉDIA

| Campo | Plano |
|---|---|
| Duração-alvo | ~25 s (≈54 palavras; medir) |
| Formato | **4:5 1080×1350 master** + 9:16 + versões sem legenda |
| Voz | Narração nova, voz **feminina** calorosa (ou masculina, se L2-01A já usar masculina e quiserem variar) — **ou versão sem voz** (só texto + legenda), que pode ser feita 100 % aqui |
| Storyboard | 0–5 s "Este ano, a carta… coisa boa que seu filho fez de verdade" — carta real, close lento, marca-texto dourado animado sobre "uma notícia muito especial: você …" · 5–12 s "Você escreve a boa ação — ajudou a avó, dividiu o brinquedo —" — gravação real do campo "boa ação" sendo digitado (limite de 180 caracteres; exemplo curto e fictício) · 12–16 s "…e ela aparece na carta e no certificado" — certificado real com "porque [boa ação]" destacado · 16–21 s "No livrinho, sete missões de bondade…" — página real das missões (`Livrinho-Magico-Sofia.pdf`) · 21–25 s "Kit para imprimir, nove e noventa." — selo + "Saiba Mais" |
| Assets | PDFs reais (carta, certificado, livrinho). Atenção: o PDF de exemplo tem a boa ação "Sofia"/texto existente; se a frase de exemplo do roteiro for diferente, **gerar novo PDF pelo site local** com a mesma boa ação dita na narração (feito aqui, sem pagamento, pelo gerador local `js/kit-magico.js`, se o fluxo permitir; senão o usuário gera) |
| Aqui x usuário | Versão sem voz: 100 % aqui. Versão com voz: só falta a narração |
| IA / rotulagem | Se houver voz sintética → IA. Versão só texto, sem mockup de IA → sem rótulo |
| Validação | Igual a L2-01A; conferir que a boa ação na tela = a boa ação falada |

### L2-04 — "O recado da vó dentro da carta" · prioridade MÉDIA

| Campo | Plano |
|---|---|
| Duração-alvo | ~25 s (≈54 palavras; medir) |
| Formato | **4:5 1080×1350 master** + 9:16 + versões sem legenda |
| Voz | Narração nova, voz **feminina madura (55–65), calorosa**, em **terceira pessoa** (nunca "eu, avó, comprei" — não pode parecer depoimento) |
| Storyboard | 0–4 s "Tem avó que não vai estar perto na noite de Natal." — mão de pessoa mais velha com celular (vídeo real do usuário, sem rosto) ou fundo de oficina (`images/oficina-natal.webp`, ilustração de IA → rótulo) · 4–9 s "Mas o recado dela pode chegar dentro da carta do Papai Noel." — close da carta real com a linha "Um recado de quem ama você: “…”" destacada em dourado · 9–16 s "Você escreve o recado, coloca o nome do neto, baixa o PDF…" — gravação real do campo "Recado da família" (máx. 300 caracteres) e do botão de download · 16–20 s "…e manda para a família imprimir." — **somente** gravação real do envio do PDF pelo WhatsApp feita pelo usuário; sem ela, cartão de texto "Envie o PDF para a família" (sem simular tela do WhatsApp) · 20–25 s "Junto vêm o certificado… e o livrinho. Nove e noventa." — certificado + capa do livrinho reais, selo, "Saiba Mais" |
| Assets | Carta real **gerada com recado de exemplo** (o PDF atual mostra o recado padrão; gerar outro com "Vovó ama você!" ou similar, fictício) |
| Depende do usuário | Narração; **teste real de baixar o PDF no celular e compartilhar pelo WhatsApp (Android e iPhone)** — essencial, porque o site diz que o download fica "neste mesmo navegador"; se o compartilhamento não funcionar bem, a fala "manda para a família" precisa ser revista pelo estrategista antes do render |
| IA / rotulagem | Voz sintética → IA; se usar avó realista gerada por IA ou ilustrações de IA → IA. Preferência: só mãos reais |
| Validação | Igual a L2-01A + checagem de que nenhum texto sugere depoimento |

### L2-05 — "A rena deixou uma pista" (ritual da véspera) · prioridade MÉDIA-ALTA

| Campo | Plano |
|---|---|
| Duração-alvo | ~25 s (≈52 palavras; medir) |
| Formato | 9:16 master + 4:5 + versões sem legenda; estrutura em 3 "capítulos" |
| Voz | **Narração nova**, voz **masculina adulta** (30–45), tom brincalhão de quem conta uma aventura |

| Tempo | Fala | Imagem (POV do adulto, sala à noite, sem rosto de criança) | Texto na tela |
|---|---|---|---|
| 0–4 | "Que tal uma pequena aventura na noite de Natal?" | Árvore com luzes desfocadas, bilhete preso num galho (vídeo real) | — (cartão de capítulo entra em 4 s) |
| 4–10 | "Primeiro, o bilhete da Rena Faísca avisa: o Papai Noel escondeu uma prova mágica." | Mão pega o bilhete; insert do **bilhete real** rasterizado com a frase "ele escondeu uma prova mágica no seu certificado" destacada | "Pista 1: o bilhete da rena" + 🦌 (PNG) |
| 10–14 | "A criança encontra o certificado com o nome dela." | Envelope sendo aberto, certificado impresso real | "Pista 2: o certificado" |
| 14–21 | "Vocês escaneiam o código juntos… e o Livro da Lista dos Bonzinhos confirma." | Celular lendo o QR (vídeo real) → gravação de tela real de `lista.html` até "Confirmado" | "Pista 3: o código mágico" |
| 21–25 | "Kit digital para imprimir, nove e noventa." | Os três itens sobre a mesa | Selo "R$ 9,90 · PDF para imprimir"; "Saiba Mais" |

| Campo | Plano |
|---|---|
| Assets existentes | Bilhetes e certificado reais (PDF), gravação de tela de L2-01A (reaproveitada) |
| Depende do usuário | Narração; **filmagem POV** na sala com luzes de Natal (3 tomadas de 3–5 s: bilhete na árvore, envelope abrindo, celular lendo o QR) |
| Fallback sem filmagem | Versão "papel sobre fundo": bilhete, certificado e tela do Livro reais animados sobre `images/interior-natal.webp` (ilustração de IA → rótulo); perde a sensação de cena, então fica como variante de teste de menor prioridade |
| Restrições | Não citar nem mostrar o add-on "Caça ao Tesouro"; a "aventura" é montada pela família com os itens do kit (bilhete + certificado + código), conforme o passo a passo do site |
| IA / rotulagem | Voz sintética → IA |
| Validação | Igual a L2-01A; conferir que a frase do bilhete mostrada é a real do kit |

**Conferência de AD_008 (35,0 s) para a variante opcional de L2-05 — veredito: NÃO serve.**
Transcrição: "Imagine a criança esperando uma surpresa do Papai Noel / e o Natal passando sem aquele momento especial. / Às vezes, o que falta não é um presente caro, mas um detalhe mágico. / Com a prova mágica do Polo Norte, / ela recebe uma carta personalizada, certificado oficial / e um código mágico que mostra seu nome na lista dos bonzinhos. / Tudo por R$ 9,90 em arquivo digital para imprimir. / Clique em Saiba Mais e prepare uma surpresa que vai emocionar."
- Não fala da Rena Faísca, do bilhete nem da sequência de pistas — o mecanismo central de L2-05 não aparece.
- Abre com cenário negativo ("o Natal passando sem aquele momento especial"), oposto ao tom de diversão do conceito.
- Tem 35,0 s; chegar a ~25 s exigiria cortar trechos inteiros (ex.: remover 0,0–7,9 s ou 7,9–13,9 s), o que **o agente não faz sem autorização** e ainda assim não criaria a narrativa da rena.
- Recomendação: manter AD_008 no conceito C06 do lote 1 e usar **narração nova** em L2-05. Se o usuário quiser mesmo assim, a variante seria só o vídeo AD_008 do lote 1 com cartões "Pista 1/2/3" — não é um teste válido de L2-05.

---

## 4. Fila de produção priorizada

| Ordem | Item | Bloqueio | Pode começar já? |
|---|---|---|---|
| 1 | **Preparação de assets reais aqui** (comum a todos): rasterizar carta, certificado, bilhetes e páginas do livrinho; gravar `lista.html` (busca → "Confirmado") com nome fictício; capturar formulário e página de obrigado; gerar cartões (selo, "Saiba Mais", rodapé, capítulos, emojis) e modelo de legenda `.ass` | Nenhum (só aguarda o "pode produzir") | Sim, após autorização para sair do planejamento |
| 2 | **L2-02A** (AD_006 + prints) | Vídeo Hedra de AD_006 | Montagem de prints sim; final depois do Hedra |
| 3 | **L2-01A** (narração nova + QR) | Narração; vídeo do celular lendo o QR (ou fallback) | Animatic com áudio-guia sim |
| 4 | **L2-02B** (narração nova) | Narração | Animatic sim |
| 5 | **L2-05** (3 capítulos) | Narração; filmagem POV (ou fallback) | Animatic sim |
| 6 | **L2-01B** (AD_004) | Vídeo Hedra de AD_004; escuta do início do áudio | — |
| 7 | **L2-04** (recado da vó) | Narração; teste de compartilhar PDF pelo WhatsApp | — |
| 8 | **L2-03** (opcional) | Versão sem voz: nada. Com voz: narração | Versão sem voz sim |

Racional: L2-01, L2-02 e L2-05 formam a rodada 1 do plano de teste do estrategista; L2-02A sai primeiro porque o áudio já existe e o Hedra de AD_006 já está na fila do lote 1. Para cada vídeo: animatic → aprovação do usuário → render final 9:16 → 4:5 → versões sem legenda → validação → atualização do manifesto.

### Checklist do que o usuário precisa enviar

- [ ] **Hedra:** `PAPAI_NOEL_AD_004.mp4` e `PAPAI_NOEL_AD_006.mp4` (já pedidos para o lote 1), mesma foto de referência, ≥ 1080 px de largura, áudio original intacto, sem marca d'água.
- [ ] **ElevenLabs (MP3 ou WAV 44,1 kHz, um arquivo por roteiro, sem música):**
  - [ ] L2-01A — voz masculina adulta, calma
  - [ ] L2-02B — voz feminina adulta, leve
  - [ ] L2-04 — voz feminina madura, calorosa, 3ª pessoa
  - [ ] L2-05 — voz masculina adulta, brincalhona
  - [ ] L2-03 — opcional (ou aprovar versão só com texto)
  - Ler "R$ 9,90" como "nove e noventa"; mandar também o texto exato usado.
- [ ] **Filmagens com celular (vertical, 4K ou 1080p, 30 fps, sem rosto de criança, sem dados pessoais na tela):**
  - [ ] Câmera do celular lendo o QR do certificado **impresso** e abrindo o Livro (2–3 tomadas)
  - [ ] Mão de adulto segurando o certificado impresso; kit impresso sobre a mesa
  - [ ] POV na sala com luzes: bilhete na árvore, envelope abrindo (L2-05)
  - [ ] Opcional: folha saindo da impressora; mão de pessoa mais velha digitando no celular
- [ ] **Teste real** de baixar o PDF no celular e enviar pelo WhatsApp (Android e iPhone) — e a gravação de tela desse envio, se for usada em L2-04.
- [ ] **Decisões:** aprovar os roteiros finais; confirmar se AD_004 tem o início íntegro e se a pergunta em 1ª pessoa é aceitável; confirmar que AD_008 fica fora de L2-05; autorizar (ou não) serviço pago de lip sync alternativo.
- [ ] Opcional: faixa natalina **com licença comercial para anúncios** (documento da licença), se quiserem música.

---

## 5. Estimativa de custo

| Item | Custo |
|---|---|
| Tudo o que é feito aqui (captura de tela, rasterização, cartões, legendas, transcrição, montagem, export, validação) | **R$ 0** — ferramentas locais, sem API |
| Lip sync de AD_004 e AD_006 no Hedra | Sem custo adicional ao lote 1 (os mesmos vídeos servem aos dois lotes); consome créditos do plano do usuário no Hedra conforme o plano dele (não verificado aqui) |
| Narrações no ElevenLabs | ~4–5 roteiros de ~250–320 caracteres cada ≈ 1.300–1.600 caracteres; com 3 tentativas por roteiro ≈ 4.000–5.000 caracteres do plano do usuário (preço por caractere não verificado aqui) |

Serviço pago **opcional** (somente estimativa, nada contratado, nada será chamado sem autorização):

| Cenário | Segundos | Estimativa a ~US$ 0,16/s (OmniHuman via fal.ai, valor informado na página da fal.ai, **não verificado**) |
|---|---|---|
| Lip sync só dos áudios reaproveitados no lote 2 (AD_004 15,4 s + AD_006 17,1 s) | 32,5 s | ≈ US$ 5,20 |
| Lip sync dos 8 áudios do lote 1 (inclui os 2 acima) | 200,2 s | ≈ US$ 32,00 |
| Margem para refazer (×1,5) dos 8 áudios | ~300 s | ≈ US$ 48,00 |

Os vídeos novos do lote 2 (L2-01A, L2-02B, L2-03, L2-04, L2-05) **não exigem** geração de vídeo por IA: são montados com materiais reais + narração. Câmbio e impostos não incluídos.

---

## 6. Critério geral de validação (antes de marcar "pronto" no manifesto)

1. `ffprobe`: 1080×1920 (ou 1080×1350), H.264 yuv420p, 30 fps, AAC; duração = áudio + ≤ 0,5 s.
2. Áudio: hash/duração do áudio-fonte conferidos com o manifesto; nenhuma edição de tempo; pico ≤ −1 dBFS (`volumedetect`).
3. `blackdetect` e `freezedetect` sem ocorrências indevidas.
4. Transcrição do vídeo final (faster-whisper `medium`) comparada ao roteiro; legenda revisada palavra a palavra.
5. Folha de contato (`montage`, 1 frame/s) inspecionada: área segura, rodapé visível, legibilidade, tela do Livro real, nada de criança real, nada de dado pessoal; nos trechos de lip sync: boca, barba, olhos, sem corte sobre fonema.
6. Registro no `manifesto_videos.csv` (status, caminho, erro) e relatório com o que é real x IA. Nenhum vídeo é declarado perfeito automaticamente; falhas ficam registradas.
