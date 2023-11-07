import {svg} from 'lit'
export const icons_settings_backup_restore = svg`<svg viewBox="0 0 24 24" id="settings-backup-restore"><g><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></g></svg>`;
export const settings_backup_restore = icons_settings_backup_restore;
if(window.icons === undefined){ window.icons = {}; }
window.icons["icons:settings-backup-restore"] = window.icons["settings-backup-restore"] = icons_settings_backup_restore;
