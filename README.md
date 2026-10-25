# LaunchThing

[Download releases](https://github.com/joesanta/LaunchThing/releases) · [Report a problem](https://github.com/joesanta/LaunchThing/issues)

**An all-app dial launcher for DeskThing.** By HyperXcess.

Press the dial to open LaunchThing, turn it to browse all enabled web apps, and press again to launch the selection. It shows app names, neighboring apps, and your position in the list, with wraparound in both directions. Backend-only apps are omitted.

Opening an app closes the optional ControlThing shade; it does not accidentally open that shade. The small button closes the launcher and can continue to open your configured settings view.

LaunchThing is a **client extension**, not an app to import with Upload App. It replaces the client’s wheel selector component while retaining DeskThing’s existing stores and open-app actions. It does not replace firmware, read Spotify tokens, or add a backend process.

## Compatibility

Tested on DeskThing Server **0.11.17**, client **0.11.2**, and a Spotify Car Thing running Thing Labs firmware. The client extension targets the exact 0.11.2 bundle layout; the installer refuses unknown layouts. DeskThing/client updates can replace the extension, so reapply it after a compatible update. No firmware flashing is included.

## Client extension installation (Mac)

Install Node.js 20 or newer. Quit DeskThing while changing its staged client. In this repository, run:

```sh
npm ci
node tools/install-client.mjs --assets "$HOME/Library/Application Support/deskthing/webapp/assets"
```

The installer changes both modern and legacy JavaScript bundles and saves a local backup before writing. It does not modify your calendar feeds or account credentials. Restart DeskThing, open **Clients**, and use **Push staged client**, then **Restart Chromium on the Device**. Keep the Car Thing connected over USB.

If the staged push does not copy the files, the equivalent manual copy is:

```sh
ADB="/Applications/DeskThing.app/Contents/Resources/mac/adb"
"$ADB" devices
# Replace SERIAL below with your Car Thing serial from that list.
"$ADB" -s SERIAL shell 'mount -o remount,rw /'
"$ADB" -s SERIAL push "$HOME/Library/Application Support/deskthing/webapp/assets/index-BoMDv8nD.js" /usr/share/qt-superbird-app/webapp/assets/
"$ADB" -s SERIAL push "$HOME/Library/Application Support/deskthing/webapp/assets/index-legacy-DSl9FxfH.js" /usr/share/qt-superbird-app/webapp/assets/
"$ADB" -s SERIAL shell 'sync; mount -o remount,ro /'
"$ADB" -s SERIAL reverse tcp:8891 tcp:8891
"$ADB" -s SERIAL shell 'supervisorctl restart chromium'
```

### Revert the client extension

Each modified bundle has a project-named `.backup` alongside it. With DeskThing closed, copy the backup over its original bundle and push/restart the device again. A full-bundle restore also removes extensions installed after that backup; reapply the other extensions afterward. Alternatively stage an original 0.11.2 client through DeskThing and push it to restore all client UI behavior. Backend apps and calendar settings are separate from these client bundles.

## Map the dial press

In DeskThing’s editable active mapping profile, keep **Enter / KeyDown → server action `wheel`**. This is the normal dial-press action and opens LaunchThing. Keep your small-button mapping as desired. LaunchThing uses the existing Scroll mapping while its selector is open; confirm your profile still routes dial rotation through DeskThing’s normal wheel controls.

## Build, test, and package

```sh
npm ci
npm test
npm run package
```

The release source ZIP contains the component, installer, tests, and setup guide. No upstream compiled client or personal settings are distributed. Apply the installer to your own compatible DeskThing client. CalThing and ControlThing are optional.

## Limitations

This is an experimental client extension for the tested release, not a generic SDK app. Other client replacements that rewrite the same wheel component may conflict. Only enabled apps with a web interface can be launched.

## License and credit

MIT. Built on DeskThing Client’s MIT-licensed extension points. See `THIRD_PARTY_NOTICES.md`.
