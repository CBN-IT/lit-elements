const xmlParser = require('fast-xml-parser');
const Parser = require("fast-xml-parser").j2xParser;
const jsonParser = new Parser({ignoreAttributes:false });
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
                parseFile(filename,svgs,content)
            }
        });
    });
    buildContent(svgs);

    return svgs;
}

function buildContent(svgs){
    let used = {};
    let fileContent = ` "use strict";\nimport {svg} from 'lit-element';\n`
    for(let [key,value] of Object.entries(svgs)){
        let varName = key.replace(/[\-:]/g,"_");
        let [file,id] = key.split(":");
        id = id.replace(/[\-:]/g,"_");
        fileContent+=`export const ${varName} = svg\`${value}\`;\n`;
        if(!reservedWords.includes(id) && !id.match(/^[0-9]+/)){
            if(used[id]===undefined){
                fileContent+=`export const ${id} = ${varName};\n`;
                used[id] = true;
            }

        }
    }
    let dir = "elements/iron-icons/";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(dir+"icons.js", fileContent)
}

function parseFile(prefix, svgs, content) {
    let json = xmlParser.parse(content, {arrayMode: false, ignoreAttributes: false});
    if (json.g) {
        for (let el of json.g) {
            if (el["@_id"] !== undefined) {
                svgs[prefix + ":" + el["@_id"]] = jsonParser.parse({
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
                svgs[prefix + ":" + el["@_id"]] = jsonParser.parse({
                    svg: el
                });
            }
        }
    }
}

getIcons([
    path.join(__dirname, "./"),
]);