#!/usr/bin/env node
/* Korf tools i18n build.
   Usage: node i18n/build.js            (from the repository root; idempotent)
   1. Finds every message in the code (i18n.t / i18n.th / N_ calls and data-i18n markup).
   2. Writes i18n/messages.json (all source messages, which app uses them, where).
   3. Checks each locale in i18n/locales/*.json: missing and unused messages, mismatching {placeholders}.
   4. Embeds runtime.js and the locale messages used by each app into its HTML file.
   Exit code 1 when a locale has a placeholder mismatch. */
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
let acorn;try{acorn=require('acorn');}catch(e){acorn=require('/tmp/cm/node_modules/acorn');}
const APPS=[['log','Korf Log.html'],['lab','Korf Lab.html']];
const runtime=fs.readFileSync(path.join(__dirname,'runtime.js'),'utf8');
const SEP='\u0004';
const locales={};for(const f of fs.readdirSync(path.join(__dirname,'locales'))){if(/^[a-z]{2,3}(-[A-Za-z]+)?\.json$/.test(f))locales[f.replace('.json','')]=JSON.parse(fs.readFileSync(path.join(__dirname,'locales',f),'utf8'));}
const CSS_KEYS=[['show','Show'],['hide','Hide'],['page','Page {page} of {pages}']];   // strings used in CSS content: (name, message)
function decode(s){return s.replace(/&nbsp;/g,'\u00a0').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&middot;/g,'·').replace(/&mdash;/g,'—').replace(/&ndash;/g,'–').replace(/&times;/g,'×').replace(/&#39;/g,"'");}
function scripts(html){const out=[];const re=/<script(?![^>]*\bsrc\b)[^>]*>([\s\S]*?)<\/script>/g;let m;while((m=re.exec(html))){out.push({start:m.index+m[0].indexOf('>')+1,code:m[1]});}return out;}
function scan(name,html){
  const found=[];const add=(msg,ctx,line,kind)=>found.push({msg,ctx:ctx||'',line,kind});
  const body=html;
  for(const sc of scripts(body)){
    if(/^\s*(window\.__I18N=|\/\* i18n runtime \*\/)/.test(sc.code))continue;
    let ast;try{ast=acorn.parse(sc.code,{ecmaVersion:2022,locations:true});}catch(e){console.error(name,'script parse error',e.message);process.exit(1);}
    const base=body.slice(0,sc.start).split('\n').length-1;
    (function walk(n){if(!n||typeof n!=='object')return;
      if(Array.isArray(n))return n.forEach(walk);
      if(n.type==='CallExpression'){const c=n.callee;let nm='';
        if(c.type==='MemberExpression'&&c.object.type==='Identifier'&&c.object.name==='i18n'&&!c.computed)nm=c.property.name;
        else if(c.type==='Identifier'&&c.name==='N_')nm='N_';
        if(nm==='labels'){const a0=n.arguments[0];(function lw(x){if(!x)return;if(x.type==='Literal'&&typeof x.value==='string'){if(/[A-Za-z]{2}/.test(x.value)&&(/^[A-Z]/.test(x.value)||/\s/.test(x.value))&&!/^var\(/.test(x.value))add(x.value,'',base+x.loc.start.line,'labels');}else if(x.type==='ObjectExpression')x.properties.forEach(p=>lw(p.value));else if(x.type==='ArrayExpression')x.elements.forEach(lw);})(a0);}
        if(nm==='t'||nm==='th'||nm==='N_'){const a=n.arguments[0];
          if(a&&a.type==='Literal'&&typeof a.value==='string'){const cx=n.arguments[2]&&n.arguments[2].type==='Literal'?n.arguments[2].value:'';add(a.value,cx,base+n.loc.start.line,nm);}
          else console.warn(name+': i18n.'+nm+' with a non-literal message at line',base+n.loc.start.line);}}
      for(const k in n){if(k==='loc')continue;const v=n[k];if(v&&typeof v==='object')walk(v);}})(ast);
  }
  const bodyNoScript=body.replace(/<script[\s\S]*?<\/script>/g,s=>s.replace(/[^\n]/g,' '));
  const re=/<([a-zA-Z0-9]+)\b([^>]*\bdata-i18n(?:-html)?(?:\s[^>]*)?)>([\s\S]*?)<\/\1>/g;let m;
  while((m=re.exec(bodyNoScript))){const attrs=m[2];const ctx=(/data-i18n-ctx="([^"]*)"/.exec(attrs)||[])[1]||'';
    const isHtml=/data-i18n-html\b/.test(attrs);const text=m[3].replace(/\s+/g,' ').trim();
    if(text)add(isHtml?text:decode(text),ctx,bodyNoScript.slice(0,m.index).split('\n').length,'markup');}
  const re2=/<([a-zA-Z0-9]+)\b([^>]*\bdata-i18n-attrs="([^"]*)"[^>]*)>/g;
  while((m=re2.exec(bodyNoScript))){for(const a of m[3].split(/\s+/)){const am=new RegExp('\\s'+a+'="([^"]*)"').exec(m[2]);if(am&&am[1])add(decode(am[1]),'',bodyNoScript.slice(0,m.index).split('\n').length,'attr');}}
  for(const [k,msg] of CSS_KEYS)add(msg,'',0,'css');
  return found;
}
function params(s){const out=[];const re=/\{\s*([A-Za-z_]\w*)\s*(?:,|\})/g;let m;while((m=re.exec(s)))out.push(m[1]);return out.sort();}
let bad=0;const all={};const perApp={};
for(const [app,file] of APPS){const p=path.join(root,file);if(!fs.existsSync(p))continue;const html=fs.readFileSync(p,'utf8');const f=scan(app,html);perApp[app]=f;
  for(const x of f){const k=x.ctx?x.ctx+SEP+x.msg:x.msg;const e=all[k]=all[k]||{msg:x.msg,ctx:x.ctx,apps:[],lines:{}};if(!e.apps.includes(app))e.apps.push(app);(e.lines[app]=e.lines[app]||[]).push(x.line);}}
fs.writeFileSync(path.join(__dirname,'messages.json'),JSON.stringify(Object.keys(all).sort().map(k=>({key:k,message:all[k].msg,context:all[k].ctx||undefined,apps:all[k].apps,lines:all[k].lines})),null,1)+'\n');
for(const [loc,cat] of Object.entries(locales)){
  const missing=[],unused=[];
  for(const k of Object.keys(all)){if(!(k in cat)||cat[k]==='')missing.push(k);else if(params(k).join()!==params(cat[k]).join()){bad++;console.error(`[${loc}] placeholder mismatch: ${JSON.stringify(k)} -> ${JSON.stringify(cat[k])}`);}}
  for(const k of Object.keys(cat))if(!(k in all))unused.push(k);
  console.log(`[${loc}] ${Object.keys(all).length-missing.length}/${Object.keys(all).length} translated, ${missing.length} missing, ${unused.length} unused`);
  fs.writeFileSync(path.join(__dirname,'locales',loc+'.missing.txt'),missing.join('\n')+'\n');
  fs.writeFileSync(path.join(__dirname,'locales',loc+'.unused.txt'),unused.join('\n')+'\n');
}
for(const [app,file] of APPS){const p=path.join(root,file);if(!fs.existsSync(p))continue;let html=fs.readFileSync(p,'utf8');
  html=html.replace(/<!--i18n:start-->[\s\S]*?<!--i18n:end-->\n?/g,'');
  const used=new Set(perApp[app].map(x=>x.ctx?x.ctx+SEP+x.msg:x.msg));
  const cat={};for(const [loc,c] of Object.entries(locales)){cat[loc]={};for(const k of Object.keys(c))if(used.has(k)&&c[k]!=='')cat[loc][k]=c[k];}
  const cssVars=CSS_KEYS.map(([k,m])=>'['+JSON.stringify(k)+','+JSON.stringify(m)+']').join(',');
  const block='<!--i18n:start-->\n<script>window.__I18N='+JSON.stringify(cat).replace(/<\//g,'<\\/')+';window.__i18nCss=['+cssVars+'];</script>\n<script>/* i18n runtime */\n'+runtime+'</script>\n<!--i18n:end-->\n';
  const i=html.indexOf('<script');html=html.slice(0,i)+block+html.slice(i);
  fs.writeFileSync(p,html);console.log(app,'embedded',Object.keys(cat).map(l=>l+':'+Object.keys(cat[l]).length).join(' '),'messages in app:',used.size);}
process.exit(bad?1:0);
