import {svg} from 'lit'
export const cbn_folders = svg`<svg id="folders" viewBox="0 0 24 24"><g stroke="black" fill="none"><path d="M8.687545597719932,9.02471988974724 L5.753022734515621,7.090602548089855 L1.2104406552071616,7.090602548089855 L1.2104406552071616,20.458984539748336 L19.247381658493012,20.458984539748336 L19.247381658493012,9.02471988974724 zM8.687545597719932,9.02471988974724 M21.025880363465326,18.695306598034165 L21.025880363465326,7.253631655328942 L10.46604430269224,7.253631655328942 L7.53152143948793,5.312103843117546 L2.9815289785503984,5.312103843117546 M22.78955830517949,16.924218363615875 L22.78955830517949,5.489953713614776 L12.237132626035477,5.489953713614776 L9.302609762831167,3.5410156086992455 L4.760027683522708,3.5410156086992455"></path></g></svg>`;
export const folders = cbn_folders;
if(window.icons === undefined){ window.icons = {}; }
window.icons["cbn:folders"] = window.icons["folders"] = cbn_folders;
