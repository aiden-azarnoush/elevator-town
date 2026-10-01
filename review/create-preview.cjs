const fs=require('node:fs');const path=require('node:path');
let html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const controls=`<div id="qaToolbar" style="position:fixed;bottom:8px;left:8px;z-index:9999;display:flex;gap:6px;background:white;padding:6px;border-radius:12px"><button id="qaCab">Test airport cab</button><button id="qaGate">Test gate</button><button id="qaGas">Test paid car</button><button id="qaHide">Hide test controls</button></div>
<script>
function qaAir(){startTrip();tpDressDone();tpPick(TP_WORLD[0]);TP.have.ticket=TP.have.bag=true;tpStage('gate');TP.target=null;}
document.getElementById('qaCab').onclick=()=>{qaAir();TP.x=0;TP.z=-3.8;TP.y=0;TP.lv=0;TP.el.lv=0;TP.el.y=0;TP.el.door=1;TP.el.hold=10;TP.camPos.set(0,5.6,3);TP.camLook.set(0,1.8,-4);};
document.getElementById('qaGate').onclick=()=>{qaAir();const Z=TP.levels[2].zones.find(z=>z.ok);TP.x=Z.x;TP.z=Z.z+4;TP.y=14;TP.lv=2;TP.camPos.set(TP.x,20,TP.z+10);TP.camLook.set(TP.x,16,TP.z-4);};
document.getElementById('qaGas').onclick=()=>{document.querySelectorAll('#tripUI,#chefUI,#rpsUI,#washUI').forEach(e=>e.hidden=true);startGas();gsStart(0);GS.path=null;GS.car.g.position.set(gsStopX(),0,0);GS.car.g.rotation.y=0;gsAfterPay();GS.pDone();GS.pDone=null;GS.pPath=null;};
document.getElementById('qaHide').onclick=()=>document.getElementById('qaToolbar').hidden=true;
</script>`;
const toolbar = controls.slice(0, controls.indexOf('<script>')); const logic = controls.slice(controls.indexOf('<script>') + 8, controls.lastIndexOf('</script>'));
html=html.replace('<head>','<head><base href="/">').replace('<script src=',toolbar+'<script src=').replace('})();\n</script>', logic+'\n})();\n</script>');
fs.writeFileSync(path.join(__dirname,'interaction-preview.html'),html);
