# Storyboard — vídeos do Papai Noel (8 áudios → 8 vídeos)

Base: vídeo com lip sync gerado a partir de `PAPAI_NOEL_AD_xxx.mp3` + foto de referência (mesma foto em todos).
Status: **aguardando os vídeos do Hedra**. Nenhum vídeo com lip sync foi gerado aqui (o gerador local foi bloqueado pela política de segurança da sessão).

## Regras de edição (todas as peças)
- 1080×1920, H.264/AAC, 30 fps; voz original sem cortes nem aceleração.
- Papai Noel do peito para cima ocupando a tela inteira; nenhuma inserção cobre rosto ou boca.
- Inserções do produto entram como cartão na faixa inferior (abaixo da barba), com 1,5–3 s, só quando a fala cita o item.
- Legendas brancas, palavras-chave em dourado, máx. 2 linhas, acima da área segura de Reels/Stories.
- Selo "R$ 9,90" junto da fala do preço; cartão "Saiba Mais" no CTA final.
- Gerar também versão sem legenda.
- Sem música até haver faixa natalina licenciada.
- Marcar o anúncio como conteúdo feito com IA na Meta.

## Mapa de inserções por áudio (tempos da transcrição)
| Vídeo | Inserção 1 | Inserção 2 | Preço | CTA |
|---|---|---|---|---|
| AD_001 | Carta (13,4–15,8 s "carta personalizada") | Certificado → tela do Livro (15,8–22,6 s) | 23,0 s | 29,4 s |
| AD_002 | Carta (11,1–15,3 s) | Certificado → Livro (16,0–20,9 s) | 21,3 s | 28,6 s |
| AD_003 | Tela do Livro (7,0–11,3 s) | — | 11,8 s | 13,5 s |
| AD_004 | Carta (4,1–7,2 s) | Tela do Livro (7,2–11,2 s) | 11,6 s | 13,8 s |
| AD_005 | Tela do Livro (7,3–12,1 s) | — | 12,1 s | 14,2 s |
| AD_006 | Carta impressa (8,7–12,2 s) | — | 12,8 s | 14,4 s |
| AD_007 | Carta (18,5–21 s) | Certificado → Livro (21–26,6 s) | 27,1 s | 29,2 s |
| AD_008 | Carta + certificado (16,6–20,8 s) | Tela do Livro (20,8–25,6 s) | 25,6 s | 30,4 s |

Materiais: carta, certificado e livrinho reais gerados pelo site; tela real de `lista.html` (nada simulado além do que a página mostra).

## Validação de cada vídeo final
Duração = áudio + ≤0,5 s; 1080×1920; sem quadro preto; pico de áudio ≤ -1 dBFS; legenda revisada; inspeção de frames (boca, barba, olhos). Resultado registrado em `manifesto_videos.csv`.
