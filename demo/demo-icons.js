"use strict";
const template = `
<svg><defs>
    <g id="demo"><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/></g>
</defs></svg>
`;

function setIcons(template){
window.icons = window.icons ? window.icons : {};
let parser = new window.DOMParser().parseFromString(template, "text/xml");
parser.querySelectorAll('g').forEach(icon => {
window.icons[icon.getAttribute('id')] = `<svg viewBox="0 0 24 24">${icon.outerHTML}</svg>`;
});
}

setIcons(template);
