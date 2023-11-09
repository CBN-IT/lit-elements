"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceWrite = void 0;
var lit_1 = require("lit");
var directive_1 = require("lit/directive");
var directive_helpers_1 = require("lit/directive-helpers");
/*
https://github.com/Polymer/lit-html/issues/877
https://github.com/Polymer/lit-html/issues/872#issuecomment-474698152
Does not work with live, cause when we change the model,
the select doesn't throw a changed event and we dont populate the model with _label

const forceWrite = directive((value) => (part) => {
    part.setValue(value);
});
*/
var ForceWriteDirective = /** @class */ (function (_super) {
    __extends(ForceWriteDirective, _super);
    function ForceWriteDirective(partInfo) {
        var _this = _super.call(this, partInfo) || this;
        if (!(partInfo.type === directive_1.PartType.PROPERTY ||
            partInfo.type === directive_1.PartType.ATTRIBUTE ||
            partInfo.type === directive_1.PartType.BOOLEAN_ATTRIBUTE)) {
            throw new Error('The `live` directive is not allowed on child or event bindings');
        }
        if (!(0, directive_helpers_1.isSingleExpression)(partInfo)) {
            throw new Error('`live` bindings can only contain a single expression');
        }
        return _this;
    }
    ForceWriteDirective.prototype.render = function (value) {
        return value;
    };
    ForceWriteDirective.prototype.update = function (part, _a) {
        var value = _a[0];
        if (value === lit_1.noChange || value === lit_1.nothing) {
            return value;
        }
        var element = part.element;
        var name = part.name;
        if (part.type === directive_1.PartType.PROPERTY) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        else if (part.type === directive_1.PartType.BOOLEAN_ATTRIBUTE) {
            if (!!value === element.hasAttribute(name)) {
                return lit_1.noChange;
            }
        }
        else if (part.type === directive_1.PartType.ATTRIBUTE) {
            if (element.getAttribute(name) === String(value)) {
                return lit_1.noChange;
            }
        }
        // Resets the part's value, causing its dirty-check to fail so that it
        // always sets the value.
        (0, directive_helpers_1.setCommittedValue)(part);
        return value;
    };
    return ForceWriteDirective;
}(directive_1.Directive));
/**
 * Checks binding values against live DOM values, instead of previously bound
 * values, when determining whether to update the value.
 *
 * This is useful for cases where the DOM value may change from outside of
 * lit-html, such as with a binding to an `<input>` element's `value` property,
 * a content editable elements text, or to a custom element that changes it's
 * own properties or attributes.
 *
 * In these cases if the DOM value changes, but the value set through lit-html
 * bindings hasn't, lit-html won't know to update the DOM value and will leave
 * it alone. If this is not what you want--if you want to overwrite the DOM
 * value with the bound value no matter what--use the `live()` directive:
 *
 * ```js
 * html`<input .value=${live(x)}>`
 * ```
 *
 * `live()` performs a strict equality check against the live DOM value, and if
 * the new value is equal to the live value, does nothing. This means that
 * `live()` should not be used when the binding will cause a type conversion. If
 * you use `live()` with an attribute binding, make sure that only strings are
 * passed in, or the binding will update every render.
 */
exports.forceWrite = (0, directive_1.directive)(ForceWriteDirective);
