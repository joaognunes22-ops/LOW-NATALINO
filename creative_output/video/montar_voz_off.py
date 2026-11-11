"""Anúncio em voz off: narração original + cenas (vídeo gerado sem fala sincronizada e b-roll real do kit).

Uso: python3 montar_voz_off.py <plano.json>
plano.json:
{ "id": "007", "pasta": ".../PAPAI_NOEL_META_ADS", "saida": "...",
  "cenas": [ {"src": "video.mp4", "ini": 30.1, "fim": 31.8, "dur": 2.9}, ... ],   # dur = tempo na timeline (câmera lenta se dur > fim-ini)
  "nome": "PAPAI_NOEL_AD_007_vozoff" }
A última cena é estendida (congela o último quadro) até o fim do áudio.
"""
import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from editar_papai_noel import juntar_preco, legendas, plano_insercoes, INS, W, H, FPS, dur, run

def main():
    cfg = json.load(open(sys.argv[1])); ID = cfg['id']; P = cfg['pasta']; out_dir = cfg['saida']; os.makedirs(out_dir, exist_ok=True)
    audio = f'{P}/AUDIOS_ORIGINAIS/PAPAI_NOEL_AD_{ID}.mp3'
    words = juntar_preco(json.load(open(f'{P}/LEGENDAS/PAPAI_NOEL_AD_{ID}.words.json')))
    total = round(dur(audio) + .4, 2)
    tmp = os.path.join(out_dir, f'_cenas_{ID}'); os.makedirs(tmp, exist_ok=True)
    parts, t = [], 0.0
    for i, c in enumerate(cfg['cenas']):
        src_d = c['fim'] - c['ini']; d = c.get('dur', src_d)
        if i == len(cfg['cenas']) - 1: d = max(d, total - t)
        speed = d / src_d
        vf = (f"setpts={speed:.4f}*(PTS-STARTPTS),"
              + ("minterpolate=fps=30:mi_mode=blend," if speed > 1.15 else "fps=30,")
              + f"scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,crop={W}:{H},"
              + "unsharp=5:5:0.6:5:5:0,eq=contrast=1.04:saturation=1.05,setsar=1,"
              + f"tpad=stop_mode=clone:stop_duration=5,trim=duration={d:.3f}")
        p = f'{tmp}/c{i:02d}.mp4'
        run(['ffmpeg', '-v', 'error', '-y', '-ss', str(c['ini']), '-t', f'{src_d:.3f}', '-i', c['src'], '-an', '-vf', vf,
             '-r', str(FPS), '-c:v', 'libx264', '-crf', '15', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', p])
        parts.append(p); t += d
    lst = f'{tmp}/lista.txt'; open(lst, 'w').write(''.join(f"file '{p}'\n" for p in parts))
    ass = f'{out_dir}/{cfg["nome"]}.ass'; nleg = legendas(words, total, ass)
    _, preco, cta = plano_insercoes(words, total)
    inputs = ['-f', 'concat', '-safe', '0', '-i', lst, '-i', audio]; fc = [f"[0:v]trim=duration={total},setpts=PTS-STARTPTS,fade=t=in:d=0.3,fade=t=out:st={total - .5:.2f}:d=0.5[v0]"]
    last, k = 'v0', 2
    for png, t0, t1, h in [('INS_preco.png', preco, min((preco or 0) + 3.0, (cta or total) - .1), 130), ('INS_cta_saiba_mais.png', cta, total, 140)]:
        if t0 is None: continue
        inputs += ['-loop', '1', '-t', str(total), '-i', f'{INS}/{png}']
        fc.append(f"[{k}:v]scale=-1:{h},format=rgba,fade=t=in:st={t0:.2f}:d=0.25:alpha=1[i{k}]")
        fc.append(f"[{last}][i{k}]overlay=x=(W-w)/2:y=330-h/2:enable='between(t,{t0:.2f},{min(t1, total):.2f})'[v{k}]"); last = f'v{k}'; k += 1
    fc.append(f"[1:a]aresample=48000,apad=whole_dur={total},atrim=duration={total},alimiter=limit=0.84:level=0[a]")
    enc = ['-c:v', 'libx264', '-profile:v', 'high', '-crf', '19', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-r', str(FPS), '-movflags', '+faststart', '-t', str(total)]
    sem = f'{out_dir}/{cfg["nome"]}_sem_legenda.mp4'; com = f'{out_dir}/{cfg["nome"]}.mp4'
    run(['ffmpeg', '-v', 'error', '-y', *inputs, '-filter_complex', ';'.join(fc), '-map', f'[{last}]', '-map', '[a]', *enc, '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', sem])
    run(['ffmpeg', '-v', 'error', '-y', '-i', sem, '-vf', f'ass={ass}', '-c:a', 'copy', *enc, com])
    print(f'OK {com}\n   {sem}\n   duração {total}s | {len(parts)} cenas | legendas {nleg} | preço {preco} | CTA {cta}')

if __name__ == '__main__': main()
