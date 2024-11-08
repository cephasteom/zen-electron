(function(){"use strict";self.addEventListener("message",t=>{const{endpoint:s,key:a}=t.data;fetch(s).then(e=>e.json()).then(e=>{self.postMessage({key:a,data:e,message:"Data received. Key: "+a})}).catch(e=>self.postMessage({message:"Data unavailable from "+s+`
`}))})})();
