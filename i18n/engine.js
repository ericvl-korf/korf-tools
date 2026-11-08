/* Korf tools: language switch (English / Nederlands).
   Translates what the page shows, so every text the app builds is covered. English is the source language;
   texts missing from the dictionary simply stay in English. Dictionary: window.__NL (see i18n/nl.json). */
(function(){
  var D=window.__NL||{},PAT=[],cache={},lang='en',busy=false,seen=new WeakSet();
  var LOG=/[?&]i18nlog\b/.test(location.search),MISSING=window.__i18nMissing={};
  function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');}
  Object.keys(D).forEach(function(k){
    if(k.indexOf('{}')<0) return;
    PAT.push([new RegExp('^'+k.split('{}').map(esc).join('(.+?)')+'$'),D[k]]);
  });
  PAT.sort(function(a,b){return b[0].source.length-a[0].source.length;});
  function tr(s){
    if(!/[A-Za-z]{2}/.test(s)) return s;
    var m=s.match(/^(\s*)([\s\S]*?)(\s*)$/),core=m[2];
    if(!core) return s;
    if(cache.hasOwnProperty(core)) return m[1]+cache[core]+m[3];
    var out=null;
    if(D.hasOwnProperty(core)&&core.indexOf('{}')<0) out=D[core];
    else for(var i=0;i<PAT.length;i++){
      var r=PAT[i][0].exec(core);
      if(r){var n=0;out=PAT[i][1].replace(/\{\}/g,function(){n++;return tr(r[n]||'');});break;}
    }
    if(out===null){out=core;if(LOG) MISSING[core]=1;}
    cache[core]=out;
    return m[1]+out+m[3];
  }
  var ATTRS=['title','placeholder','aria-label','alt'];
  function textNode(n){
    var p=n.parentNode;if(!p||p.nodeName==='SCRIPT'||p.nodeName==='STYLE'||p.nodeName==='TEXTAREA') return;
    if(n.__t!==undefined&&n.data===n.__t) return;
    var en=n.data,t=tr(en);
    n.__en=en;n.__t=t;if(t!==en) n.data=t;
  }
  function attrs(el){
    var rec=el.__a||(el.__a={});
    ATTRS.forEach(function(a){
      if(!el.hasAttribute(a)) return;var v=el.getAttribute(a);
      if(rec[a]&&rec[a][1]===v) return;
      var t=tr(v);rec[a]=[v,t];if(t!==v) el.setAttribute(a,t);
    });
    if(el.nodeName==='INPUT'&&/^(button|submit)$/.test(el.type)){
      var v2=el.value;if(!(rec.value&&rec.value[1]===v2)){var t2=tr(v2);rec.value=[v2,t2];if(t2!==v2) el.value=t2;}
    }
  }
  function walk(root){
    if(root.nodeType===3){textNode(root);return;}
    if(root.nodeType!==1) return;
    if(root.nodeName==='SCRIPT'||root.nodeName==='STYLE') return;
    attrs(root);
    for(var c=root.firstChild;c;c=c.nextSibling){
      if(c.nodeType===3) textNode(c);else if(c.nodeType===1) walk(c);
    }
  }
  function restore(root){
    if(root.nodeType===3){if(root.__en!==undefined&&root.data===root.__t) root.data=root.__en;return;}
    if(root.nodeType!==1) return;
    var rec=root.__a;
    if(rec) Object.keys(rec).forEach(function(a){
      if(a==='value'){if(root.value===rec[a][1]) root.value=rec[a][0];}
      else if(root.getAttribute(a)===rec[a][1]) root.setAttribute(a,rec[a][0]);
    });
    for(var c=root.firstChild;c;c=c.nextSibling) restore(c);
  }
  var mo=new MutationObserver(function(recs){
    if(lang!=='nl'||busy) return;
    busy=true;
    try{
      recs.forEach(function(r){
        if(r.type==='characterData') textNode(r.target);
        else if(r.type==='attributes'){if(r.target.nodeType===1) attrs(r.target);}
        else r.addedNodes.forEach(walk);
      });
    }finally{busy=false;}
    mo.takeRecords();
  });
  function start(){mo.observe(document.documentElement,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:ATTRS.concat(['value'])});}
  function apply(l){
    lang=l;cache={};
    try{localStorage.setItem('korf_lang',l);}catch(e){}
    document.documentElement.lang=l;
    var pg=document.getElementById('i18n-pg');if(pg)pg.remove();
    if(l==='nl'){pg=document.createElement('style');pg.id='i18n-pg';pg.textContent='@page{@bottom-center{content:"Pagina " counter(page) " van " counter(pages);font:10px Barlow,sans-serif;color:#566860}}';document.head.appendChild(pg);}
    mo.disconnect();busy=true;
    try{
      if(l==='nl') walk(document.body);else restore(document.body);
      document.title=l==='nl'?tr(document.__enTitle):document.__enTitle;
    }finally{busy=false;}
    start();
    document.querySelectorAll('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-lang')===l?'true':'false');});
  }
  ['alert','confirm','prompt'].forEach(function(f){
    var o=window[f];window[f]=function(m,d){return o.call(window,lang==='nl'?tr(String(m)):m,d);};
  });
  function init(){
    document.__enTitle=document.title;
    document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-lang]');if(b) apply(b.getAttribute('data-lang'));});
    var l='en';
    try{var q=location.search.match(/[?&]lang=(nl|en)\b/);if(q) l=q[1];
      else{var sv=localStorage.getItem('korf_lang');if(sv==='nl'||sv==='en') l=sv;else if(/^nl\b/i.test(navigator.language||'')) l='nl';}}catch(e){}
    apply(l);
  }
  window.KorfLang={set:apply,get:function(){return lang;},tr:tr};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);else init();
})();
