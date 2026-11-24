'use strict';
/* Sons de ataques, animais, NPCs e monstros (gerados no aparelho). Carregado depois de menu.js. */
const sOK=()=>typeof AX!='undefined'&&AX&&ac&&ac.state=='running'&&CFG.vol>0&&bus.sfx;
function sTone(f,d,type,g,dest,f2){const t=ac.currentTime,o=ac.createOscillator(),e=ac.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);e.gain.setValueAtTime(g,t);e.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(e);e.connect(dest);o.start(t);o.stop(t+d+.05)}
function sNoise(d,f,g,dest,type){const t=ac.currentTime,s=ac.createBufferSource(),fl=ac.createBiquadFilter(),e=ac.createGain();s.buffer=NB;fl.type=type||'bandpass';fl.frequency.value=f;e.gain.setValueAtTime(g,t);e.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(e);e.connect(dest);s.start(t,Math.random(),d+.05)}
const vg=o=>Math.pow(Math.max(0,1-o.position.distanceTo(pl.position)/34),2);
function sndSwing(){if(!sOK())return;sNoise(.14,1400,.35,bus.sfx)}
function sndHit(){if(!sOK())return;sTone(110,.12,'square',.5,bus.sfx,50);sNoise(.08,500,.4,bus.sfx)}
function sndHurtP(){if(!sOK())return;sTone(220,.25,'sawtooth',.35,bus.sfx,90)}
function voiceNPC(g){if(!sOK())return;const base=g=='f'?230:120;for(let i=0;i<3;i++)setTimeout(()=>{if(!sOK())return;const f=base*(1+Math.random()*.35);sTone(f,.11,'sawtooth',.12,bus.sfx);sTone(f*1.5,.11,'triangle',.06,bus.sfx)},i*130)}
const ANI={
porco:v=>{sTone(160,.18,'sawtooth',.3*v,bus.amb,100);setTimeout(()=>sOK()&&sTone(150,.15,'sawtooth',.25*v,bus.amb,95),220)},
cavalo:v=>sTone(700,.6,'sawtooth',.25*v,bus.amb,260),
sapo:v=>{sTone(380,.07,'square',.2*v,bus.amb);setTimeout(()=>sOK()&&sTone(430,.07,'square',.2*v,bus.amb),110)},
lobo:v=>sTone(420,1.4,'sine',.3*v,bus.amb,640),
cobra:v=>sNoise(.6,6000,.3*v,bus.amb,'highpass'),
coelho:v=>sTone(1500,.05,'sine',.12*v,bus.amb),
cervo:v=>sTone(300,.4,'triangle',.15*v,bus.amb,220)};
function sndGrowl(a){if(!sOK())return;const v=Math.max(.3,vg(a));if(a.t=='cobra')ANI.cobra(v);else sTone(130,.35,'sawtooth',.35*v,bus.sfx,70)}
function sndBite(a){if(!sOK())return;sNoise(.1,900,.35,bus.sfx)}
function sndMon(m){if(!sOK())return;const v=Math.max(.35,vg(m.o));
if(m.t=='goblin'){[0,1,2].forEach(i=>setTimeout(()=>sOK()&&sTone(520+i*90,.08,'square',.2*v,bus.sfx),i*90))}
else if(m.t=='golem'){sTone(55,.6,'sawtooth',.5*v,bus.sfx,35);sNoise(.4,200,.4*v,bus.sfx,'lowpass')}
else{sTone(95,1,'sawtooth',.5*v,bus.sfx,45);sNoise(.9,500,.35*v,bus.sfx)}}
setInterval(()=>{if(!(running&&G&&pl&&sOK()))return;const night=Math.sin(G.t*TAU-Math.PI/2)<-.15;
animals.forEach(a=>{if(a.position.distanceTo(pl.position)>32)return;const f=ANI[a.t];if(!f)return;if(Math.random()<(a.t=='lobo'?(night?.18:.03):.05))f(vg(a))});
npcs.forEach(n=>{if(n.visible===false||n.position.distanceTo(pl.position)>12)return;if(Math.random()<.03)voiceNPC(n.g)});
MONS.forEach(m=>{if(m.o.position.distanceTo(pl.position)<m.ag&&Math.random()<.12)sndMon(m)})},900);
