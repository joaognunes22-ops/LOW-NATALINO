# Vídeos — materiais prontos

## broll/ (9:16, 1080x1920, sem áudio, peças reais do kit com nome fictício "Sofia")
| Arquivo | Duração | Conteúdo |
|---|---|---|
| BROLL_livro_qr_tela_real_9x16.mp4 | 8,2 s | Gravação real de `lista.html` aberta pelo mesmo link do QR do certificado: busca do nome → "Confirmado" |
| BROLL_carta_9x16.mp4 | 4 s | Carta do Papai Noel, zoom até "Olá, Sofia!" e a boa ação |
| BROLL_certificado_qr_9x16.mp4 | 4 s | Certificado, zoom até o nome e o código mágico |
| BROLL_bilhete_rena_9x16.mp4 | 3 s | Bilhete da Rena Faísca |
| BROLL_livrinho_paginas_9x16.mp4 | 5,4 s | Capa, carteirinha de elfo, caça-palavras e labirinto do livrinho |
| BROLL_tres_passos_site_9x16.mp4 | 4,9 s | Formulário preenchido → página de download → carta |

A gravação do Livro é tela real do site; não simula a câmera lendo o QR. Para mostrar a leitura do QR, use filmagem real do celular.

## insercoes/ (PNG transparente para sobrepor ao vídeo do Papai Noel)
INS_carta, INS_certificado, INS_bilhete_rena, INS_livro_celular, INS_livrinho_capa, INS_preco ("R$ 9,90 · PDF para imprimir"), INS_cta_saiba_mais.

## editar_papai_noel.py
Transforma o vídeo de lip sync do Hedra no anúncio final:
`python3 editar_papai_noel.py <ID> <video_hedra.mp4> --pasta <PAPAI_NOEL_META_ADS> --saida <dir>`
- 1080x1920, 30 fps, H.264/AAC; usa sempre o áudio original e avisa se a duração do vídeo não bater.
- Legendas brancas com palavras-chave em dourado (tempos da transcrição); preço juntado como "R$ 9,90".
- Carta, certificado e Livro entram na faixa abaixo da boca, uma vez cada, quando a fala cita o item.
- Selo de preço e "Saiba mais" no topo, nos momentos da fala.
- Gera também a versão sem legenda.

Testado nos 8 áudios com um vídeo provisório (foto parada, sem lip sync): sem erros, sem quadro preto, duração = áudio + 0,4 s. O teste não é um anúncio e não foi publicado.
