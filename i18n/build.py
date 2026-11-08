#!/usr/bin/env python3
"""Inject the language switch (engine + Dutch dictionary) into Korf Log.html and Korf Lab.html.
Usage: python3 i18n/build.py   (run from the repository root; idempotent)"""
import json, re, os
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
engine=open(os.path.join(root,'i18n','engine.js'),encoding='utf8').read()
CSS=""".langsw{display:inline-flex;border:1px solid var(--line);border-radius:999px;overflow:hidden;background:var(--surface);box-shadow:var(--sh1)}
.langsw button{font:inherit;font-size:.82rem;font-weight:600;border:0;background:transparent;color:var(--accent);padding:.28rem .7rem;cursor:pointer}
.langsw button[aria-pressed=true]{background:var(--accent);color:#fff}
.langsw button:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}
@media print{.langsw{display:none!important}}
html[lang=nl] details.card>summary::after{content:"Toon"}
html[lang=nl] details.card[open]>summary::after{content:"Verberg"}"""
SW='<span class="langsw" role="group" aria-label="Language"><button type="button" data-lang="en" lang="en" title="English">EN</button><button type="button" data-lang="nl" lang="nl" title="Nederlands">NL</button></span>'
for name,dic in (('Korf Log.html','nl-log.json'),('Korf Lab.html','nl-lab.json')):
    p=os.path.join(root,name);s=open(p,encoding='utf8').read()
    d=json.load(open(os.path.join(root,'i18n',dic),encoding='utf8'))
    s=re.sub(r'<!--i18n:start-->.*?<!--i18n:end-->\n?','',s,flags=re.S)
    s=re.sub(r'/\*i18n-css\*/.*?/\*i18n-css-end\*/\n?','',s,flags=re.S)
    s=s.replace(SW,'')
    s=s.replace('<div class="donate">','<div class="donate">'+SW,1)
    s=s.replace('@media print{.donate{display:none!important}}','@media print{.donate{display:none!important}}\n/*i18n-css*/'+CSS+'\n/*i18n-css-end*/',1)
    js=json.dumps(d,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
    block='<!--i18n:start-->\n<script>window.__NL='+js+';</script>\n<script>'+engine+'</script>\n<!--i18n:end-->\n'
    i=s.rindex('</body>')
    s=s[:i]+block+s[i:]
    open(p,'w',encoding='utf8').write(s)
    print(name,len(d),'entries',len(s))
