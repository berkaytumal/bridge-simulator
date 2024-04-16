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
    createDevice("samsung-galaxy-s21-ultra")

});
const getProperties = {
    localhost: {
        port: function () {
            return localStorage["bs_settings_port"] ? localStorage["bs_settings_port"] : 5000
        },
        url: function () {
            return (localStorage["bs_settings_localhostfix"] == "true") ? "127.0.0.1" : "localhost"
        }
    },
    wallpaper: function () {
        return localStorage["bs_settings_wallpaper"] ? localStorage["bs_settings_wallpaper"] : 0

    }

}
/*
window.onViewError = function onViewError(e, device) {
    // console.log(e)
    //   alert("Couldn't load your local project, please check your settings!")
    const domdevice = $(this).parent()
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
        <div class="maskiframe"><iframe src="/pages/apitester" title="" frameborder="0"></iframe></div>
        </div>`)
            const casnv = createDefaultLiveWallpaper()
            $("div.devicebody > div.maskiframe").last().append(casnv)
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
        //  domdevice.remove()
        alert("Device file is corrupted! Log this error pls :O")
    });
    // $(this).parent().remove()
}*/
window.deviceTimeout = 5000
function crurl(url, device) {
    $.get(`/masks/${device.device}.svg`, function (data) {

        const img = new Image();
        img.onload = function () {
            //  alert(this.width + 'x' + this.height);
            const id = `if-${Date.now()}-${Math.floor(Math.random() * 100)}`
            window[id + "createtime"] = Date.now()

            $('#container').append();
            const clippath = "clippath" + Date.now()
            var svg = data.documentElement.outerHTML
            svg = svg.replaceAll("viewport-mask1", clippath)
            $("body").append(svg)
            $("body").append(`<div class="devicebody loading" id="${id}" style="opacity:0;--width:${device["software-resolution"][0]};--height:${device["software-resolution"][1]};--bezelX:${device["bezel"][0]};--bezelY:${device["bezel"][1]};--bezelW:${device["bezel"][2]};--bezelH:${device["bezel"][2] * this.height / this.width};--clip-path:url(#${clippath})" >
        <img src="/bezels/${device["device"]}.png"/>
        <div class="maskiframe"><iframe src="${url}" title="${id}" frameborder="0"></iframe>
          
        <div class="bridgebutton" onclick="openPage('settings')"></div>
        <div class="devicenavigationbar"></div>
        <div class="devicestatusbar"></div>
        </div>
        </div>`)
            const md = $("body > div.devicebody").last()
            bringToFront(md[0])
            setTimeout(() => {
                if (!window[id + "loaded"]) {
                    md.remove()
                    alert("Error, device timeout!")
                    console.error("Device took too long to answer!")
                }
            }, window.deviceTimeout);
            renewWallpapers(md)
            md[0].devicesize = [md.width(), md.height()]
            md[0].deviceposition = [window.innerWidth / 2, window.innerHeight / 2]
            md[0].devicescale = 1
            if (md[0].devicesize[0] > window.innerWidth || md[0].devicesize[1] > window.innerHeight) {
                if (md[0].devicesize[0] / md[0].devicesize[1] > window.innerWidth * 0.9 / window.innerHeight * 0.9) {
                    console.log(1)
                    md[0].devicescale = window.innerWidth * 0.9 / md[0].devicesize[0]
                } else {
                    console.log(2)
                    md[0].devicescale = window.innerHeight * 0.9 / md[0].devicesize[1]
                }
            } else {
                console.log("küçük")
            }

            md[0].devicereposition = function () {
                md.css({ left: 0, top: 0, transform: `translateX(${md[0].deviceposition[0]}px) translateY(${md[0].deviceposition[1]}px) translateX(${-md[0].devicesize[0] / 2}px) translateY(${-md[0].devicesize[1] / 2}px) scale(${md[0].devicescale})` })
            }
            md.css({ "--scale": md[0].devicescale, "--init": `translateX(${md[0].deviceposition[0]}px) translateY(${md[0].deviceposition[1]}px) translateX(${-md[0].devicesize[0] / 2}px) translateY(${-md[0].devicesize[1] / 2}px)` })
            md[0].devicereposition()
            const yeniframe = $("div.devicebody > div.maskiframe").last().children("iframe")[0]
            yeniframe.src = url
            var success = false
            try {

                var script = document.createElement('script');
                // Set the source of the script to the script you want to inject
                script.src = window.location.href + "dist/bridgemock.js" // Or set the script content directly: script.textContent = 'alert("Injected script executed!");';
                // Append the script to the iframe's document body
                yeniframe.contentWindow.document.body.appendChild(script);
                success = true
            } catch (error) {

            }
            var tryagain = setTimeout(() => {
                try {
                    if (success) {
                        clearTimeout(tryagain)
                        return
                    }
                    var script = document.createElement('script');
                    // Set the source of the script to the script you want to inject
                    script.src = window.location.href + "dist/bridgemock.js" // Or set the script content directly: script.textContent = 'alert("Injected script executed!");';
                    // Append the script to the iframe's document body
                    yeniframe.contentWindow.document.body.appendChild(script);
                    tryagain = true
                } catch (error) {

                }
            }, 0);

            function coor2area(e) {
                const m_object = $(e.target)
                const size = 30
                const [width, height] = [m_object.width(), m_object.height()]
                e.clientX = e.offsetX
                e.clientY = e.offsetY
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
                    return 8
                }
            }
            function recursor(e) {
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
                    default:
                        $(e.target).css("cursor", "move")
                        break;
                }

            }
            $("div.devicebody > img").on("pointerenter", function (e) {
                recursor(e)
            })
            $(window).on("pointermove", function (e) {
                if ($(e.target).is("div.devicebody > img")) recursor(e)

                $("body > div > img").each(function (index, element) {
                    if (!element.pdfr) return
                    if (element.mdt == 1) {
                        const hipotenus = Math.pow(Math.pow(e.pageX - element.parentElement.deviceposition[0], 2) + Math.pow(element.parentElement.deviceposition[1] - e.pageY, 2), 0.5)
                        element.parentElement.devicescale = element.pdfrs / (element.pdfrl / hipotenus)
                        element.parentElement.devicescale = element.parentElement.devicescale < .3 ? .3 : element.parentElement.devicescale

                        /*  if (element.parentElement.devicesize[0] > window.innerWidth || md[0].devicesize[1] > window.innerHeight) {
                              if (md[0].devicesize[0] / md[0].devicesize[1] > window.innerWidth * 0.9 / window.innerHeight * 0.9) {
                                  console.log(1)
                                  md[0].devicescale = window.innerWidth * 0.9 / md[0].devicesize[0]
                              } else {
                                  console.log(2)
                                  md[0].devicescale = window.innerHeight * 0.9 / md[0].devicesize[1]
                              }
                          } else {
                              console.log("küçük")
                          }*/
                        element.parentElement.devicereposition()
                    } else if (element.mdt == 2) {
                        console.log("aaa")
                        console.log(element.pddl, element.pdml)
                        element.parentElement.deviceposition = [element.pddl[0] + e.pageX - element.pdml[0], element.pddl[1] + e.pageY - element.pdml[1]]
                        element.parentElement.devicereposition()
                    }

                })

            })
            $(window).on("pointerup", function (e) {
                $("body > div > img").each(function (index, element) {
                    element.pdfr = false
                })
                $("div.devicebody > div.maskiframe > iframe").css("pointer-events", "")
            })

            $("div.devicebody > img").on("pointerdown", function (e) {
                bringToFront(this.parentElement)
                $("div.devicebody > div.maskiframe > iframe").css("pointer-events", "none")
                console.log(coor2area(e))
                recursor(e)
                const loc = coor2area(e)
                if (loc >= 0 && loc <= 3) {
                    this.mdt = 1
                    this.pdfr = true
                    this.pdfrs = this.parentElement.devicescale
                    console.log("scale", this.parentElement.devicescale)
                    this.pdfrl = Math.pow(Math.pow(this.parentElement.deviceposition[0] - e.pageX, 2) + Math.pow(this.parentElement.deviceposition[1] - e.pageY, 2), 0.5) * (e.pageX / Math.abs(e.pageX))
                    console.log(this.pdfrl, this.pdfrs)
                } else {
                    this.mdt = 2
                    this.pdfr = true
                    this.pdml = [e.pageX, e.pageY]
                    this.pddl = [this.parentElement.deviceposition[0], this.parentElement.deviceposition[1]]
                }
            })
            $("div.devicebody > img").on("pointerup", function (e) {
                this.mdt = 0
            })
        }
        img.src = `/bezels/${device["device"]}.png`;

    }, 'xml').fail(function (jqXHR, textStatus, errorThrown) {
        alert("Device file is corrupted! Log this error pls :O")
    });
}
function bringToFront(element) {
    let boxes = $('.devicebody');
    let maxZIndex = Math.max.apply(null, boxes.map(function () {
        return parseInt($(this).css('z-index')) || 1;
    }).get());

    $(element).css('z-index', maxZIndex + 1);

    // Normalize z-index values
    boxes = boxes.toArray().sort(function (a, b) {
        return parseInt($(a).css('z-index')) - parseInt($(b).css('z-index'));
    });
    $(boxes).each(function (index) {
        $(this).css('z-index', index + 1);
    });
}

window.createDevice = function createDevice(devicename) {
    if (window.loadeddevices == undefined) {
        alert("Oops :( Couldn't load the device.")
        return
    }
    const devicefound = loadeddevices.filter(device => device.device == devicename)
    if (devicefound.length != 1) {
        alert("Oh no, this device doesnt even exist!? Log this error pls :O")
        return
    }
    const device = devicefound[0]
    $.ajax({
        url: `http://${getProperties.localhost.url()}:${getProperties.localhost.port()}`,
        type: 'HEAD',
        error: function (e) {
            crurl("/pages/apitester", device)
            // onViewError(e, device) 
        },
        success: function () {
            crurl(`http://${getProperties.localhost.url()}:${getProperties.localhost.port()}`, device)
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
window.document.addEventListener('bridgeToMainMessage', function (e) {
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

/*
window.parent.postMessage({ message: 'Hello Parent Page!', iframe: window.frameElement.title }, '*');

*/





window.createDefaultLiveWallpaper = function createDefaultLiveWallpaper(append) {
    const canvas = document.createElement("canvas")
    canvas.classList.add("livewallpaper")
    canvas.width = 500
    canvas.height = 500
    const ctx = canvas.getContext("2d")
    const start = Date.now()
    const colors = ["rgb(255,59,48)", "rgb(52,199,89)", "rgb(50,173,230)", "rgb(255,204,0)", "rgb(255,59,48,0)", "rgb(52,199,89,0)", "rgb(50,173,230,0)", "rgb(255,204,0,0)"]
    const boxsize = 10

    var boxes = []
    window.boxes = boxes
    $(canvas).css({
        "position": "absolute",
        left: 100,
        top: 100
    })
    canvas.clickAt = function (x, y) {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Example usage:
        const array = shuffleArray(shuffleArray([1, 2, 3, 0]));
        var posi = [x, y]
        posi[0] = Math.round((posi[0] - boxsize / 2) / boxsize) * boxsize + boxsize / 2
        posi[1] = Math.round((posi[1] - boxsize / 2) / boxsize) * boxsize + boxsize / 2
        array.forEach((element, index) => {
            boxes.push({ col: element, pos: [posi[0], posi[1]], inp: [posi[0], posi[1]], dir: index, tal: 10, sta: Date.now(), spe: 200 })
        });
    }
    $(canvas).click(function (e) {
        canvas.clickAt(e.offsetX, e.offsetY)
    })

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        boxes.forEach((box, index) => {
            var addpos = (Date.now() - box.sta) / 1000 * box.spe
            box.tal = addpos < 200 ? addpos : 200
            switch (box.dir) {
                case 0:
                    box.pos[0] = box.inp[0] + addpos
                    break;
                case 1:
                    box.pos[1] = box.inp[1] + addpos
                    break;
                case 2:
                    box.pos[0] = box.inp[0] - addpos
                    break;
                case 3:
                    box.pos[1] = box.inp[1] - addpos
                    break;
            }
            shinybox(box, index)
        });
        function shinybox(box, index) {
            ctx.save()
            var color = box.col, x = box.pos[0], y = box.pos[1], dir = box.dir, taillength = box.tal
            var size = (dir == 0 || dir == 2) ? [taillength + boxsize, boxsize] : [boxsize, taillength + boxsize]
            var position = dir == 0 ? [x - taillength - boxsize / 2, y - boxsize / 2] : dir == 1 ? [x - boxsize / 2, y - taillength - boxsize / 2] : [x - boxsize / 2, y - boxsize / 2]
            const grad = ctx.createLinearGradient(
                position[0], position[1], (dir == 0 || dir == 2) ? (position[0] + size[0]) : position[0], (dir == 0 || dir == 2) ? position[1] : (position[1] + size[1])
            );
            if (taillength > 0) grad.addColorStop((dir == 0 || dir == 1) ? 0 : 1, colors[color + 4]);
            grad.addColorStop((dir == 0 || dir == 1) ? 1 : 0, colors[color]);
            grad.addColorStop((dir == 0 || dir == 1) ? 1 - (boxsize / (taillength + boxsize)) : (boxsize / (taillength + boxsize)), colors[color]);
            ctx.fillStyle = grad;
            ctx.fillRect(position[0], position[1], size[0], size[1]);

            ctx.fillStyle = colors[box.col];

            ctx.shadowBlur = 20;
            ctx.shadowColor = colors[box.col];
            ctx.fillRect(box.pos[0] - boxsize / 2, box.pos[1] - boxsize / 2, boxsize, boxsize);
            ctx.shadowBlur = 10;
            ctx.shadowColor = "rgb(255,255,255,0.5)";
            ctx.fillRect(box.pos[0] - boxsize / 2, box.pos[1] - boxsize / 2, boxsize, boxsize);
            ctx.shadowBlur = 4;
            ctx.fillRect(box.pos[0] - boxsize / 2, box.pos[1] - boxsize / 2, boxsize, boxsize);
            ctx.restore()
        }
        boxes.forEach((box, index) => {
            if (!box) return
            var color = box.col, x = box.pos[0], y = box.pos[1], dir = box.dir, taillength = box.tal
            const boxsize = 20
            var size = (dir == 0 || dir == 2) ? [taillength + boxsize, boxsize] : [boxsize, taillength + boxsize]
            var position = dir == 0 ? [x - taillength - boxsize / 2, y - boxsize / 2] : dir == 1 ? [x - boxsize / 2, y - taillength - boxsize / 2] : [x - boxsize / 2, y - boxsize / 2]
            if (position[0] > canvas.width || position[1] > canvas.height || (position[0] + size[0]) < 0 || (position[1] + size[1]) < 0) {
                delete boxes[index]
            }
        });
        boxes = boxes.filter(x => x != undefined);
        window.boxes = boxes

        requestAnimationFrame(render)
    }
    function randomDot() {
        const posi = [canvas.width * Math.random(), canvas.height * Math.random()]
        posi[0] = Math.round(posi[0] / boxsize) * boxsize + boxsize / 2
        posi[1] = Math.round(posi[1] / boxsize) * boxsize + boxsize / 2
        // Example usage:
        const dir = Math.floor(Math.random() * 4)
        switch (dir) {
            case 0:
                boxes.push({ col: Math.floor(Math.random() * 4), pos: [-boxsize / 2 + 1, posi[1]], inp: [-boxsize / 2 + 1, posi[1]], dir: dir, tal: 10, sta: Date.now(), spe: 20 + Math.random() * 180 })
                break;
            case 1:
                boxes.push({ col: Math.floor(Math.random() * 4), pos: [posi[0], -boxsize / 2 + 1], inp: [posi[0], -boxsize / 2 + 1], dir: dir, tal: 10, sta: Date.now(), spe: 20 + Math.random() * 180 })
                break;
            case 2:
                boxes.push({ col: Math.floor(Math.random() * 4), pos: [canvas.width + boxsize / 2 - 1, posi[1]], inp: [canvas.width + boxsize / 2 - 1, posi[1]], dir: dir, tal: 10, sta: Date.now(), spe: 20 + Math.random() * 180 })
                break;
            default:
                boxes.push({ col: Math.floor(Math.random() * 4), pos: [posi[0], canvas.height + boxsize / 2 - 1], inp: [posi[0], canvas.height + boxsize / 2 - 1], dir: dir, tal: 10, sta: Date.now(), spe: 20 + Math.random() * 180 })
                break;
        }
    }
    setInterval(randomDot, 3000);
    setInterval(randomDot, 2700);
    randomDot()
    randomDot()
    // $(append).append(canvas)
    render()
    return canvas
}
// Queue to hold messages
const toastQueue = [];
// Variable to track if toast is currently showing
let isToastShowing = false;

// Function to show toast
function showtoast(event) {
    // Add message to the queue
    toastQueue.push(event);
    // If toast is not currently showing, display the next one
    if (!isToastShowing) {
        showToastFromQueue();
    }
}

// Function to show toast from the queue
function showToastFromQueue() {
    // If there are messages in the queue
    if (toastQueue.length > 0) {
        // Get the first message from the queue
        const message = toastQueue.shift();
        // Display the message
        displayToast(message);
    }
}

// Function to display toast message
function displayToast(event) {
    isToastShowing = true;
    console.log("hoy")
    $("#" + event.data.iframe).children("div.maskiframe").append(`<div class="toastmessage">Hello wotl</div>`)
    var toast = $("#" + event.data.iframe).children("div.maskiframe").children("div.toastmessage").last()
    toast.text(event.data.input.message)
    toast.addClass(event.data.input.long ? "long" : "short")
    setTimeout(() => {
        toast.remove()
        isToastShowing = false;
        // Show next toast from queue
        showToastFromQueue();
    }, event.data.input.long ? 4000 : 2000);
}

// Example usage
window.addEventListener('message', function (event) {
    // Check if the message is coming from an iframe
    console.log(event)
    if (event.source !== window) {
        if (!event.data.message.includes("bridgecommand")) return
        switch (event.data.message[1]) {
            case "sendWallpaperTap":
                // console.log($("#" + event.data.iframe).children("div.maskiframe").children("canvas")[0])
                if ($("#" + event.data.iframe).children("div.maskiframe").children("canvas").length) $("#" + event.data.iframe).children("div.maskiframe").children("canvas")[0].clickAt(event.data.pos[0], event.data.pos[1])
                break;
            case "showToast":
                showtoast(event)
                break;
            case "deviceLoaded":
                var dev = $("#" + event.data.iframe)
                window[event.data.iframe + "loaded"] = true

                dev.removeClass("loading")
                setTimeout(() => {
                    dev.css({ "--init": "", "--scale": "", "animation": "none", "opacity": "" })
                }, 500);
                break;
            case "requestChangeSystemWallpaper":
                $("#" + event.data.iframe).children("div.maskiframe").append(`  <div class="wallpaperpicker">
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
                
                </div>`)
                var wallpicker = $("div.wallpaperpicker").last()
                wallpicker.click(function (e) {
                    if (e.target.classList.contains("item")) {
                        localStorage.setItem("bs_settings_wallpaper", $(e.target).index() - 1)
                        console.log("SEÇİLEN", $(e.target).index() - 1)
                        $(this).addClass("hide")
                        setTimeout(() => {
                            wallpicker.remove()
                            renewWallpapers($("#" + event.data.iframe))
                        }, 500);
                    } else if (e.target == this) {
                        $(this).addClass("hide")
                        setTimeout(() => {
                            wallpicker.remove()
                        }, 500);
                    }

                })

                break;
            case "setWallpaperOffsets":
                console.log($("#" + event.data.iframe).children("div.maskiframe").children("canvas")[0])
                $("#" + event.data.iframe).children("div.maskiframe").children("img.wallpaper").css({ "object-position": `${event.data.pos[0] * 100}%` })
                break;
            case "requestSetDrawSystemWallpaperBehindWebViewEnabled":
                if (!event.data.enabled) {
                    $("#" + event.data.iframe).addClass("nowallpaper")
                } else {
                    $("#" + event.data.iframe).removeClass("nowallpaper")
                }
                break;
            case "requestSetBridgeButtonVisibility":
                if (event.data.enabled == "hidden") {
                    $("#" + event.data.iframe).addClass("nobutton")
                } else {
                    $("#" + event.data.iframe).removeClass("nobutton")
                }
                break;
            case "requestOpenBridgeSettings":
                openPage("settings")
        }
        // Log the message and origin
        //        console.log('Message from iframe:', event.data);
        //        console.log('Origin:', event.origin);
        // You can also identify the iframe using event.source
        //        console.log('Sending iframe:', event.source);
    }
});

window.renewWallpapers = function renewWallpapers(devicebody) {
    $(devicebody).children("div.maskiframe").children(".livewallpaper").remove()
    $(devicebody).children("div.maskiframe").children(".wallpaper").remove()
    const wallpaperchoice = getProperties.wallpaper()
    $(devicebody).children("div.maskiframe").each(function (index, element) {
        switch (wallpaperchoice) {
            case "0":
                $(element).append(`<img class="wallpaper" src="assets/wallpapers/joshua-fuller-Ws3Yl69vHPo-unsplash.jpg" />`)
                break;
            case "1":
                $(element).append(`<img class="wallpaper" src="assets/wallpapers/lennon-cheng-WTSn3axynUk-unsplash.jpg" />`)
                break;
            case "2":
                const casnv = createDefaultLiveWallpaper()
                $(element).append(casnv)

                $("div.devicebody > img").unbind()
                const myObserver = new ResizeObserver(entries => {
                    entries.forEach(entry => {
                        casnv.width = entry.contentRect.width
                        casnv.height = entry.contentRect.height
                        console.log('width', entry.contentRect.width);
                        console.log('height', entry.contentRect.height);
                    });
                });
                myObserver.observe($("div.devicebody > div.maskiframe").last()[0]);

                break;
            case "3":

                break;
        }
        try {
            $(element).children("img.wallpaper").css({ "object-position": `${$(element).children("iframe")[0].contentWindow.Bridge.wallpaperOffsetX * 100}%` })

        } catch (error) {

        }

    })
}