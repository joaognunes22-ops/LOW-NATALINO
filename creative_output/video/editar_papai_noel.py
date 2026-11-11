"""Edição final dos vídeos do Papai Noel (lip sync do Hedra) para Meta Ads.

Uso:
  python3 editar_papai_noel.py <ID> <video_hedra.mp4> [--pasta PAPAI_NOEL_META_ADS] [--saida DIR]

Exemplo:
  python3 editar_papai_noel.py 003 ~/Downloads/PAPAI_NOEL_AD_003.mp4

O que faz:
  - enquadra o vídeo em 1080x1920 (9:16), 30 fps;
  - usa SEMPRE o áudio original (AUDIOS_ORIGINAIS/PAPAI_NOEL_AD_<ID>.mp3) e confere a duração;
  - legendas brancas com palavras-chave em dourado (tempos da transcrição em LEGENDAS/<ID>.words.json);
  - inserções reais do kit (carta, certificado, Livro no celular) quando a fala cita cada item,
    na faixa abaixo da boca, sem cobrir o rosto;
  - selo "R$ 9,90 · PDF para imprimir" quando o preço é falado e "Saiba mais" no CTA;
  - exporta versão com legenda e sem legenda, H.264/AAC.
"""
import argparse, json, os, re, subprocess, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
INS = os.path.join(AQUI, 'insercoes')
W, H, FPS = 1080, 1920, 30
FACE_BAND = (900, 1440)    # faixa (y) das inserções: abaixo da boca, acima das legendas
KEY = {'papai', 'noel', 'carta', 'certificado', 'código', 'mágico', 'mágica', 'prova', 'bonzinhos', 'lista', 'nome',
       '9,90', 'r$', 'natal', 'magia', 'surpresa', 'saiba', 'mais', 'personalizada', 'imprimir', 'polo', 'norte'}
# gatilhos de inserção: (regex na palavra, arquivo, duração máx em s)
TRIGGERS = [(r'^carta', 'INS_carta.png', 2.6), (r'^(certificado|código)', 'INS_certificado.png', 2.6),
            (r'^(escanear|confere|conferir|lista|bonzinhos)', 'INS_livro_celular.png', 3.0)]

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: sys.exit(r.stderr[-2000:])
    return r.stdout

def dur(p): return float(run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p]))

def ts(t): return f'{int(t // 3600)}:{int(t % 3600 // 60):02d}:{t % 60:05.2f}'

def juntar_preco(words):
    """a transcrição separa o preço em 'R', '$', '9', ',90' — junta em 'R$ 9,90'."""
    out, i = [], 0
    while i < len(words):
        w = words[i]
        if w[2] == 'R' and i + 3 < len(words) and words[i + 1][2] == '$' and words[i + 2][2].isdigit() and words[i + 3][2].startswith(','):
            out.append([w[0], words[i + 3][1], 'R$ ' + words[i + 2][2] + words[i + 3][2]]); i += 4; continue
        out.append(w); i += 1
    return out

def legendas(words, total, path):
    fix = {'r$': 'R$'}
    blocks, cur = [], []
    for i, w in enumerate(words):
        cur.append(w); txt = ' '.join(x[2] for x in cur); nxt = words[i + 1] if i + 1 < len(words) else None
        if re.search(r'[.!?]$', w[2]) or nxt is None or nxt[0] - w[1] > .32 or len(txt) + 1 + len(nxt[2]) > 24 or (re.search(r'[,;:]$', w[2]) and len(txt) >= 12):
            blocks.append(cur); cur = []
    out = ["[Script Info]", "ScriptType: v4.00+", f"PlayResX: {W}", f"PlayResY: {H}", "WrapStyle: 2", "ScaledBorderAndShadow: yes", "",
           "[V4+ Styles]",
           "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
           "Style: Sub,Inter ExtraBold,78,&H00FFFFFF,&H00FFFFFF,&H00000000,&H96000000,-1,0,0,0,100,100,0,0,1,6,3,2,70,70,360,1", "",
           "[Events]", "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"]
    for k, c in enumerate(blocks):
        s, e = c[0][0], c[-1][1]
        e = min(blocks[k + 1][0][0], e + .25) if k + 1 < len(blocks) else min(total, e + .5)
        toks = []
        for w in c:
            t = fix.get(w[2].lower(), w[2]).replace('{', '').replace('}', '')
            core = re.sub(r'[^\wÀ-ÿ$,]', '', t).lower().strip(',')
            if t.startswith('R$'): core = '9,90'
            toks.append('{\\c&H94C9ED&}' + t + '{\\c&HFFFFFF&}' if core in KEY else t)
        plain = [w[2] for w in c]
        if len(' '.join(plain)) > 14 and len(c) > 1:
            b = min(range(1, len(c)), key=lambda j: abs(len(' '.join(plain[:j])) - len(' '.join(plain[j:]))))
            text = ' '.join(toks[:b]) + '\\N' + ' '.join(toks[b:])
        else: text = ' '.join(toks)
        out.append(f"Dialogue: 0,{ts(s)},{ts(e)},Sub,,0,0,0,,{{\\fad(60,0)\\fscx92\\fscy92\\t(0,90,\\fscx100\\fscy100)}}{text}")
    open(path, 'w', encoding='utf-8').write('\n'.join(out) + '\n')
    return len(blocks)

def plano_insercoes(words, total):
    """cada peça aparece uma vez, na primeira vez em que a fala a cita; fica até a próxima peça (máx. d s)."""
    first = {}
    for w in words:
        for rx, f, d in TRIGGERS:
            if f not in first and re.search(rx, w[2].lower()): first[f] = (w[0], d)
    starts = sorted((t, f, d) for f, (t, d) in first.items())
    ev = []
    for j, (t0, f, d) in enumerate(starts):
        nxt = starts[j + 1][0] - .1 if j + 1 < len(starts) else total - 2.0
        t1 = min(t0 + d, nxt, total - 2.0)
        if t1 - t0 >= 1.0: ev.append((t0, t1, f))
    preco = next((w[0] for w in words if '9,90' in w[2]), None)
    cta = next((w[0] for w in reversed(words) if w[2].lower().startswith('clique')), None)
    return ev, preco, cta

def main():
    ap = argparse.ArgumentParser(); ap.add_argument('id'); ap.add_argument('video')
    ap.add_argument('--pasta', default=os.path.expanduser('~/PAPAI_NOEL_META_ADS')); ap.add_argument('--saida', default=AQUI)
    a = ap.parse_args(); ID = a.id.zfill(3); P = a.pasta
    audio = f'{P}/AUDIOS_ORIGINAIS/PAPAI_NOEL_AD_{ID}.mp3'; words = juntar_preco(json.load(open(f'{P}/LEGENDAS/PAPAI_NOEL_AD_{ID}.words.json')))
    da, dv = dur(audio), dur(a.video); total = round(da + .4, 2)
    if abs(dv - da) > 1.0: print(f'ATENÇÃO: vídeo {dv:.2f}s x áudio {da:.2f}s — confira se o Hedra usou o áudio certo.')
    os.makedirs(a.saida, exist_ok=True)
    ass = f'{a.saida}/PAPAI_NOEL_AD_{ID}.ass'; nleg = legendas(words, total, ass)
    ev, preco, cta = plano_insercoes(words, total)
    # entradas: 0 vídeo, 1 áudio, 2.. inserções
    inputs = ['-i', a.video, '-i', audio]; fc = []
    base = (f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,crop={W}:{H},fps={FPS},"
            f"tpad=stop_mode=clone:stop_duration=2,trim=duration={total},setpts=PTS-STARTPTS,eq=contrast=1.04:saturation=1.06,setsar=1[v0]")
    fc.append(base); last, k = 'v0', 2
    def overlay(png, t0, t1, y_center, maxh):
        nonlocal last, k
        inputs.extend(['-loop', '1', '-t', f'{total}', '-i', f'{INS}/{png}'])
        fc.append(f"[{k}:v]scale=-1:{maxh},format=rgba,fade=t=in:st={t0:.2f}:d=0.25:alpha=1,fade=t=out:st={t1 - .25:.2f}:d=0.25:alpha=1[i{k}]")
        fc.append(f"[{last}][i{k}]overlay=x=(W-w)/2:y={y_center}-h/2:enable='between(t,{t0:.2f},{t1:.2f})'[v{k}]")
        last = f'v{k}'; k += 1
    for t0, t1, png in ev: overlay(png, t0, t1, sum(FACE_BAND) // 2, FACE_BAND[1] - FACE_BAND[0])
    if preco is not None: overlay('INS_preco.png', preco, min(preco + 3.0, total), 330, 130)
    if cta is not None: overlay('INS_cta_saiba_mais.png', cta, total, 330, 140)
    fc.append(f"[1:a]aresample=48000,apad=whole_dur={total},atrim=duration={total},alimiter=limit=0.8[a]")
    sem = f'{a.saida}/PAPAI_NOEL_AD_{ID}_sem_legenda.mp4'; com = f'{a.saida}/PAPAI_NOEL_AD_{ID}.mp4'
    enc = ['-c:v', 'libx264', '-profile:v', 'high', '-crf', '19', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-r', str(FPS),
           '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', '-t', str(total)]
    run(['ffmpeg', '-v', 'error', '-y', *inputs, '-filter_complex', ';'.join(fc), '-map', f'[{last}]', '-map', '[a]', *enc, sem])
    run(['ffmpeg', '-v', 'error', '-y', '-i', sem, '-vf', f"ass={ass}", '-c:a', 'copy', *[x for x in enc if x not in ('-c:a', 'aac', '-b:a', '192k', '-ar', '48000')], com])
    print(f'OK {com}\n   {sem}\n   duração {total}s | legendas {nleg} | inserções {[(round(a,1), f) for a, _, f in ev]} | preço {preco} | CTA {cta}')

if __name__ == '__main__': main()
