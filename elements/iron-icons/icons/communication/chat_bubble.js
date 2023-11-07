import {svg} from 'lit'
export const communication_chat_bubble = svg`<svg viewBox="0 0 24 24" id="chat-bubble"><g><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path></g></svg>`;
export const chat_bubble = communication_chat_bubble;
if(window.icons === undefined){ window.icons = {}; }
window.icons["communication:chat-bubble"] = window.icons["chat-bubble"] = communication_chat_bubble;
