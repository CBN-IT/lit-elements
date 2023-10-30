const { XMLParser, XMLBuilder} = require("fast-xml-parser");
const xmlBuilder = new XMLBuilder({arrayMode: false, ignoreAttributes: false});
const xmlParser = new XMLParser({ignoreAttributes: false});
const fs = require("fs");
const path = require("path");

const reservedWords = ["abstract", "boolean", "break", "byte", "case", "catch", "char", "class", "continue", "const", "debugger", "default", "delete", "do", "double", "else", "enum", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "long", "native", "new", "null", "package", "private", "protected", "public", "return", "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "while", "with", "alert", "arguments", "Array", "blur", "Boolean", "callee", "caller", "captureEvents", "clearInterval", "clearTimeout", "close", "closed", "confirm", "constructor", "Date", "defaultStatus", "document", "escape", "eval", "find", "focus", "frames", "Function", "history", "home", "Infinity", "innerHeight", "innerWidth", "isFinite", "isNaN", "java", "length", "location", "locationbar", "Math", "menubar", "moveBy", "name", "NaN", "netscape", "Number", "Object", "open", "opener", "outerHeight", "outerWidth", "Packages", "pageXOffset", "pageYOffset", "parent", "parseFloat", "parseInt", "personalbar", "print", "prompt", "prototype", "RegExp", "releaseEvents", "resizeBy", "resizeTo", "routeEvent", "scroll", "scrollbars", "scrollBy", "scrollTo", "self", "setInterval", "setTimeout", "status", "statusbar", "stop", "String", "toolbar", "top", "toString", "unescape", "unwatch", "valueOf", "watch", "window"]

function getIcons(folderPaths) {
    let svgs = {};
    folderPaths.forEach(folderPath => {
        fs.readdirSync(folderPath).forEach(file => {
            if(file.endsWith(".svg") || file.endsWith(".svgicon")){
                let [filename, ext] = file.split(".");
                const content = fs.readFileSync(`${folderPath}/${file}`, 'utf8');
                let fileSvgs = parseFile(filename,content);
                buildContentWindow(fileSvgs, filename)
                svgs = {
                    ...svgs,
                    ...fileSvgs
                }
            }
        });
    });
    buildContent(svgs);

    return svgs;
}

function buildContentWindow(svgs, filename){
    let dir = "elements/iron-icons/";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    let content = `"use strict";\nimport {svg} from 'lit';\nif(window.icons === undefined){ window.icons = {}; }\n`;
    for(let [key,svg] of Object.entries(svgs)){
        let varName = key.replace(/[\-:]/g,"_");
        let [namespace,id] = key.split(":");

        id = id.replace(/[\-:]/g,"_");
        content+=`window.icons["${namespace}:${id}"] = svg\`${svg}\`;\nwindow.icons["${id}"] = window.icons["${namespace}:${id}"];\n`
    }
    fs.writeFileSync(dir+filename+".js", content)
}
function buildContent(svgs, filename){
    let dir = "elements/iron-icons/";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    let used = {};
    let fileContent = `"use strict";\nimport {svg} from 'lit'\n`;
    let windowIcons = `"use strict";\nimport {svg} from 'lit';\nif(window.icons === undefined){ window.icons = {}; }\n`;

    for(let [key,svg] of Object.entries(svgs)){
        let varName = key.replace(/[\-:]/g,"_");
        let [namespace,id] = key.split(":");

        id = id.replace(/[\-:]/g,"_");
        fileContent+=`export const ${varName} = svg\`${svg}\`;\n`;
        if(!reservedWords.includes(id) && !id.match(/^[0-9]+/)){
            if(used[id]===undefined){
                fileContent+=`export const ${id} = ${varName};\n`;
                used[id] = true;
            }
        }
        windowIcons+=`window.icons["${namespace}:${id}"] = svg\`${svg}\`;\nwindow.icons["${id}"] = window.icons["${namespace}:${id}"];\n`
    }





    fs.writeFileSync(dir+"icons.js", fileContent)
    fs.writeFileSync(dir+"iconsWindow.js", windowIcons)
}

function parseFile(prefix, content) {
    let svgs = {}
    let json = xmlParser.parse(content);
    if (json.g) {
        for (let el of json.g) {
            if (el["@_id"] !== undefined) {
                svgs[prefix + ":" + el["@_id"]] = xmlBuilder.build({
                    svg: {
                        ["@_viewBox"]: "0 0 24 24",
                        ["@_id"]: el["@_id"],
                        g: {
                            ...el,
                            ["@_id"]: undefined,
                        }
                    }
                });
            }
        }
    }
    if (json.svg) {
        if (!(json.svg instanceof Array)) {
            json.svg = [json.svg];
        }
        for (let el of json.svg) {
            if (el["@_id"] !== undefined) {
                svgs[prefix + ":" + el["@_id"]] = xmlBuilder.build({
                    svg: el
                });
            }
        }
    }
    return svgs;
}

getIcons([
    path.join(__dirname, "./"),
]);