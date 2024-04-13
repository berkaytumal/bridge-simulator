import { BridgeMock, createDefaultBridgeMockConfig } from '@bridgelauncher/api-mock';
import jQuery from "./../assets/jquery/jquery.js";
import Bowser from "bowser"; // ES6 (and TypeScript with --esModuleInterop enabled)
window["$"] = jQuery
window["jQuery"] = jQuery

/*window.menubarentries = {
    file: [
        {
            text: 'Create Simulator', submenu: [
                { text: 'Back', hotkey: 'Alt+Left arrow', disabled: true },
                { text: 'Forward', hotkey: 'Alt+Right arrow', disabled: true },
                { text: 'Reload', hotkey: 'Ctrl+R' },
                null,
                { text: 'Save as...', hotkey: 'Ctrl+S' },
                { text: 'Print...', hotkey: 'Ctrl+P' },
                { text: 'Cast...' },
                { text: 'Translate to English' },
                null,
                { text: 'View page source', hotkey: 'Ctrl+U' },
                { text: 'Inspect', hotkey: 'Ctrl+Shift+I' },

            ]
        },
        null,
        { text: 'Close All' },
    ], view: [
        { text: 'Back', hotkey: 'Alt+Left arrow', disabled: true },
        { text: 'Forward', hotkey: 'Alt+Right arrow', disabled: true },
        { text: 'Reload', hotkey: 'Ctrl+R' },
        null,
        { text: 'Save as...', hotkey: 'Ctrl+S' },
        { text: 'Print...', hotkey: 'Ctrl+P' },
        { text: 'Cast...' },
        { text: 'Translate to English' },
        null,
        { text: 'View page source', hotkey: 'Ctrl+U' },
        { text: 'Inspect', hotkey: 'Ctrl+Shift+I' },

    ], about: [
        { text: 'Back', hotkey: 'Alt+Left arrow', disabled: true },
        { text: 'Forward', hotkey: 'Alt+Right arrow', disabled: true },
        { text: 'Reload', hotkey: 'Ctrl+R' },
        null,
        { text: 'Save as...', hotkey: 'Ctrl+S' },
        { text: 'Print...', hotkey: 'Ctrl+P' },
        { text: 'Cast...' },
        { text: 'Translate to English' },
        null,
        { text: 'View page source', hotkey: 'Ctrl+U' },
        { text: 'Inspect', hotkey: 'Ctrl+Shift+I' },
        null,

    ]
}
window.menubar = {
    file: new ContextMenu(document.body, menubarentries.file),
    view: new ContextMenu(document.body, menubarentries.view),
    about: new ContextMenu(document.body, menubarentries.about),

}
Object.keys(menubar).forEach(element => {
    menubar[element].install()
});*/
const browser = Bowser.getParser(window.navigator.userAgent);
if (browser.getBrowser().name.toLowerCase() != "chrome") {
    $("#nonchrome").css("visibility", "visible").children("h1").text(`Warning! You are using ${browser.getBrowser().name}`)
}

/*
$("#menubar > p:nth-child(2)").on("click", function (e) { setTimeout(() => { menubar.file.show($(this).offset().left, 40) }, 0); })
$("#menubar > p:nth-child(3)").on("click", function (e) { setTimeout(() => { menubar.about.show($(this).offset().left, 40) }, 0); })
$("#menubar > p:nth-child(4)").on("click", function (e) { setTimeout(() => { menubar.view.show($(this).offset().left, 40) }, 0); })*/


defaultMenu = [
    {
        text: "Create Simulator",
        action: () => { openPage("devices") },
    },
    {
        text: "Close",
        disabled: true,
    },
    { separator: true },
    {
        text: "Placement",
        submenu: [
            {
                text: "Align",
                disabled: true
            },
            {
                text: "Side by side",
                disabled: false
            },
            { separator: true },

            {
                text: "Loading devices...",
                disabled: true
            },
            {
                text: "Loading devices...",
                disabled: true
            },
        ],
    },
    { separator: true },
    {
        text: "Settings",
        action: () => { openPage("settings") },

    },
    {
        text: "About Bridge",
        action: () => { openPage("about") },

    },

];/*
menus = {
    list: [
        { header: true, text: "Actions" },
        {
            text: "Add",
            action: function (target) {
                const newItem = document.createElement("button");
                newItem.innerText = "Item" + target.childElementCount;
                newItem.setAttribute("data-context-menu", "item");
                target.appendChild(newItem);
            },
        },
    ],
    item: [
        {
            header: true,
            text: "Actions",
            load: function (item, target) {
                item.innerText = target.innerText + " Actions";
            },
        },
        {
            text: "Add",
            action: function (target) {
                const newItem = document.createElement("button");
                newItem.innerText = "Item" + target.parentElement.childElementCount;
                newItem.setAttribute("data-context-menu", "item");
                target.parentElement.appendChild(newItem);
            },
        },
        {
            text: "Delete",
            close: true,
            action: function (target) {
                target.remove();
            },
        },
    ],
    input: [
        { header: true, text: "Text Editing" },
        {
            text: "Clear",
            action: function (target) {
                target.value = "";
            },
        },
        {
            text: "Copy",
            shortcut: "ctrl+C",
            action: function (target) {
                navigator.clipboard.writeText(target.value);
            },
        },
        {
            text: "Paste",
            shortcut: "ctrl+V",
            action: function (target) {
                navigator.clipboard.readText().then((clipText) => (target.value += clipText));
            },
        },
    ],
};*/
function closePages(now) {
    var curback = $("div.backdrop")
    var curframe = $("iframe.pageview")
    curframe.removeClass("shown")
    curback.removeClass("in").addClass("out")
    if (now == true) {

        curback.remove()
        curframe.remove()
    } else {
        setTimeout(() => {
            curback.remove()
            curframe.remove()
        }, 200);
    }

}
window.onPageLoad = function onPageLoad(element) {
    $("#loader").removeClass("shown")
    $("iframe.pageview").addClass("shown")
    $("div.backdrop").remove()
    $("body").append(`<div class="backdrop in"></div>`)
    $("div.backdrop").click(closePages)
    $("div.backdrop").on("contextmenu", (event) => { event.stopPropagation(), event.preventDefault() })
}
window.openPage = function openPage(name) {
    closePages(true)
    $("#loader").addClass("shown")
    $("body").append(`<iframe class="pageview" onload="onPageLoad(this)" src="/pages/${name}.html" frameborder="0"></iframe>`)
}

window.loadeddevices = undefined
$.getJSON("/devices.json", function (data) {
    // Once the JSON is fetched successfully, data will contain the parsed JSON object
    loadeddevices = data
    createDevice(
        "samsung-galaxy-s21-ultra"
    )

});
const getProperties = {
    localhost: {
        port: function () {
            return localStorage["bs_settings_port"] ? localStorage["bs_settings_port"] : 5000
        },
        url: function () {
            return (localStorage["bs_settings_localhostfix"] == "true") ? "127.0.0.1" : "localhost"
        }
    }

}
window.onViewError = function onViewError(e) {
    // console.log(e)
    alert("Couldn't load your local project, please check your settings!")
    $(this).parent().remove()
}
window.createDevice = function createDevice(devicename) {
    if (window.loadeddevices == undefined) {
        alert("Oops :( Couldn't load the device.")
    }
    const devicefound = loadeddevices.filter(device => device.device == devicename)
    if (devicefound.length != 1) {
        alert("Oh no, this device doesnt even exist!? Log this error pls :O")
    }
    const device = devicefound[0]
    $.ajax({
        url: `http://${getProperties.localhost.url()}:${getProperties.localhost.port()}`,
        type: 'HEAD',
        error: onViewError,
        success: function () {
            $.get(`/masks/${device.device}.svg`, function (data) {

                const img = new Image();
                img.onload = function () {
                    //  alert(this.width + 'x' + this.height);

                    $('#container').append();
                    const clippath = "clippath" + Date.now()
                    var svg = data.documentElement.outerHTML
                    svg = svg.replaceAll("viewport-mask1", clippath)
                    $("body").append(svg)
                    $("body").append(`<div class="devicebody" style="--width:${device["software-resolution"][0]};--height:${device["software-resolution"][1]};--bezelX:${device["bezel"][0]};--bezelY:${device["bezel"][1]};--bezelW:${device["bezel"][2]};--bezelH:${device["bezel"][2] * this.height / this.width};--clip-path:url(#${clippath})" >
                <img src="/bezels/${device["device"]}.png"/>
                <div class="maskiframe"><iframe src="http://${getProperties.localhost.url()}:${getProperties.localhost.port()}" frameborder="0"></iframe></div>
                </div>`)


                    $("div.devicebody > img").unbind()
                    function coor2area(e) {
                        const m_object = $(e.target)
                        const size = 30
                        const [width, height] = [m_object.width(), m_object.height()]
                        if (e.clientX <= size && e.clientY <= size) {
                            return 0
                        } else if (e.clientX >= width - size && e.clientY <= size) {
                            return 1
                        } else if (e.clientX <= size && e.clientY >= height - size) {
                            return 2
                        } else if (e.clientX >= width - size && e.clientY >= height - size) {
                            return 3
                        } else if (e.clientX <= size) {
                            return 6
                        } else if (e.clientX >= width - size) {
                            return 4
                        } else if (e.clientY <= size) {
                            return 7
                        } else if (e.clientY >= width - size) {
                            return 5
                        } else {
                            return none
                        }
                    }
                    $("div.devicebody > img").on("pointerenter", function (e) {

                    })
                    $("body > div > img").on("pointermove", function (e) {
                        console.log(coor2area(e))
                        switch (coor2area(e)) {
                            case 0:
                                $(e.target).css("cursor", "nwse-resize")
                                break;
                            case 1:
                                $(e.target).css("cursor", "nesw-resize")
                                break;
                            case 2:
                                $(e.target).css("cursor", "nesw-resize")
                                break;
                            case 3:
                                $(e.target).css("cursor", "nwse-resize")
                                break;
                            case 4:
                                $(e.target).css("cursor", "ew-resize")
                                break;
                            case 6:
                                $(e.target).css("cursor", "ew-resize")
                                break;
                            default:
                                $(e.target).css("cursor", "default")
                                break;
                        }

                    })
                    $("div.devicebody > img").on("pointerdown", function (e) {

                    })
                    $("div.devicebody > img").on("pointerup", function (e) {

                    })
                }
                img.src = `/bezels/${device["device"]}.png`;

            }, 'xml').fail(function (jqXHR, textStatus, errorThrown) {
                alert("Device file is corrupted! Log this error pls :O")
            });
        }
    });
}
window.document.addEventListener('viewToMainMessage', function (e) {
    // console.log(e.detail) // outputs: {foo: 'bar'}
    try {
        switch (e.detail[0]) {
            case "select":
                createDevice(e.detail[1])
                break;

            default:
                break;
        }
        if (e.detail.includes("closepage")) closePages()
    } catch (error) {

    }
}, false)






