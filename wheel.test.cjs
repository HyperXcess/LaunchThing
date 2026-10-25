const fs=require('fs'),assert=require('node:assert/strict');
const template=fs.readFileSync(__dirname+'/wheel-component.txt','utf8');
let rotation=0,ref={current:null},handler,opened=[],shadeEvents=[];
const apps=Array.from({length:15},(_,i)=>({name:'app'+i,enabled:true,manifest:{label:'App '+i}}));
const R={useMemo:f=>f(),useRef:()=>ref,useEffect:f=>f()};
const J={jsx:(tag,props)=>({tag,props}),jsxs:(tag,props)=>({tag,props})};
const AS=f=>f({apps});const BS=f=>f({executeAction:action=>opened.push(action.value)});const WS=f=>f({wheelRotation:rotation,setWheelState:()=>{}});const PS={getState:()=>({preferences:{currentView:{name:'app0'}}})};
global.CustomEvent=class{constructor(type,options){this.type=type;this.detail=options.detail}};
global.window={dispatchEvent:event=>shadeEvents.push(event.detail),addEventListener:(type,fn,capture)=>{assert.equal(capture,true);handler=fn},removeEventListener:()=>{}};
const component=new Function('REACT','JSX','APPSTORE','BUTTONSTORE','WHEELSTORE','PREFSTORE','return ('+template+')')(R,J,AS,BS,WS,PS);
for(rotation=0;rotation<15;rotation++){component();handler({key:'Enter',preventDefault(){},stopImmediatePropagation(){}})}
assert.deepEqual(opened,apps.map(a=>a.name));rotation=-1;component();handler({key:'Enter',preventDefault(){},stopImmediatePropagation(){}});assert.equal(opened.at(-1),'app14');
assert.ok(shadeEvents.length>0&&shadeEvents.every(value=>value==='hide'));
console.log('Passed: every enabled app reachable, Enter opens the selection, negative rotation wraps.');
