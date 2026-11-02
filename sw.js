// Precaches the whole game so it plays offline; a new build changes VERSION and replaces the cache.
const VERSION='sgp-9b186a972a87',FILES=["./", "index.html", "manifest.webmanifest", "icon.svg", "icon-512.png", "vendor/CopyShader.js", "vendor/EffectComposer.js", "vendor/FXAAShader.js", "vendor/GammaCorrectionShader.js", "vendor/LuminosityHighPassShader.js", "vendor/Reflector.js", "vendor/RenderPass.js", "vendor/ShaderPass.js", "vendor/UnrealBloomPass.js", "vendor/three.min.js", "models/ae86.js", "models/amgone.js", "models/carreragt.js", "models/centenario.js", "models/chiron.js", "models/civic.js", "models/countach.js", "models/defender110.js", "models/defender90.js", "models/f550.js", "models/fordgt.js", "models/gallardo.js", "models/gemera.js", "models/gle63.js", "models/gt40.js", "models/huracan.js", "models/huracansto.js", "models/jesko.js", "models/lada2107.js", "models/mini68.js", "models/miura.js", "models/murcielago.js", "models/murcisv.js", "models/mx5.js", "models/nevera.js", "models/niva.js", "models/p1gtr.js", "models/reventon.js", "models/revuelto.js", "models/roadster.js", "models/slr.js", "models/svj.js", "models/testarossa.js", "models/urus.js", "models/veneno.js", "models/veyron.js", "models/volvo240.js"];
self.addEventListener('install',e=>e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(res=>{
    // fonts and anything else fetched later get cached on first use
    if(res.ok||res.type==='opaque'){const c=res.clone();caches.open(VERSION).then(k=>k.put(e.request,c));}
    return res;
  })));
});
