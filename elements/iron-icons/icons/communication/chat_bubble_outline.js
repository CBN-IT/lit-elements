import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const communication_chat_bubble_outline = svg`<svg viewBox="0 0 24 24" id="chat-bubble-outline"><g><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"></path></g></svg>`;
export const chat_bubble_outline = communication_chat_bubble_outline;
iconMap["communication:chat-bubble-outline"] = iconMap["chat-bubble-outline"] = communication_chat_bubble_outline;
