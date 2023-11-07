import {svg} from 'lit'
export const cbn_stock = svg`<svg id="stock" viewBox="0 0 100 100"><path fill="#337cdc" d="M10 6v35h80V5h8v91h-8v-5H10v5H3V6h7Zm0 42v36h80V48H10Z"></path><path fill="#bb7300" d="M86 53v31h-6V60h-6v10H58V60h-4v24h-7V60h-4v10H27V60h-4v24h-7V53h70Zm-1-43v31h-6V17h-5v10H58V17h-4v24h-7V17h-4v10H27V17h-5v24h-7V10h70Z"></path></svg>`;
export const stock = cbn_stock;
if(window.icons === undefined){ window.icons = {}; }
window.icons["cbn:stock"] = window.icons["stock"] = cbn_stock;
