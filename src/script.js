import { BridgeMock, createDefaultBridgeMockConfig } from '@bridgelauncher/api-mock';
import jQuery from 'jquery';
import Bowser from "bowser"; // ES6 (and TypeScript with --esModuleInterop enabled)
window["$"] = jQuery
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
    console.log(element, "yüklenmiş")
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
function createDevice(devicename) {
    console.log("DR3ETE", devicename)
}
window.document.addEventListener('viewToMainMessage', function (e) {
    console.log(e.detail) // outputs: {foo: 'bar'}
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
