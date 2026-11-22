/* Korf tools i18n runtime.
   Messages are keyed by their English source text (the code stays readable and English is always the fallback).
     t('Step {n} of {total}', {n: 3, total: 6})
     t('{n, plural, one {# shot} other {# shots}}', {n: 2})
     t('{who, select, H {Home} A {Away} other {Unknown}}', {who: 'H'})
     t('Open', null, 'verb')            // optional context separates identical English words that translate differently
   th() is t() for HTML strings: it escapes the message text and the values (wrap trusted markup in i18n.html()).
   Static markup uses data-i18n / data-i18n-attrs / data-i18n-html (see i18n/README.md). */
(function(){
  var CAT=window.__I18N||{},LOC='en',LISTEN=[],MISS=window.__i18nMissing={},LOG=/[?&]i18nlog\b/.test(location.search),FORCE_EN=0;
  var SEP='\u0004';
  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
  function Raw(h){this.h=h;}
  function pr(){try{return new Intl.PluralRules(LOC==='pseudo'?'en':LOC);}catch(e){return null;}}
  var PRC=pr();
  /* ---- ICU subset: {name}  {name, plural, one {..} other {..}}  {name, select, a {..} other {..}}  {name, number} ---- */
  function find(s,i){var d=0;for(var j=i;j<s.length;j++){if(s[j]==='{')d++;else if(s[j]==='}'){d--;if(!d)return j;}}return -1;}
  function arms(s){var out={},i=0;while(i<s.length){while(/\s/.test(s[i]||''))i++;if(i>=s.length)break;var k='';while(i<s.length&&!/[\s{]/.test(s[i]))k+=s[i++];while(/\s/.test(s[i]||''))i++;if(s[i]!=='{')break;var e=find(s,i);if(e<0)break;out[k]=s.slice(i+1,e);i=e+1;}return out;}
  function fmt(msg,vars,html){
    var out='',i=0;vars=vars||{};
    function val(v){return v instanceof Raw?v.h:(html?esc(v):String(v));}
    function text(x){return html?esc(x):x;}
    while(i<msg.length){
      var o=msg.indexOf('{',i);
      if(o<0){out+=text(msg.slice(i));break;}
      var c=find(msg,o);if(c<0){out+=text(msg.slice(i));break;}
      out+=text(msg.slice(i,o));
      var inner=msg.slice(o+1,c),m=/^\s*([A-Za-z_][\w]*)\s*(?:,\s*(plural|select|number)\s*(?:,([\s\S]*))?)?$/.exec(inner);
      if(!m){out+=text(msg.slice(o,c+1));i=c+1;continue;}
      var name=m[1],type=m[2],v=vars[name];
      if(!type){out+=(v===undefined||v===null)?'':val(v);}
      else if(type==='number'){out+=val(num(v));}
      else{var a=arms(m[3]||''),pick;
        if(type==='plural'){var n=Number(v);pick=a['='+n]!==undefined?a['='+n]:(a[PRC?PRC.select(n):(n===1?'one':'other')]!==undefined?a[PRC?PRC.select(n):(n===1?'one':'other')]:a.other);
          if(pick!==undefined)pick=pick.replace(/#/g,function(){return num(n);});}
        else pick=a[String(v)]!==undefined?a[String(v)]:a.other;
        out+=pick===undefined?'':fmt(pick,vars,html);}
      i=c+1;
    }
    return out;
  }
  function num(n,o){try{return new Intl.NumberFormat(LOC==='pseudo'?'en':(LOC==='nl'?'nl-NL':'en-GB'),o).format(n);}catch(e){return String(n);}}
  /* pseudo locale: every translated string is wrapped in ⟦ ⟧ so untranslated text stands out */
  function pseudo(s){return '⟦'+s+'⟧';}
  function lookup(src,ctx){
    if(FORCE_EN||LOC==='en')return src;
    var c=CAT[LOC];var k=ctx?ctx+SEP+src:src;
    if(c&&Object.prototype.hasOwnProperty.call(c,k)&&c[k]!=='')return c[k];
    if(LOC!=='pseudo'&&LOG)MISS[k]=1;
    return src;
  }
  function t(src,vars,ctx){
    if(LOC==='pseudo'&&!FORCE_EN)return pseudo(fmt(src,vars,false));
    return fmt(lookup(src,ctx),vars,false);
  }
  function th(src,vars,ctx){
    var r=fmt(LOC==='pseudo'&&!FORCE_EN?src:lookup(src,ctx),vars,true);
    return LOC==='pseudo'&&!FORCE_EN?pseudo(r):r;
  }
  /* ---- static markup ---- */
  function applyEl(el){
    var s;
    if(el.hasAttribute('data-i18n')||el.hasAttribute('data-i18n-html')){
      var html=el.hasAttribute('data-i18n-html'),ctx=el.getAttribute('data-i18n-ctx')||'';
      if(el.__src===undefined)el.__src=html?el.innerHTML.replace(/\s+/g,' ').trim():el.textContent.replace(/\s+/g,' ').trim();
      s=html?th_html(el.__src,ctx):t(el.__src,null,ctx);
      if(html)el.innerHTML=s;else el.textContent=s;
    }
    var at=el.getAttribute('data-i18n-attrs');
    if(at){el.__sa=el.__sa||{};at.split(/\s+/).forEach(function(a){if(!a)return;if(el.__sa[a]===undefined)el.__sa[a]=el.getAttribute(a)||'';el.setAttribute(a,t(el.__sa[a]));});}
  }
  /* html messages keep their inline tags: only the text between tags is looked up as one message */
  function th_html(src,ctx){return LOC==='pseudo'&&!FORCE_EN?pseudo(src):(function(){var l=lookup(src,ctx);return l;})();}
  function apply(root){root=root||document;var q=root.querySelectorAll?root.querySelectorAll('[data-i18n],[data-i18n-html],[data-i18n-attrs]'):[];for(var i=0;i<q.length;i++)applyEl(q[i]);if(root.nodeType===1)applyEl(root);
    var tt=document.querySelector('title[data-i18n]');if(tt)document.title=tt.textContent;}
  function cssVars(){var r=document.documentElement.style;(window.__i18nCss||[]).forEach(function(p){if(p[0]==='page')return;r.setProperty('--i18n-'+p[0],'"'+t(p[1]).replace(/"/g,'\\"')+'"');});
    /* printed page footer ("Page 1 of 3"): @page cannot read custom properties, so it is written as a style rule */
    var pg=document.getElementById('i18n-pg');if(pg)pg.remove();
    if(LOC!=='en'&&LOC!=='pseudo'){var m=/^([\s\S]*)\{page\}([\s\S]*)\{pages\}([\s\S]*)$/.exec(t('Page {page} of {pages}',{page:'{page}',pages:'{pages}'}));
      if(m){var q=function(x){return '"'+x.replace(/"/g,'\\"')+'"';};pg=document.createElement('style');pg.id='i18n-pg';
        pg.textContent='@page{@bottom-center{content:'+q(m[1])+' counter(page) '+q(m[2])+' counter(pages)'+(m[3]?' '+q(m[3]):'')+';font:10px Barlow,sans-serif;color:#566860}}';document.head.appendChild(pg);}}}
  function set(l,quiet){
    if(l!=='en'&&l!=='pseudo'&&!CAT[l])l='en';
    LOC=l;PRC=pr();document.documentElement.lang=l==='pseudo'?'en':l;
    try{if(!quiet&&l!=='pseudo')localStorage.setItem('korf_lang',l);}catch(e){}
    apply(document);cssVars();
    qs('.langsw [data-lang]').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-lang')===l));});
    LISTEN.forEach(function(f){try{f(l);}catch(e){console.error(e);}});
  }
  function qs(s){return [].slice.call(document.querySelectorAll(s));}
  function initial(){
    var m=/[?&]lang=([\w-]+)/.exec(location.search);if(m)return m[1];
    try{var sv=localStorage.getItem('korf_lang');if(sv)return sv;}catch(e){}
    return /^nl\b/i.test(navigator.language||'')&&CAT.nl?'nl':'en';
  }
  window.t=t;window.th=th;window.N_=function(s){return s;};
  window.i18n={
    t:t,th:th,
    /* label tables: i18n.labels({goal:'Goal'}) / i18n.labels(['a','b']) returns a copy whose values are translated whenever they are read */
    labels:function(src){function ui(v){return typeof v==='string'&&/[A-Za-z]{2}/.test(v)&&(/^[A-Z]/.test(v)||/\s/.test(v))&&!/^var\(/.test(v);}
      function wrap(s){var out=Array.isArray(s)?[]:{};Object.keys(s).forEach(function(k){var v=s[k];if(v&&typeof v==='object'){var w=wrap(v);Object.defineProperty(out,k,{enumerable:true,get:function(){return w;}});}else if(ui(v)){Object.defineProperty(out,k,{enumerable:true,get:function(){return t(v);}});}else out[k]=v;});return out;}
      return wrap(src);},
    locale:function(){return LOC;},set:set,onChange:function(f){LISTEN.push(f);},apply:apply,
    html:function(h){return new Raw(h);},
    number:num,                                           // i18n.number(2.5) -> "2,5" in Dutch
    asEnglish:function(fn){FORCE_EN++;try{return fn();}finally{FORCE_EN--;}},   // exports and saved data stay English
    available:function(){return ['en'].concat(Object.keys(CAT));}
  };
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.langsw [data-lang]');if(b)set(b.getAttribute('data-lang'));});
  /* the language is known from the first line of script on, so the apps' first render is already translated */
  (function(){var l=initial();if(l!=='en'&&l!=='pseudo'&&!CAT[l])l='en';LOC=l;PRC=pr();document.documentElement.lang=l==='pseudo'?'en':l;})();
  function boot(){apply(document);cssVars();qs('.langsw [data-lang]').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-lang')===LOC));});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
