#!/usr/bin/env python3
"""Update i18n/locales/nl.json from a revised review workbook.
Usage: python3 i18n/import-xlsx.py i18n/review/korf-nl-translation-review.xlsx
Rows are matched on (Context, English). Placeholder names must match the source."""
import json,re,sys,openpyxl
wb=openpyxl.load_workbook(sys.argv[1]);ws=wb['Translations']
p='i18n/locales/nl.json';nl=json.load(open(p,encoding='utf8'))
def ph(s):
    if 'plural' in s: s=re.sub(r'\b(one|other)\s*\{[^{}]*\}','',s)
    return sorted(set(re.findall(r'\{\s*([A-Za-z_]\w*)',s))-{'one','other','plural'})
bad=0;ch=0
for r in ws.iter_rows(min_row=2,values_only=True):
    ctx,src,nlt,st=r[2] or '',r[3],r[4],r[5]
    if not src or not nlt or st=='Do not translate': continue
    key=(ctx+'\x04'+src) if ctx else src
    if ph(src)!=ph(nlt): print('PLACEHOLDER MISMATCH:',src[:70]);bad+=1;continue
    if nl.get(key)!=nlt: nl[key]=nlt;ch+=1
json.dump(nl,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=1,sort_keys=True)
print('updated',ch,'skipped',bad)
