(function(){
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let cur='s1', prev='s2';
function go(id){ if(id!==cur) prev=cur; $$('.scr').forEach(e=>e.hidden=e.id!==id); cur=id; }
function chip(on){ $('#chip').hidden=!on; $('#chipbar').hidden=!on; }
function setRev(n){ const c=$('#revcard');
  if(n<=0){ c.innerHTML='<div class="status">[ All clear ]</div><div class="lbl" style="margin-top:6px">No accidental captures waiting</div>'; return; }
  $('#revnum').textContent=n; }
function tiles(){ const t=$$('#s3 .tile'); let keep=t.filter(x=>x.dataset.keep==='1').length;
  $('#keepn').textContent=keep+' kept · tap to change'; $('#clearbtn').textContent='Clear '+(t.length-keep); }
const KEEP='<div style="position:absolute;top:8px;right:8px;height:22px;padding:0 8px;border-radius:11px;background:#fff;color:#000;font-family:SM;font-size:10px;letter-spacing:.06em;display:flex;align-items:center">KEEP</div>';
const CHECK='<div style="position:absolute;top:8px;right:8px;width:22px;height:22px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:#000;fill:none;stroke-width:3"><path d="M5 12l5 5 9-10"/></svg></div>';
function paintTile(x){ const k=x.dataset.keep==='1', box=x.firstElementChild;
  box.style.border=k?'2px solid #fff':'1px solid #262626'; box.lastElementChild.outerHTML=k?KEEP:CHECK;
  x.querySelector('.lbl').style.color=k?'#fff':''; x.setAttribute('aria-pressed',k); }
$$('#s3 .tile').forEach(x=>{ x.dataset.keep = x.querySelector('.lbl').style.color ? '1':'0';
  x.tabIndex=0; x.setAttribute('role','button'); x.setAttribute('aria-label','Keep this capture'); x.setAttribute('aria-pressed',x.dataset.keep==='1');
  const f=()=>{ x.dataset.keep = x.dataset.keep==='1'?'0':'1'; paintTile(x); tiles(); };
  x.addEventListener('click',f); x.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){e.preventDefault();f();} }); });
const acts={
  press(){ go('s1'); chip(true); $('#lockstatus').textContent='Sent to review · Clears in 7 days'; },
  power(){ go('s1'); chip(false); $('#lockstatus').textContent='Power key · Screen locked'; },
  undo(){ chip(false); $('#lockstatus').textContent='[ Capture removed ]'; },
  keep(){ chip(false); $('#lockstatus').textContent='[ Kept in Essential Space ]'; },
  clearall(){ setRev(0); },
  clearsel(){ setRev(0); go('s2'); },
  remind(){ const b=$('#remindbtn'); b.textContent='Set for 10 Oct'; b.classList.remove('fill'); },
  back(){ go(prev==='s5'?'s2':prev); },
  tog(t){ t.classList.toggle('on'); t.setAttribute('aria-pressed',t.classList.contains('on')); }
};
document.addEventListener('click',e=>{
  const g=e.target.closest('[data-go]'); if(g){ go(g.dataset.go); return; }
  const a=e.target.closest('[data-act]'); if(a){ acts[a.dataset.act](a); return; }
  const f=e.target.closest('[data-flow]'); if(f){
    if(f.dataset.flow==='press'){ go('s1'); chip(false); $('#lockstatus').textContent='Press the Essential Key on the right edge'; $('.key.ess').focus(); }
    if(f.dataset.flow==='review') go('s2');
    if(f.dataset.flow==='find') go('s4');
    if(window.innerWidth<900) $('#box').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
  }
});
function fit(){ const box=$('#box'), st=$('#stage');
  const avail=Math.min(box.parentElement.clientWidth, document.documentElement.clientWidth-32);
  const sc=Math.min(1, avail/450); st.style.transform='scale('+sc+')'; box.style.width=(450*sc)+'px'; box.style.height=(925*sc)+'px'; }
window.addEventListener('resize',fit); fit(); go('s1');
})();
