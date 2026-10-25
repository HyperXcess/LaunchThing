import {readFile,writeFile,readdir,mkdir,copyFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {transform} from 'esbuild';
const project=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2),get=key=>{const i=args.indexOf(key);return i>=0?args[i+1]:null;};
const assets=get('--assets');if(!assets)throw Error('Specify --assets PATH to the DeskThing webapp/assets folder. See README.');
const specs=[{file:'index-BoMDv8nD.js',start:'fm=()=>',end:'},pm=()=>',boundary:',pm=()=>',root:'children:[!s.onboarding||u.jsx(lm,{})',method:'async handleServerAction(o){',argument:'o',name:'HyperMission',aliases:{REACT:'S',JSX:'u',APPSTORE:'Xe',BUTTONSTORE:'de',WHEELSTORE:'Un',PREFSTORE:'$',SOCKETSTORE:'Re'}},{file:'index-legacy-DSl9FxfH.js',start:'hr=()=>',end:'},mr=()=>',boundary:',mr=()=>',root:'children:[!n.onboarding||m.jsx(rr,{})',method:'async handleServerAction(e){',argument:'e',name:'HyperMissionLegacy',aliases:{REACT:'g',JSX:'m',APPSTORE:'Wt',BUTTONSTORE:'Gt',WHEELSTORE:'Ht',PREFSTORE:'bt',SOCKETSTORE:'tn'}}];
const changes=[];
for(const spec of specs){const path=resolve(assets,spec.file);const original=await readFile(path,'utf8');let source=original;
let template=await readFile(resolve(project,'wheel-component.txt'),'utf8');for(const [key,value] of Object.entries(spec.aliases))template=template.replaceAll(key,value);
const {code}=await transform('var REPLACEMENT='+template,{target:'chrome69',minifyWhitespace:true,minifySyntax:true});const expression=code.trim().replace(/^var REPLACEMENT=/,'').replace(/;$/,'');
const a=source.indexOf(spec.start),b=source.indexOf(spec.end,a);if(a<0||b<0)throw Error('Unsupported client bundle: '+spec.file+' (tested with client 0.11.2 only)');const shade=source.indexOf(','+spec.name+'=',a),stop=shade>=0&&shade<b?shade:b+1;source=source.slice(0,a)+spec.start.split('=')[0]+'='+expression+source.slice(stop);

 await transform(source,{target:'chrome69',loader:'js'});
 changes.push({path,source,original});
}
// Validate every bundle before writing any bundle. Backups are local and never packaged.
for(const item of changes){const backup=item.path+'.'+'launchthing'+'.backup';try{await readFile(backup);}catch{await writeFile(backup,item.original);}await writeFile(item.path,item.source);console.log('Patched',item.path);}
console.log('Now push the staged client from DeskThing, then restart the device browser. See README for USB copy instructions.');
