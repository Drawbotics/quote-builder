<img src="assets/icons/icon.png" width=200 />

# Quote Builder
Also known as Quote De Porc, it's an `electron` app to build client price offers (quotes). Targets Mac OS, since everyone here uses Macs. See the [data](docs/data.md) doc to learn about the app more in detail.

### Installation (for an end user)
**NOTE** This process is also documented in more detail in the [Notion document](https://www.notion.so/drawbotics/Quote-de-Porc-de54dd0780f04f2db5c6762f3b8d787b) about Quote De Porc.
1. Go to the "releases" page and download the `QuoteDP-mac.zip` file.
2. Unzip the file and you should find the `QuoteDP` app in the folder; copy this app to your `Applications` directory.
3. (Not blocking but crucial for auto-updates) Open the Terminal and run the following command `sudo chown root /Applications/QuoteDP.app`. This command sets the application permissions to the root user. If we don't do this, when the app will restart to install a new version, the old version will open by default (since it was not able to replace the previous one). Thus, the updating process will repeat undefinitely. See [this issue](https://github.com/electron-userland/electron-builder/issues/2317) for updates/solutions on this.
4. Fire up the app
5. (later) While using the app, you might get a notification that a new version is available. Before that happens, the system will ask you for your password since the update will replace the app file in the Application directory.

### To develop
To get started with developing it's very straightforward. Before anything, clone the repo.
You will find a `.env.template` file, which you need to duplicate and rename to `.env`. The following env vars are necessary:
- `WEBPACK_PORT`: up to you
- `APP_ENV`: should be `development`
- `CERTIFICATE_IDENTITY`: used for packaging and publishing, see [here](# to build for production) for more info about it.

```
npm install
```
Then
```
npm run webpack-server
```
To run the development server. In a separate process, run
```
npm start
```
To begin the electron app. If the `npm start` command starts electron before the dev server, CMD+r to refresh the page and load the bundle. Reloading only works in development, which is why it is disabled in production.

### To build for production
We need to generate the bundles in the `dist` folder and the final packaged app in the `builds` folder. This is all taken care of with the command:
```
npm run package
```
**NOTE** Here you need to have the `CERTIFICATE_IDENTITY` env var set to sign the application. Signing is necessary to have the automatic updates. See [here](docs/signing-certificates.md) how to generate your own signing certificate on your computer. We can use the Mac Developer certificate (used to distribute development builds) as a signing certificate since we're not distributing our app through the App Store.

A free (i.e. not registered to the Apple Developer Program) certificate for Mac apps should have this format: `Mac Developer: [apple_id] ([certificate_id])` where `certificate_id` is a 10 character sequence of capital letters and numbers. This is the value you should assign to `CERTIFICATE_IDENTITY`.

This step will generate the following things in the `builds`:
- `QuoteDP-darwin-x64`: is the folder containing the packaged .app (this is what's being signed)
- `QuoteDP.dmg`: the installer for the app. We don't currently use this but it's being generated just in case.
- `QuoteDP-mac.zip`: this is the file that will be added to the Github release, and which will be used to get new updates automatically


### To publish
To publish a new version of this app follow these steps:
0. Before building the app as described above, you should have bumped the version in the `package.json`. This is important as it's through the package versions that we know if a new update is available
1. Create a new tag with `git tag v[new-version]` which should follow the `version` value in the `package.json` e.g. `v1.2.3`.
2. Push tags with `git push --tags`
3. Go on Github and in the "relases" page click on "Draft a new release"
4. For the tag version choose the tag you just pushed
5. The release title should follow the tag version without the `v`, e.g. `1.2.3`. In the description put any new significant feature/bug fix that should be documented
6. Upload the `QuoteDP-mac.zip` generated during the last build (this is downloaded when the app detects a new version)
