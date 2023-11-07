// noinspection NestedAssignmentJS,AssignmentResultUsedJS

"use strict";
import {editor_attach_file, editor_attach_money, editor_border_all, editor_border_bottom, editor_border_clear, editor_border_color, editor_border_horizontal, editor_border_inner, editor_border_left, editor_border_outer, editor_border_right, editor_border_style, editor_border_top, editor_border_vertical, editor_bubble_chart, editor_drag_handle, editor_format_align_center, editor_format_align_justify, editor_format_align_left, editor_format_align_right, editor_format_bold, editor_format_clear, editor_format_color_fill, editor_format_color_reset, editor_format_color_text, editor_format_indent_decrease, editor_format_indent_increase, editor_format_italic, editor_format_line_spacing, editor_format_list_bulleted, editor_format_list_numbered, editor_format_paint, editor_format_quote, editor_format_shapes, editor_format_size, editor_format_strikethrough, editor_format_textdirection_l_to_r, editor_format_textdirection_r_to_l, editor_format_underlined, editor_functions, editor_highlight, editor_insert_chart, editor_insert_comment, editor_insert_drive_file, editor_insert_emoticon, editor_insert_invitation, editor_insert_link, editor_insert_photo, editor_linear_scale, editor_merge_type, editor_mode_comment, editor_mode_edit, editor_monetization_on, editor_money_off, editor_multiline_chart, editor_pie_chart, editor_pie_chart_outlined, editor_publish, editor_short_text, editor_show_chart, editor_space_bar, editor_strikethrough_s, editor_text_fields, editor_title, editor_vertical_align_bottom, editor_vertical_align_center, editor_vertical_align_top, editor_wrap_text} from '../icons.js';

if(window.icons === undefined){ window.icons = {}; }
window.icons["editor:attach-file"] = window.icons["attach-file"] = editor_attach_file;
window.icons["editor:attach-money"] = window.icons["attach-money"] = editor_attach_money;
window.icons["editor:border-all"] = window.icons["border-all"] = editor_border_all;
window.icons["editor:border-bottom"] = window.icons["border-bottom"] = editor_border_bottom;
window.icons["editor:border-clear"] = window.icons["border-clear"] = editor_border_clear;
window.icons["editor:border-color"] = window.icons["border-color"] = editor_border_color;
window.icons["editor:border-horizontal"] = window.icons["border-horizontal"] = editor_border_horizontal;
window.icons["editor:border-inner"] = window.icons["border-inner"] = editor_border_inner;
window.icons["editor:border-left"] = window.icons["border-left"] = editor_border_left;
window.icons["editor:border-outer"] = window.icons["border-outer"] = editor_border_outer;
window.icons["editor:border-right"] = window.icons["border-right"] = editor_border_right;
window.icons["editor:border-style"] = window.icons["border-style"] = editor_border_style;
window.icons["editor:border-top"] = window.icons["border-top"] = editor_border_top;
window.icons["editor:border-vertical"] = window.icons["border-vertical"] = editor_border_vertical;
window.icons["editor:bubble-chart"] = window.icons["bubble-chart"] = editor_bubble_chart;
window.icons["editor:drag-handle"] = window.icons["drag-handle"] = editor_drag_handle;
window.icons["editor:format-align-center"] = window.icons["format-align-center"] = editor_format_align_center;
window.icons["editor:format-align-justify"] = window.icons["format-align-justify"] = editor_format_align_justify;
window.icons["editor:format-align-left"] = window.icons["format-align-left"] = editor_format_align_left;
window.icons["editor:format-align-right"] = window.icons["format-align-right"] = editor_format_align_right;
window.icons["editor:format-bold"] = window.icons["format-bold"] = editor_format_bold;
window.icons["editor:format-clear"] = window.icons["format-clear"] = editor_format_clear;
window.icons["editor:format-color-fill"] = window.icons["format-color-fill"] = editor_format_color_fill;
window.icons["editor:format-color-reset"] = window.icons["format-color-reset"] = editor_format_color_reset;
window.icons["editor:format-color-text"] = window.icons["format-color-text"] = editor_format_color_text;
window.icons["editor:format-indent-decrease"] = window.icons["format-indent-decrease"] = editor_format_indent_decrease;
window.icons["editor:format-indent-increase"] = window.icons["format-indent-increase"] = editor_format_indent_increase;
window.icons["editor:format-italic"] = window.icons["format-italic"] = editor_format_italic;
window.icons["editor:format-line-spacing"] = window.icons["format-line-spacing"] = editor_format_line_spacing;
window.icons["editor:format-list-bulleted"] = window.icons["format-list-bulleted"] = editor_format_list_bulleted;
window.icons["editor:format-list-numbered"] = window.icons["format-list-numbered"] = editor_format_list_numbered;
window.icons["editor:format-paint"] = window.icons["format-paint"] = editor_format_paint;
window.icons["editor:format-quote"] = window.icons["format-quote"] = editor_format_quote;
window.icons["editor:format-shapes"] = window.icons["format-shapes"] = editor_format_shapes;
window.icons["editor:format-size"] = window.icons["format-size"] = editor_format_size;
window.icons["editor:format-strikethrough"] = window.icons["format-strikethrough"] = editor_format_strikethrough;
window.icons["editor:format-textdirection-l-to-r"] = window.icons["format-textdirection-l-to-r"] = editor_format_textdirection_l_to_r;
window.icons["editor:format-textdirection-r-to-l"] = window.icons["format-textdirection-r-to-l"] = editor_format_textdirection_r_to_l;
window.icons["editor:format-underlined"] = window.icons["format-underlined"] = editor_format_underlined;
window.icons["editor:functions"] = window.icons["functions"] = editor_functions;
window.icons["editor:highlight"] = window.icons["highlight"] = editor_highlight;
window.icons["editor:insert-chart"] = window.icons["insert-chart"] = editor_insert_chart;
window.icons["editor:insert-comment"] = window.icons["insert-comment"] = editor_insert_comment;
window.icons["editor:insert-drive-file"] = window.icons["insert-drive-file"] = editor_insert_drive_file;
window.icons["editor:insert-emoticon"] = window.icons["insert-emoticon"] = editor_insert_emoticon;
window.icons["editor:insert-invitation"] = window.icons["insert-invitation"] = editor_insert_invitation;
window.icons["editor:insert-link"] = window.icons["insert-link"] = editor_insert_link;
window.icons["editor:insert-photo"] = window.icons["insert-photo"] = editor_insert_photo;
window.icons["editor:linear-scale"] = window.icons["linear-scale"] = editor_linear_scale;
window.icons["editor:merge-type"] = window.icons["merge-type"] = editor_merge_type;
window.icons["editor:mode-comment"] = window.icons["mode-comment"] = editor_mode_comment;
window.icons["editor:mode-edit"] = window.icons["mode-edit"] = editor_mode_edit;
window.icons["editor:monetization-on"] = window.icons["monetization-on"] = editor_monetization_on;
window.icons["editor:money-off"] = window.icons["money-off"] = editor_money_off;
window.icons["editor:multiline-chart"] = window.icons["multiline-chart"] = editor_multiline_chart;
window.icons["editor:pie-chart"] = window.icons["pie-chart"] = editor_pie_chart;
window.icons["editor:pie-chart-outlined"] = window.icons["pie-chart-outlined"] = editor_pie_chart_outlined;
window.icons["editor:publish"] = window.icons["publish"] = editor_publish;
window.icons["editor:short-text"] = window.icons["short-text"] = editor_short_text;
window.icons["editor:show-chart"] = window.icons["show-chart"] = editor_show_chart;
window.icons["editor:space-bar"] = window.icons["space-bar"] = editor_space_bar;
window.icons["editor:strikethrough-s"] = window.icons["strikethrough-s"] = editor_strikethrough_s;
window.icons["editor:text-fields"] = window.icons["text-fields"] = editor_text_fields;
window.icons["editor:title"] = window.icons["title"] = editor_title;
window.icons["editor:vertical-align-bottom"] = window.icons["vertical-align-bottom"] = editor_vertical_align_bottom;
window.icons["editor:vertical-align-center"] = window.icons["vertical-align-center"] = editor_vertical_align_center;
window.icons["editor:vertical-align-top"] = window.icons["vertical-align-top"] = editor_vertical_align_top;
window.icons["editor:wrap-text"] = window.icons["wrap-text"] = editor_wrap_text;
