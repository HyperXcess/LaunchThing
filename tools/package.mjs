import {execFileSync} from 'node:child_process';import {mkdir,readFile,copyFile,rm,cp} from 'node:fs/promises';
const meta=JSON.parse(await readFile('package.json','utf8'));await mkdir('release',{recursive:true});
const folder='release/source';await rm(folder,{recursive:true,force:true});await mkdir(folder,{recursive:true});
const files=execFileSync('git',['ls-files'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
for(const file of files)await cp(file,folder+'/'+file,{recursive:true});
execFileSync('/usr/bin/zip',['-qr','../LaunchThing-source-v'+meta.version+'.zip','.'],{cwd:folder});await rm(folder,{recursive:true,force:true});console.log('Release files are in release/');
