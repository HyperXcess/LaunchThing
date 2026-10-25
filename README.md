# LaunchThing

[Download releases](https://github.com/HyperXcess/LaunchThing/releases) · [Report a problem](https://github.com/HyperXcess/LaunchThing/issues)

**An all-app dial launcher for DeskThing.** By HyperXcess.

Press the dial to open LaunchThing, turn it to browse all enabled web apps, and press again to launch the selection. It shows app names, neighboring apps, and your position in the list, with wraparound in both directions. Backend-only apps are omitted.

Opening an app closes the optional ControlThing shade; it does not accidentally open that shade. The small button closes the launcher and can continue to open your configured settings view.

LaunchThing is a **client extension with an installable DeskThing helper app**. The helper stages the wheel-selector component through DeskThing’s declared post-install mechanism. It retains the existing stores and open-app actions; it does not replace firmware or read Spotify tokens. A minimal utility backend reports the activation instructions and is omitted from the launcher’s app list.

## Install from the DeskThing store

1. Open **Downloads → Add Client/App** in the left sidebar.
2. Add this repository’s GitHub URL as an **App** repository.
3. Refresh/pull the repository, select the app, download it, and initialize it.
4. The declared post-install step backs up and stages the client integration. It does not change account credentials, calendar settings, or firmware. It supports the DeskThing 0.11.2 modern/legacy client bundles and stops before writing if either layout is unsupported.
5. Open **Clients → Push staged client**, then **Restart Chromium on the Device** to activate the client UI changes.

The release includes a separate **`latest.json`** with DeskThing metadata, a version-pinned runtime download URL, embedded icon, size, and SHA-512 checksum. The ZIP named with the lowercase internal app ID is the installable runtime. The capitalized `LaunchThing-source-…zip` archive is for development, not installation.

## Compatibility

Tested on DeskThing Server **0.11.17**, client **0.11.2**, and a Spotify Car Thing running Thing Labs firmware. The client extension targets the exact 0.11.2 bundle layout; the installer refuses unknown layouts. DeskThing/client updates can replace the extension, so reapply it after a compatible update. No firmware flashing is included.

## Manual client extension installation (Mac, optional alternative)

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

The release contains `launchthing-v0.2.0.zip` for DeskThing installation, `latest.json` for store discovery, and a source ZIP with the component, manual installer, tests, and setup guide. No upstream compiled client or personal settings are distributed. Apply the installer to your own compatible DeskThing client. CalThing and ControlThing are optional.

## Limitations

This is an experimental client extension for the tested release, distributed through a DeskThing helper app. Other client replacements that rewrite the same wheel component may conflict. Only enabled apps with a web interface can be launched.

## License and credit

MIT. Built on DeskThing Client’s MIT-licensed extension points. See `THIRD_PARTY_NOTICES.md`.
