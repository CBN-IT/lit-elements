import {svg} from 'lit'
import {iconMap} from '../../iconMap.js'
export const notification_voice_chat = svg`<svg viewBox="0 0 24 24" id="voice-chat"><g><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12l-4-3.2V14H6V6h8v3.2L18 6v8z"></path></g></svg>`;
export const voice_chat = notification_voice_chat;
iconMap["notification:voice-chat"] = iconMap["voice-chat"] = notification_voice_chat;
