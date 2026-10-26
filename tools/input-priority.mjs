export function priorityEdits(spec){const modern=spec.file==='index-BoMDv8nD.js',pref=modern?'$':'bt',wheel=modern?'Un':'Ht',x=modern?'o':'e';
 const guard=modern?'updatePreferences:s=>l(c=>{':'updatePreferences:t=>e((e=>{',arg=modern?'s':'t',state=modern?'c':'e';
 const insert=`/*launch-priority*/if(${arg}.currentView&&${arg}.currentView.name!==${state}.preferences.currentView.name){window.__launchNativeTrayOpen=false;${arg}={...${arg},appTrayState:"hidden"};}else if(${arg}.appTrayState&&${arg}.appTrayState!=="hidden"&&!window.__launchNativeTrayPermit){${arg}={...${arg},appTrayState:"hidden"};}if(${arg}.appTrayState==="hidden")window.__launchNativeTrayOpen=false;`;
 const action=`/*native-switcher*/if(${x}.id==="native-switcher"){window.__launchNativeTrayOpen=!window.__launchNativeTrayOpen;${wheel}.getState().setWheelState(false);window.dispatchEvent(new CustomEvent("hyper-mission",{detail:"hide"}));window.__launchNativeTrayPermit=true;try{${pref}.getState().updatePreferences({appTrayState:window.__launchNativeTrayOpen?"peek":"hidden"});}finally{window.__launchNativeTrayPermit=false;}return;}`;
 const tray=modern?'u.jsxs("div",{className:"".concat(l===le.PEEK?"h-36"':'m.jsxs("div",{className:`${t===et.PEEK?"h-36"';
 return [
 {anchor:modern?'setTimeout(()=>{c({appTrayState:le.PEEK})},200)':'setTimeout((()=>{a({appTrayState:et.PEEK})}),200)',replacement:'/*no-auto-native-tray*/void 0',marker:'/*no-auto-native-tray*/'},
 {anchor:modern?'updateCurrentView:s=>{':'updateCurrentView:n=>{',replacement:(modern?'updateCurrentView:s=>{':'updateCurrentView:n=>{')+'/*launch-view-change*/window.__launchNativeTrayOpen=false;'+pref+'.getState().updatePreferences({appTrayState:"hidden"});',marker:'/*launch-view-change*/'},
 {anchor:guard,replacement:guard+insert,marker:'/*launch-priority*/'},
 {anchor:spec.method,replacement:spec.method+action,marker:'/*native-switcher*/'},
 {anchor:modern?'appTrayState:le.PEEK,theme:':'appTrayState:et.PEEK,theme:',replacement:modern?'appTrayState:le.HIDDEN,theme:':'appTrayState:et.HIDDEN,theme:',marker:modern?'appTrayState:le.HIDDEN,theme:':'appTrayState:et.HIDDEN,theme:'},
 {anchor:tray,replacement:tray.replace('{className:', '{style:{display:window.__launchNativeTrayOpen?"flex":"none"},className:'),marker:'display:window.__launchNativeTrayOpen?"flex":"none"'}];
}
export function patchPriority(source,edits){if(!source.includes('miniplayer:{state:'))return source;
// Upgrade earlier local patches, rather than silently keeping the permissive guard.
source=source.replace(/(appTrayState!=="hidden"&&!)window\.__launchNativeTrayOpen/g,'$1window.__launchNativeTrayPermit');
if(!source.includes('window.__launchNativeTrayPermit=true;try{'))source=source.replace(/([\$a-zA-Z]+)\.getState\(\)\.updatePreferences\(\{appTrayState:window\.__launchNativeTrayOpen\?"peek":"hidden"\}\);return;/,'window.__launchNativeTrayPermit=true;try{$1.getState().updatePreferences({appTrayState:window.__launchNativeTrayOpen?"peek":"hidden"});}finally{window.__launchNativeTrayPermit=false;}return;');
const preference=edits.find(e=>e.marker==='/*launch-priority*/');if(source.includes(preference.marker))source=source.replace(/\/\*launch-priority\*\/[\s\S]*?(?=var )/,()=>preference.replacement.slice(preference.anchor.length));for(const edit of edits){if(source.includes(edit.marker))continue;if(!source.includes(edit.anchor))throw Error('Unsupported launcher input layout; no files changed.');source=source.replace(edit.anchor,edit.replacement)}return source;}
