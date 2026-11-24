'use strict';
/* Fauna: animais variados pelo mapa todo, peixes, respawn, e nomes sobre animais, NPCs, monstros e espíritos. */
const SPECIES={lobo:{n:'Lobo',h:1,sp:5,ag:28,dmg:7,rng:2.2,hp:30,q:10},cobra:{n:'Cobra',h:1,sp:4,ag:12,dmg:4,rng:1.6,sick:1,hp:12,q:8},
coelho:{n:'Coelho',f:1,sp:8,fr:12,hp:8,q:18},cervo:{n:'Cervo',f:1,sp:8,fr:14,hp:20,q:12},porco:{n:'Porco',f:1,sp:5,fr:6,hp:22,q:12},cavalo:{n:'Cavalo',f:1,sp:10,fr:16,hp:35,q:8},sapo:{n:'Sapo',f:1,sp:4,fr:5,hp:5,q:10}};

function animal2(t){const g=new THREE.Group(),ls=[];
const box=(w,h,d,x,y,z,c)=>{const m=M(new THREE.BoxGeometry(w,h,d),c);m.position.set(x,y,z);g.add(m);return m};
const legs=(c,h,xs,zs,w)=>xs.forEach(x=>zs.forEach(z=>{const l=M(new THREE.BoxGeometry(w,h,w),c);l.position.set(x,h/2,z);g.add(l);ls.push(l)}));
const eyes=(x,y,z,c)=>[-1,1].forEach(s=>{const e=M(new THREE.SphereGeometry(.045,6,6),c||'#111');e.position.set(s*x,y,z);g.add(e)});
const cone=(r,h,x,y,z,c,rx,rz)=>{const m=M(new THREE.ConeGeometry(r,h,5),c);m.position.set(x,y,z);m.rotation.x=rx||0;m.rotation.z=rz||0;g.add(m);return m};
if(t=='porco'){box(.7,.6,1.1,0,.6,0,'#e8a0a0');box(.42,.4,.4,0,.65,.72,'#e8a0a0');box(.22,.16,.1,0,.6,.95,'#c97a7a');[-1,1].forEach(s=>cone(.1,.2,s*.17,.92,.7,'#d98a8a'));legs('#d98a8a',.3,[-.22,.22],[-.4,.4],.14);eyes(.13,.72,.9)}
else if(t=='cavalo'){box(.7,.8,1.6,0,1.15,0,'#7a4a2a');box(.3,.8,.3,0,1.6,.8,'#7a4a2a').rotation.x=.5;box(.28,.34,.7,0,1.95,1.25,'#7a4a2a');box(.08,.7,.3,0,1.75,.6,'#2a1a10');box(.1,.5,.1,0,1.1,-.9,'#2a1a10').rotation.x=-.5;
[-1,1].forEach(s=>cone(.07,.2,s*.1,2.2,1.05,'#5a3a1f'));legs('#6a3a1f',.9,[-.25,.25],[-.6,.6],.15);eyes(.14,2,1.5)}
else if(t=='sapo'){box(.36,.2,.42,0,.18,0,'#4a8a3a');box(.28,.14,.2,0,.2,.25,'#4a8a3a');[-1,1].forEach(s=>{const e=M(new THREE.SphereGeometry(.07,6,6),'#d8d84a');e.position.set(s*.1,.34,.28);g.add(e);const p=M(new THREE.SphereGeometry(.03,6,6),'#111');p.position.set(s*.1,.36,.34);g.add(p)});legs('#3a7a2a',.1,[-.2,.2],[-.15,.2],.1)}
else if(t=='cobra'){for(let i=0;i<9;i++){const s=M(new THREE.SphereGeometry(.14-i*.008,6,6),i%2?'#3a6a2a':'#5a8a3a');s.position.set(Math.sin(i*.9)*.35,.12,-i*.22);g.add(s)}
box(.2,.12,.3,0,.16,.2,'#3a6a2a');[-1,1].forEach(s=>{const e=M(new THREE.SphereGeometry(.03,6,6),'#f22');e.position.set(s*.07,.22,.3);g.add(e)})}
else if(t=='coelho'){box(.32,.28,.5,0,.3,0,'#e8e8e8');box(.22,.22,.24,0,.4,.3,'#e8e8e8');[-1,1].forEach(s=>box(.06,.3,.05,s*.07,.7,.28,'#f0f0f0'));const tl=M(new THREE.SphereGeometry(.07,6,6),'#fff');tl.position.set(0,.32,-.28);g.add(tl);legs('#ddd',.14,[-.12,.12],[-.18,.18],.08);eyes(.08,.46,.4,'#c33')}
else if(t=='cervo'){box(.5,.6,1.1,0,1,0,'#9a6a3a');box(.2,.6,.2,0,1.4,.55,'#9a6a3a').rotation.x=.4;box(.22,.26,.4,0,1.7,.8,'#9a6a3a');
[-1,1].forEach(s=>{cone(.03,.5,s*.1,2,.75,'#e8dcc0',0,s*.4);cone(.03,.3,s*.2,2.1,.75,'#e8dcc0',0,s*.8)});box(.12,.12,.12,0,1.2,-.6,'#fff');legs('#7a4a2a',.7,[-.18,.18],[-.4,.4],.1);eyes(.1,1.75,.98)}
else{box(.5,.5,1,0,.7,0,'#666');box(.5,.2,.8,0,.55,0,'#8a8a8a');box(.34,.3,.4,0,.85,.6,'#6a6a6a');box(.2,.16,.3,0,.8,.88,'#555');[-1,1].forEach(s=>cone(.06,.16,s*.12,1.08,.55,'#555'));box(.1,.1,.5,0,.8,-.7,'#555').rotation.x=-.4;legs('#555',.4,[-.17,.17],[-.35,.35],.1);eyes(.1,.9,.8,'#fc4')}
g.u={ls};g.traverse(m=>m.castShadow=true);return g}

/* ---------- pontos no mapa ---------- */
const nearInf=(x,z)=>typeof INF!='undefined'&&Math.hypot(x-INF.x,z-INF.z)<INF.r+25;
const nearElf=(x,z)=>typeof ELF!='undefined'&&Math.hypot(x-ELF.x,z-ELF.z)<50;
function landPoint(minD,t){for(let i=0;i<120;i++){const x=(R()-.5)*(SZ-160),z=(R()-.5)*(SZ-160),y=gy(x,z);
if(t=='sapo'?(y>-2.3&&y<-1.1):(y>-1&&y<10)){if(Math.hypot(x,z)<minD||nearInf(x,z)||nearElf(x,z))continue;if(pl&&G&&Math.hypot(x-pl.position.x,z-pl.position.z)<40)continue;return[x,z]}}return null}
function faunaAdd(t,pt){const p=pt||landPoint(45,t);if(!p)return;const a=animal2(t),S=SPECIES[t];a.t=t;a.hp=S.hp;a.position.set(p[0],gy(p[0],p[1]),p[1]);a.tgt=a.position.clone();scene.add(a);animals.push(a)}
function faunaDied(a){const t=a.t;if(!SPECIES[t])return;setTimeout(()=>{if(running)faunaAdd(t)},240000)}
function faunaInit(){animals.slice().forEach(a=>{const dx=typeof INF!='undefined'&&Math.hypot(a.position.x-INF.x,a.position.z-INF.z)<INF.r+10;if(!dx){scene.remove(a);animals.splice(animals.indexOf(a),1)}});
const k=CFG.lite?.5:1;Object.keys(SPECIES).forEach(t=>{const n=Math.round(SPECIES[t].q*k);for(let i=0;i<n;i++)faunaAdd(t)})}

/* ---------- peixes ---------- */
const peixes=[];
function peixeAdd(){for(let i=0;i<80;i++){const x=(R()-.5)*(SZ-200),z=(R()-.5)*(SZ-200),y=gy(x,z);if(y<-4&&y>-14&&Math.hypot(x,z)>40){
const g=new THREE.Group(),c=['#e8742a','#d8c03a','#4a9ad8'][(R()*3)|0],b=M(new THREE.SphereGeometry(.28,8,6),c);b.scale.set(.6,.7,1.5);const t=M(new THREE.ConeGeometry(.2,.4,4),c);t.rotation.x=Math.PI/2;t.position.z=-.5;g.add(b,t);
const e=M(new THREE.SphereGeometry(.04,5,5),'#111');e.position.set(.1,.08,.35);g.add(e);g.position.set(x,WL-1-R()*Math.min(3,-y-WL-1),z);g.hd=R()*TAU;g.fy=g.position.y;scene.add(g);peixes.push(g);return}}}
function peixeTick(dt){const p=pl.position;peixes.forEach(f=>{const d=Math.hypot(f.position.x-p.x,f.position.z-p.z);if(d>130)return;
let sp=1.2;if(d<7){f.hd=Math.atan2(f.position.x-p.x,f.position.z-p.z);sp=4}else if(R()<dt*.5)f.hd+=(R()-.5)*1.5;
const nx=f.position.x+Math.sin(f.hd)*sp*dt,nz=f.position.z+Math.cos(f.hd)*sp*dt;if(gy(nx,nz)<-3.8){f.position.x=nx;f.position.z=nz}else f.hd+=Math.PI*.7;
f.rotation.y=f.hd;f.rotation.z=Math.sin(performance.now()/180+f.fy*7)*.12})}

/* ---------- rótulos ---------- */
const NOMES={m:['Tomás','Bruno','Hugo','Aldo','Caio','Davi','Eron','Fábio'],f:['Lara','Mira','Nina','Olga','Rita','Sara','Tânia','Vera']};
function rotulo(o,text,col,y,sc){if(!o.lb){const c=document.createElement('canvas');c.width=256;c.height=64;const x=c.getContext('2d');x.font='bold 28px Georgia';x.textAlign='center';x.fillStyle='#0009';x.fillRect(4,8,248,46);x.fillStyle=col;x.fillText(text,128,42);
const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true}));const k=sc||2;s.scale.set(k,k*.25,1);s.position.y=y;o.add(s);o.lb=s}return o.lb}
function rotulos(){if(!G||!pl)return;const p=pl.position;
const f=(o,txt,col,y,max,sc)=>{const d=o.position.distanceTo(p);if(d<max){const l=rotulo(o,txt,col,y,sc);l.visible=o.visible!==false}else if(o.lb)o.lb.visible=false};
animals.forEach(a=>{const S=SPECIES[a.t];f(a,S?S.n:'Animal',S&&S.h?'#ff7a6a':'#fff',a.t=='cavalo'||a.t=='cervo'?2.6:1.3,16)});
npcs.forEach(n=>{if(!n.nm)n.nm=NOMES[n.g||'m'][(R()*8)|0];f(n,n.nm+' — '+n.role,'#ffe9a0',2.4,16)});
MONS.forEach(m=>{m.o.mname=m.name;f(m.o,m.name,'#ff7a6a',m.boss?(m.t=='dragao'?9:7.5):2.3,m.boss?70:18,m.boss?5:2)});
if(typeof espWorld!='undefined')espWorld.forEach(e=>{const o=e.k=='levi'?e.segs[0]:e.m,d=o.position.distanceTo(p);if(d<90){const l=rotulo(o,e.name,'#9ae8ff',e.k=='levi'?5:1.5,e.k=='levi'?7:2.4);l.visible=true}else if(o.lb)o.lb.visible=false})}

/* ---------- espíritos: aura giratória ---------- */
function auras(t){if(typeof espWorld=='undefined')return;espWorld.forEach(e=>{if(e.k=='levi'||!e.m)return;
if(!e.rings){e.rings=[0,1].map(i=>{const r=new THREE.Mesh(new THREE.TorusGeometry(.95+i*.25,.05,6,18),new THREE.MeshBasicMaterial({color:e.m.material.color,transparent:true,opacity:.7}));e.m.add(r);return r})}
e.rings[0].rotation.x=t*1.5;e.rings[0].rotation.y=t;e.rings[1].rotation.y=t*1.2;e.rings[1].rotation.z=t*.8})}

let fl9=performance.now(),fT=0;(function floop(){requestAnimationFrame(floop);const n=performance.now(),dt=Math.min(.05,(n-fl9)/1000);fl9=n;
auras(n/1000);if(!(running&&G&&pl))return;peixeTick(dt);fT+=dt;if(fT>.25){fT=0;rotulos()}})();
const _s10=start;start=function(){_s10();faunaInit();if(!peixes.length)for(let i=0;i<(CFG.lite?25:55);i++)peixeAdd()};
