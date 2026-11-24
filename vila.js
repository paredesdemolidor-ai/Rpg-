'use strict';
/* Vila: postes de luz, janelas acesas à noite e luz nas vilas. */
const lampMat=new THREE.MeshBasicMaterial({color:0x554422}),vLights=[];
function poste(x,z,luz){const g=new THREE.Group(),p=M(new THREE.CylinderGeometry(.08,.11,3.2,6),'#3a2a1a');p.position.y=1.6;const l=new THREE.Mesh(new THREE.SphereGeometry(.28,8,8),lampMat);l.position.y=3.35;g.add(p,l);
g.position.set(x,gy(x,z),z);g.traverse(m=>m.castShadow=false);scene.add(g);
if(luz){const pl2=new THREE.PointLight(0xffc070,0,34);pl2.position.set(x,gy(x,z)+3.6,z);scene.add(pl2);vLights.push(pl2)}}
for(let i=0;i<8;i++){const a=i/8*TAU+.2;poste(Math.cos(a)*10,Math.sin(a)*10,i%2==0)}
if(typeof ELF!='undefined'){poste(ELF.x,ELF.z-4,true);poste(ELF.x+7,ELF.z+5,false);poste(ELF.x-7,ELF.z+5,false)}
function luzVila(){if(!(running&&G))return;const night=1-Math.max(0,Math.min(1,Math.sin(G.t*TAU-Math.PI/2)*2+.3));
vLights.forEach(l=>l.intensity=night*1.5);lampMat.color.setRGB(.33+.67*night,.27+.5*night,.13+.2*night);WINMAT.color.setRGB(.17+.83*night,.14+.6*night,.06+.22*night)}
setInterval(luzVila,400);
