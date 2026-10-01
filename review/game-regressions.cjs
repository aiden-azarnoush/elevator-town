const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const nativePath = path.resolve(__dirname, '../../AzarPlayground/AzarPlayground/AzarPlayground/Web');
const native = fs.readFileSync(path.join(nativePath, 'index.html'), 'utf8');
const scripts = h => [...h.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m => m[1]).filter(Boolean);
for (const h of [html, native]) for (const js of scripts(h)) new vm.Script(js);
assert.deepEqual(scripts(html), scripts(native), 'web and app gameplay must match');
function section(start, end) { return html.slice(html.indexOf(start), html.indexOf(end, html.indexOf(start))); }
function fn(name, next) { return section('function '+name+'(', 'function '+next+'('); }
const driveCode = section('  // the car follows its road', '  // walking\n');
const drive = new Function('GS','c','dt','t','gsEngine','pl','SFX','$','gsWalk','cmConfettiAt','setTimeout','innerWidth','innerHeight', driveCode);
let completed = 0;
function tick(gs, dt) { drive(gs, gs.car, dt, 1, ()=>{}, {g:{visible:false,position:{set(){}},rotation:{}}}, {yay(){},door(){}}, ()=>({textContent:''}), ()=>{}, ()=>{}, ()=>{}, 1280,720); }
// Regression: a car already 0.045 units from its final waypoint used to freeze permanently.
const c = {g:{position:{x:59.955,y:0,z:12.3},rotation:{y:0}},mini:{g:{visible:true}},half:2,bw:1};
const gs = {car:c,step:'leave',path:[{x:60,z:12.3}],v:0,stars:0};
tick(gs, 1/60); assert.equal(gs.step,'done'); assert.equal(gs.stars,1); completed++;
// Every arrival and exit route must terminate across slow/fast frame rates and vehicle lengths.
for (const half of [2,2.3,2.8,3.4,4.2]) for (const dt of [1/120,1/60,.05]) {
  const car={g:{position:{x:1.7+half*.5,y:0,z:0},rotation:{y:0}},mini:{g:{visible:true}},half,bw:1};
  const x0=car.g.position.x, state={car,step:'leave',v:0,stars:0,path:[{x:x0+8,z:0},{x:12,z:6},{x:15,z:12.3},{x:60,z:12.3}]};
  for(let i=0;i<5000 && state.step!=='done';i++) tick(state,dt);
  assert.equal(state.step,'done'); assert.equal(car.g.position.x,60); assert.equal(state.stars,1); completed++;
}
// Reset exactly the tapped dish; keep other cooking slots and guest orders.
const spot={x:1,dirt:0}, old={kind:'egg',spot,g:{old:true},icon:{oldIcon:true},cook:1,sauce:'red'};spot.item=old;
const untouched={item:{kind:'rice'}}, order={food:'egg',sauce:'soy'}, removed=[], added=[];
const CF={spots:[spot,untouched],seats:[{order}],scene:{remove:x=>removed.push(x),add:x=>added.push(x)},chef:{}};
const fresh={kind:'egg',cook:0,sauce:null,g:{position:{set(){}}}};
const context={CF,CF_GY:1.27,cfMakeFood:()=>fresh,cfSprite:()=>({}),cfIconTex:()=>({}),cfChefAnim(){},cfSetTool(){},tone(){},cfSyncUI(){}};
vm.runInNewContext(fn('cfRestartDish','cfChefAnim')+'cfRestartDish(CF.spots[0].item);',context);
assert.equal(spot.item,fresh);assert.equal(fresh.spot,spot);assert.equal(old.spot,null);assert.equal(untouched.item.kind,'rice');assert.equal(CF.seats[0].order,order);assert.deepEqual(removed,[old.g,old.icon]);completed++;
// Calling the redo function on an already removed dish is harmless.
vm.runInNewContext(fn('cfRestartDish','cfChefAnim')+'cfRestartDish(old);',{...context,old});assert.equal(spot.item,fresh);completed++;
// Elevator selection is possible only inside an idle cab, then targets the chosen floor.
const TP={in:true,ride:null,lv:0,target:{},el:{target:null,hold:4}};
vm.runInNewContext(fn('tpFloor','tpCall')+'tpFloor(2);',{TP,audio(){},tone(){}});
assert.equal(TP.el.target,2);assert.equal(TP.ride.l,2);assert.equal(TP.target,null);completed++;
const noCab={in:false,ride:null,lv:0,el:{target:null}};
vm.runInNewContext(fn('tpFloor','tpCall')+'tpFloor(2);',{TP:noCab,audio(){},tone(){}});assert.equal(noCab.el.target,null);completed++;
const THREE=require(path.join(nativePath,'three.min.js'));
// Build real escalator geometry and verify the inclined rails meet the horizontal landings.
const lo={g:new THREE.Group()};const material=new THREE.MeshBasicMaterial();
const mats={truss:material,steel:material,rail:material,tread:material,riser:material,comb:material};
const ctx={THREE,GLASS:material,tpEscMats:()=>mats,boxGeo:(w,h,d)=>new THREE.BoxGeometry(w,h,d),mesh:(geo,mat,parent,x,y,z)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);parent.add(m);return m;},lo};
vm.runInNewContext(fn('tpEscLane','tpBuildEsc')+'result=tpEscLane(lo,0,true);',ctx);
assert.equal(ctx.result.steps.length,28);const rail=ctx.result.g.children[4];assert.ok(rail.geometry);
assert.ok(html.includes("const show = false;"));assert.ok(html.includes('TP.floorKeys.map(q => q.panel)'));completed++;
const files=fs.readdirSync(path.join(__dirname,'../audio')).filter(f=>f.endsWith('.m4a'));assert.equal(files.length,12);
for(const file of files) assert.equal(fs.readFileSync(path.join(__dirname,'../audio',file)).compare(fs.readFileSync(path.join(nativePath,'audio',file))),0);completed++;
// Recorded music must pause on mute, choose a different track next, and fall back safely on media failure.
class FakeAudio { constructor(){this.paused=true;this.listeners={};this.src='';} addEventListener(k,f){this.listeners[k]=f;} pause(){this.paused=true;} play(){this.paused=false;return Promise.resolve();} }
const doc={createElement:()=>new FakeAudio(),body:{appendChild(){}}};
const music=section('const BG_TRACKS =', 'function updateMusic()');
const musicCtx={document:doc,Math};vm.createContext(musicCtx);vm.runInContext(music+`recordedMusic(true,'trip',1); const first=BACKGROUND.player.src; nextBackground(); if(first===BACKGROUND.player.src) throw new Error('Immediate repeat'); recordedMusic(false); if(!BACKGROUND.player.paused) throw new Error('Mute did not pause'); BACKGROUND.player.listeners.error(); if(recordedMusic(true,'trip',1)!==false) throw new Error('No fallback');`,musicCtx);completed++;
for(const file of ['happy-loop.mp3','happy-adventure.mp3','happy-lullaby.mp3']) assert.equal(fs.readFileSync(path.join(__dirname,'../audio',file)).compare(fs.readFileSync(path.join(nativePath,'audio',file))),0);completed++;
console.log(`${completed} checks passed: script syntax, app parity, car departure, dish redo, physical elevator controls, escalator geometry, and bundled music.`);
