'use strict';
/* Combate: combos, recarga, recuo, mão secundária, defesa, números de dano e resgate (médico, cavaleiros e mago) ao cair. */
let atkT=0,atkN=0,atkLast=0,blocking=false,resc=0,rescList=[],rescFx=[];
Object.assign(WEAPONS,{machado:{n:'Machado',d:10,aff:'forca',cd:.5,rng:3},picareta:{n:'Picareta',d:7,aff:'forca',cd:.5,rng:3},adaga:{n:'Adaga',d:6,aff:'espada',cd:.25,rng:2.4}});
Object.assign(WEAPONS.punho,{cd:.28,rng:2.3});Object.assign(WEAPONS.espada,{cd:.38,rng:3});Object.assign(WEAPONS.lanca,{cd:.55,rng:4.2});Object.assign(WEAPONS.arco,{cd:.7,rng:24});
Object.assign(WEAPONS['Espada de escama'],{cd:.4,rng:3.2});Object.assign(WEAPONS['Maça do golem'],{cd:.75,rng:3.1});Object.assign(WEAPONS.Tridente,{cd:.5,rng:4});
const frozenNow=()=>resc>0;

/* ---------- números de dano ---------- */
const floaters=[];
function dmgNum(o,d){const c=document.createElement('canvas');c.width=128;c.height=64;const x=c.getContext('2d');x.font='bold 40px Georgia';x.textAlign='center';x.lineWidth=6;x.strokeStyle='#000';x.fillStyle=d>25?'#ffd24a':'#fff';
x.strokeText(Math.round(d),64,44);x.fillText(Math.round(d),64,44);
const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false}));s.scale.set(1.4,.7,1);s.position.copy(o.position);s.position.y+=2.2;s.life=.8;scene.add(s);floaters.push(s)}

/* ---------- ataque ---------- */
const knock=(o,fw,k)=>{o.position.x+=fw.x*k;o.position.z+=fw.z*k};
function swing(left){const a=left?pl.u.aL:pl.u.aR;a.rotation.x=-1.6;setTimeout(()=>{a.rotation.x=0},170);if(typeof vmKick=='function')vmKick(left);if(typeof sndSwing=='function')sndSwing()}
function strike(d,rng,cone,kb){const fw=new THREE.Vector3(Math.sin(G.yaw),0,Math.cos(G.yaw));let hit=false;
const inC=o=>{const v=o.position.clone().sub(pl.position).setY(0),l=v.length(),r=o.r||0;return l<rng+r&&(l<r+1||v.normalize().dot(fw)>cone)};
animals.slice().forEach(a=>{if(!inC(a))return;hit=true;a.hp-=d;a.mad=1;knock(a,fw,kb);dmgNum(a,d);
if(a.hp<=0){add('Carne',1);add('Pele',1);scene.remove(a);animals=animals.filter(x=>x!==a);if(a.t=='lobo')G.quest='Lobo abatido! Converse com os aldeões.';if(typeof faunaDied=='function')faunaDied(a)}});
npcs.slice().forEach(n=>{if(n.visible===false||!inC(n))return;hit=true;n.hp-=d;n.mad=20;knock(n,fw,kb);dmgNum(n,d);
if(n.hp<=0){scene.remove(n);npcs=npcs.filter(x=>x!==n);const w=npcs.some(o=>o.position.distanceTo(n.position)<25);G.rep-=w?30:10;if(w){G.wanted=1;say('Testemunhas! Guardas irão te prender.')}else say('Ninguém viu...')}
else if(!G.wanted){G.rep-=3;G.wanted=G.rep<-20?1:0}});
MONS.slice().forEach(m=>{const o={position:m.o.position,r:m.r};if(!inC(o))return;hit=true;knock(m.o,fw,m.boss?kb*.15:kb);dmgNum(m.o,d);monDmg(m,d)});
if(hit&&typeof sndHit=='function')sndHit()}
atk=function(){if(!G||!running||resc>0||atkT>0||blocking)return;const w=WEAPONS[G.eq.w]||WEAPONS.punho,cost=(G.eq.w=='machado'||G.eq.w=='Maça do golem')?7:5;if(G.st<cost)return;G.st-=cost;
const now=performance.now();atkN=(now-atkLast<900)?(atkN%3)+1:1;atkLast=now;atkT=w.cd||.4;
const big=atkN==3,d=(w.d+G.aff.forca*.4+(G.aff[w.aff||'punho']||0)*.3)*(big?1.6:1)*(G.titan?4:1);aff(w.aff||'punho',.2);
swing(false);strike(d,w.rng||3,G.eq.w=='arco'?.97:.3,big?2.6:1.1);
const off=G.eq.off&&WEAPONS[G.eq.off];
if(off)setTimeout(()=>{if(running&&resc<=0){swing(true);strike((off.d+G.aff.forca*.3)*.7,off.rng||2.6,.3,.6)}},150)};

/* ---------- defesa e dano recebido ---------- */
const _hurt=hurt;hurt=function(d,part){if(resc>0)return;
if(G.eq.off=='escudo'){if(blocking&&G.st>3){G.st-=d*.8;d*=.2;if(typeof sndHit=='function')sndHit()}else d*=.85}
if(typeof sndHurtP=='function')sndHurtP();_hurt(d,part)};
const bd=$('bD');['pointerdown'].forEach(e=>bd.addEventListener(e,()=>{blocking=true}));['pointerup','pointerleave','pointercancel'].forEach(e=>bd.addEventListener(e,()=>{blocking=false}));

/* ---------- resgate ao cair ---------- */
const fade=document.createElement('div');fade.id='fade';document.body.appendChild(fade);
const hostiles=()=>{const r=[];animals.forEach(a=>{const S=typeof SPECIES!='undefined'&&SPECIES[a.t];if((S&&S.h)||a.t=='lobo')r.push({o:a,k:'a'})});MONS.forEach(m=>{if(!m.boss)r.push({o:m.o,k:'m',m})});return r};
const slay=h=>{scene.remove(h.o);if(h.k=='a'){animals=animals.filter(x=>x!==h.o);if(typeof faunaDied=='function')faunaDied(h.o)}else MONS.splice(MONS.indexOf(h.m),1)};
function fireFx(pos,col){const f=new THREE.Mesh(new THREE.SphereGeometry(1,8,8),new THREE.MeshBasicMaterial({color:col||0xff7a1a,transparent:true,opacity:.7}));f.position.copy(pos);f.position.y+=1;f.life=.35;scene.add(f);rescFx.push(f);if(typeof beep=='function')beep(300,.15,'sawtooth')}
function rescue(){if(resc>0)return;resc=7;G.hp=Math.max(G.hp,1);input.x=input.y=0;pl.rotation.x=-1.45;fade.style.opacity=.85;say('Você desmaiou...',4000);
const p=pl.position,mk=(cloth,w,o)=>{const n=person({cloth,hair:'#322',skin:'#e0b090',h:1.03});const x=p.x+o[0],z=p.z+o[1];n.position.set(x,gy(x,z),z);if(w)n.u.hold.add(weaponMesh(w));scene.add(n);return n};
rescList=[{n:mk('#8a8a92','espada',[22,10]),t:'k'},{n:mk('#8a8a92','lanca',[-20,14]),t:'k'},{n:mk('#6a2a9a',null,[16,-22]),t:'m'},{n:mk('#f4f4f4',null,[-14,-18]),t:'d'}]}
function rescueEnd(){const boss=MONS.find(m=>m.boss&&m.o.position.distanceTo(pl.position)<60);
if(boss){pl.position.set(0,gy(0,10)+1,10);say('O médico te carregou para a vila.',5000)}else say('O médico e os cavaleiros salvaram você.',5000);
G.hp=60;G.food=Math.max(G.food,50);G.water=Math.max(G.water,50);G.temp=Math.max(G.temp,36);G.sick=0;G.bleed=0;Object.keys(G.parts).forEach(k=>G.parts[k]=0);G.st=Math.max(G.st,40);
pl.rotation.x=0;fade.style.opacity=0;rescList.forEach(r=>scene.remove(r.n));rescList=[]}
function rescTick(dt){if(resc<=0)return;resc-=dt;G.hp=Math.max(G.hp,1);input.x=input.y=0;const p=pl.position,H=hostiles().filter(h=>h.o.position.distanceTo(p)<50);
rescList.forEach(r=>{const n=r.n;let tgt=p,stop=2.2;
if(r.t!='d'){let best=null,bd2=1e9;H.forEach(h=>{if(!h.o.parent)return;const d=h.o.position.distanceTo(n.position);if(d<bd2){bd2=d;best=h}});if(best){tgt=best.o.position;stop=r.t=='m'?12:2.2;r.cur=best}else r.cur=null}
const v=tgt.clone().sub(n.position).setY(0),d=v.length();
if(d>stop){v.normalize();n.position.addScaledVector(v,9*dt);n.rotation.y=Math.atan2(v.x,v.z);n.u.lL.rotation.x=Math.sin(performance.now()/90)*.8;n.u.lR.rotation.x=-n.u.lL.rotation.x}
else if(r.cur&&r.cur.o.parent){r.cd=(r.cd||0)-dt;if(r.cd<=0){r.cd=r.t=='m'?1.1:.7;n.u.aR.rotation.x=-1.6;setTimeout(()=>{n.u.aR.rotation.x=0},160);fireFx(r.cur.o.position,r.t=='m'?0xb06aff:0xff7a1a);slay(r.cur);r.cur=null}}
n.position.y=gy(n.position.x,n.position.z);wallPush(n.position,.4)});
if(resc<=0)rescueEnd()}

let cl9=performance.now();(function cloop(){requestAnimationFrame(cloop);const n=performance.now(),dt=Math.min(.05,(n-cl9)/1000);cl9=n;
atkT=Math.max(0,atkT-dt);
for(let i=floaters.length-1;i>=0;i--){const s=floaters[i];s.position.y+=dt*1.5;s.life-=dt;s.material.opacity=Math.min(1,s.life*2);if(s.life<=0){scene.remove(s);floaters.splice(i,1)}}
for(let i=rescFx.length-1;i>=0;i--){const f=rescFx[i];f.life-=dt;f.scale.setScalar(1+(.35-f.life)*5);f.material.opacity=Math.max(0,f.life*2);if(f.life<=0){scene.remove(f);rescFx.splice(i,1)}}
if(running&&G&&pl){if(resc>0)rescTick(dt);else if(fade.style.opacity!='0')fade.style.opacity=0}})();
