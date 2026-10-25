import {DeskThing} from '@deskthing/server';
DeskThing.on('start',()=>{DeskThing.sendLog('LaunchThing client integration is installed. Push the staged client and restart the device browser to activate it.');});
