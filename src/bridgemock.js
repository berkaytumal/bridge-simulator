const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var deviceid = urlParams.get('id')

console.log("INJEXTED")
const { BridgeMock, createDefaultBridgeMockConfig } = require('@bridgelauncher/api-mock');
window.BridgeMock = BridgeMock
window.createDefaultBridgeMockConfig = createDefaultBridgeMockConfig
var config = new createDefaultBridgeMockConfig()
config.logWallpaperEvents = true
config.appsUrl = "./mock/apps.json"
if (!window.Bridge) window.Bridge = new BridgeMock(config);
const backupThese = ["sendWallpaperTap", "showToast", "requestChangeSystemWallpaper", "setWallpaperOffsets", "requestSetDrawSystemWallpaperBehindWebViewEnabled", "requestSetBridgeButtonVisibility", "requestOpenBridgeSettings"]
backupThese.forEach(funcname => {
    Bridge[funcname + "backup"] = Bridge[funcname]
});
function gel_da(params) {

}

var deviceid
var newFunc = {
    sendWallpaperTap: function (x, y) {
        //  console.log(deviceid)
        Bridge["sendWallpaperTap" + "backup"](x, y)

        window.parent.postMessage({ message: ["bridgecommand", "sendWallpaperTap"], iframe: deviceid, pos: [x, y] }, '*');
        // console.log(`${this._prefix} sendWallpaperTap: x = ${x}, y = ${y}`);
    },
    showToast: function (message, long) {
        //  console.log(deviceid)
        Bridge["showToast" + "backup"](message, long)
        window.parent.postMessage({ message: ["bridgecommand", "showToast"], iframe: deviceid, input: { message: message, long: long } }, '*');
        // console.log(`${this._prefix} sendWallpaperTap: x = ${x}, y = ${y}`);
    },
    requestChangeSystemWallpaper: function () {
        console.log("[BridgeMock] requestChangeSystemWallpaper")
        window.parent.postMessage({ message: ["bridgecommand", "requestChangeSystemWallpaper"], iframe: deviceid }, '*');
    },
    setWallpaperOffsets: function (x, y) {
        Bridge["setWallpaperOffsets" + "backup"](x, y)
        window.parent.postMessage({ message: ["bridgecommand", "setWallpaperOffsets"], iframe: deviceid, pos: [x, y] }, '*');

    },
    requestSetDrawSystemWallpaperBehindWebViewEnabled: function (enabled) {
        Bridge["requestSetDrawSystemWallpaperBehindWebViewEnabled" + "backup"](enabled)
        window.parent.postMessage({ message: ["bridgecommand", "requestSetDrawSystemWallpaperBehindWebViewEnabled"], iframe: deviceid, enabled: enabled }, '*');

    },
    requestSetBridgeButtonVisibility: function (enabled) {
        Bridge["requestSetBridgeButtonVisibility" + "backup"](enabled)
        window.parent.postMessage({ message: ["bridgecommand", "requestSetBridgeButtonVisibility"], iframe: deviceid, enabled: enabled }, '*');

    },
    requestOpenBridgeSettings: function () {
        window.parent.postMessage({ message: ["bridgecommand", "requestOpenBridgeSettings"], iframe: deviceid }, '*');

    }
}
Object.keys(newFunc).forEach(funcname => {
    window.Bridge[funcname] = newFunc[funcname]
});

    console.log("INJEXTED")

    const injectstyle = document.createElement("style")
    injectstyle.textContent = bridgemockstyle
    document.head.appendChild(injectstyle)

    alert = function (message) {
        Bridge.showToast(message, false)
    }
    window.alert = function (message) {
        Bridge.showToast(message, false)
    }
    try {
        Bridge
        window.parent.postMessage({ message: ["bridgecommand", "deviceLoaded"], iframe: deviceid }, '*');
        window.parent.postMessage({
            message: ["bridgecommand", "setWallpaperOffsets"], iframe: deviceid, pos: [Bridge.wallpaperOffsetX, Bridge.wallpaperOffsetY]
        }, '*');
        window.parent.postMessage({ message: ["bridgecommand", "requestSetDrawSystemWallpaperBehindWebViewEnabled"], iframe: deviceid, enabled: Bridge.drawSystemWallpaperBehindWebViewEnabled }, '*');
        window.parent.postMessage({ message: ["bridgecommand", "requestSetBridgeButtonVisibility"], iframe: deviceid, enabled: Bridge.bridgeButtonVisibility }, '*');

    } catch (error) {
        console.log("post error")
        window.parent.postMessage({ message: ["bridgecommand", "deviceFail"], iframe: deviceid }, '*');
console.error(error)
    }


    `  <div class="wallpaperpicker">
<div class="wallpaperpickerpage">
<h1>Wallpapers</h1>
<div class="item"><img src="assets/wallpapers/joshua-fuller-Ws3Yl69vHPo-unsplash.jpg" /></div>
<div class="item"><img src="assets/wallpapers/lennon-cheng-WTSn3axynUk-unsplash.jpg" /></div>
<div class="item"><img src="assets/wallpapers/nexus.png" /></div>
<div class="item isv"><svg height="24" viewBox="0 -960 960 960" width="24" xmlns="http://www.w3.org/2000/svg">            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320q17 0 28.5 11.5T560-800q0 17-11.5 28.5T520-760H200v560h560v-320q0-17 11.5-28.5T800-560q17 0 28.5 11.5T840-520v320q0 33-23.5 56.5T760-120H200Zm480-560h-40q-17 0-28.5-11.5T600-720q0-17 11.5-28.5T640-760h40v-40q0-17 11.5-28.5T720-840q17 0 28.5 11.5T760-800v40h40q17 0 28.5 11.5T840-720q0 17-11.5 28.5T800-680h-40v40q0 17-11.5 28.5T720-600q-17 0-28.5-11.5T680-640v-40ZM450-320l-74-99q-6-8-16-8t-16 8l-80 107q-8 10-2 21t18 11h400q12 0 18-11t-2-21L586-459q-6-8-16-8t-16 8L450-320Zm30-160Z"></path>
</svg>
</div>
<div>
<defs></defs>

</div>`


alert = function (message) {
    Bridge.showToast(message, false)
}
window.alert = function (message) {
    Bridge.showToast(message, false)
}

var bridgemockstyle = `
::-webkit-scrollbar{
    display: none;
  }
`