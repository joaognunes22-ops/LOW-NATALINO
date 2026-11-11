"""Gera o plano de cenas (JSON para montar_voz_off.py) a partir da transcrição de cada narração.

Regra: gancho e dor -> cenas do personagem (sem fala); quando a fala cita uma peça do kit -> b-roll real
dessa peça; preço -> páginas do livrinho; CTA -> personagem acenando/sorrindo.
Uso: python3 planejar_voz_off.py <ID> <pasta PAPAI_NOEL_META_ADS> <saida.json> [deslocamento]
"""
import json, os, re, sys, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from editar_papai_noel import juntar_preco

AQUI = os.path.dirname(os.path.abspath(__file__)); BR = f'{AQUI}/broll'

def dur(p): return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p], capture_output=True, text=True).stdout)

def main():
    ID, P, out = sys.argv[1].zfill(3), sys.argv[2], sys.argv[3]; shift = int(sys.argv[4]) if len(sys.argv) > 4 else 0
    G = f'{P}/VIDEOS_GERADOS'
    words = juntar_preco(json.load(open(f'{P}/LEGENDAS/PAPAI_NOEL_AD_{ID}.words.json')))
    total = round(dur(f'{P}/AUDIOS_ORIGINAIS/PAPAI_NOEL_AD_{ID}.mp3') + .4, 2)
    # trechos do personagem sem fala (CENA_5: só fora do intervalo em que o gorro aparece por erro de geração)
    hook = [(f'{G}/CENA_1.mp4', 0.0, 1.1), (f'{G}/CENA_5.mp4', 6.0, 7.9)]
    pool = [(f'{G}/CENA_2.mp4', 0.0, 3.8), (f'{G}/CENA_3.mp4', 0.0, 4.0), (f'{G}/CENA_4.mp4', 0.0, 3.8),
            (f'{G}/CENA_2.mp4', 3.8, 7.9), (f'{G}/CENA_3.mp4', 4.0, 7.9), (f'{G}/CENA_4.mp4', 3.8, 7.9),
            (f'{G}/CENA_1.mp4', 1.1, 5.4)]
    pool = pool[shift % len(pool):] + pool[:shift % len(pool)]
    cta_clips = [(f'{G}/CENA_1.mp4', 5.4, 7.9), (f'{G}/CENA_5.mp4', 5.6, 7.9), (f'{G}/CENA_1.mp4', 0.0, 1.1)]
    broll = {'kit': (f'{BR}/BROLL_kit_completo_mockup_9x16.mp4', 0, 4.0), 'carta': (f'{BR}/BROLL_carta_9x16.mp4', 0.6, 4.0),
             'cert': (f'{BR}/BROLL_certificado_qr_9x16.mp4', 0.8, 4.0), 'livro': (f'{BR}/BROLL_livro_qr_tela_real_9x16.mp4', 3.0, 8.1),
             'imprimir': (f'{BR}/BROLL_tres_passos_site_9x16.mp4', 0, 4.9), 'livrinho': (f'{BR}/BROLL_livrinho_paginas_9x16.mp4', 0, 5.4),
             'bilhete': (f'{BR}/BROLL_bilhete_rena_9x16.mp4', 0, 3.0)}
    rules = [(r'^prova$', 'kit'), (r'^carta', 'carta'), (r'^certificado', 'cert'), (r'^(código|escanear|confere|conferir|confirm|lista)', 'livro'),
             (r'^surpresa', 'kit'), (r'^imprimir', 'imprimir')]
    cta = next(w[0] for w in reversed(words) if w[2].lower().startswith('clique')) - .1
    preco = next((w[0] - .1 for w in words if '9,90' in w[2]), None)
    ev, used = [], set()
    for w in words:
        if w[0] < 2.5 or w[0] >= (preco or cta): continue
        for rx, k in rules:
            if k not in used and re.search(rx, re.sub(r'[^\wÀ-ÿ]', '', w[2].lower())):
                ev.append((round(w[0] - .1, 2), k)); used.add(k); break
    if preco is not None: ev.append((preco, 'livrinho'))
    ev.append((cta, 'cta'))
    # remove peças que ficariam menos de 1,2 s na tela (a anterior continua no lugar)
    ev = [e for j, e in enumerate(ev) if e[1] in ('cta', 'livrinho') or j + 1 >= len(ev) or ev[j + 1][0] - e[0] >= 1.2]
    cenas = []
    def add(src, ini, d): cenas.append({'src': src, 'ini': round(ini, 2), 'fim': round(ini + d, 2), 'dur': round(d, 2)})
    def fill_char(t0, t1, clips):
        t, i = t0, 0
        while t1 - t > .05:
            src, a, b = clips[i % len(clips)]; d = min(b - a, t1 - t)
            if t1 - (t + d) < .9 and t1 - t <= (b - a) * 1.4: d = t1 - t  # evita pedaço curto no fim: estica um pouco
            if d > b - a: cenas.append({'src': src, 'ini': a, 'fim': b, 'dur': round(d, 2)})
            else: add(src, a, d)
            t += d; i += 1
    first = ev[0][0]
    fill_char(0.0, min(1.1, first), hook[:1]); fill_char(min(1.1, first), first, pool)
    for j, (t0, k) in enumerate(ev):
        t1 = ev[j + 1][0] if j + 1 < len(ev) else total
        if k == 'cta': fill_char(t0, t1, cta_clips); continue
        src, a, b = broll[k]; span = t1 - t0
        if span <= (b - a) * 1.35: cenas.append({'src': src, 'ini': a, 'fim': min(b, a + span), 'dur': round(span, 2)})
        else:
            add(src, a, b - a); extra = 'bilhete' if k != 'bilhete' else 'livrinho'
            s2, a2, b2 = broll[extra]; rest = span - (b - a)
            cenas.append({'src': s2, 'ini': a2, 'fim': min(b2, a2 + rest), 'dur': round(rest, 2)})
    json.dump({'id': ID, 'pasta': P, 'saida': f'{P}/VIDEOS_FINAIS', 'nome': f'PAPAI_NOEL_AD_{ID}_vozoff', 'cenas': cenas}, open(out, 'w'), indent=1)
    print(ID, f'{total}s', ' | '.join(f"{os.path.basename(c['src'])[:18]}:{c['dur']}" for c in cenas))

if __name__ == '__main__': main()
