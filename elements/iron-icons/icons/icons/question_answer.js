import {svg} from 'lit'
export const icons_question_answer = svg`<svg viewBox="0 0 24 24" id="question-answer"><g><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"></path></g></svg>`;
export const question_answer = icons_question_answer;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:question-answer"] = window.icons["question-answer"] = icons_question_answer;
