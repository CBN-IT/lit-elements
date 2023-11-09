import {AttributePart, noChange, nothing} from "lit"
import {
    directive,
    Directive,
    DirectiveParameters,
    PartInfo,
    PartType,
} from 'lit/directive';
import {isSingleExpression, setCommittedValue} from "lit/directive-helpers"

/*
https://github.com/Polymer/lit-html/issues/877
https://github.com/Polymer/lit-html/issues/872#issuecomment-474698152
Does not work with live, cause when we change the model,
the select doesn't throw a changed event and we dont populate the model with _label

const forceWrite = directive((value) => (part) => {
    part.setValue(value);
});
*/
class ForceWriteDirective extends Directive {
    constructor(partInfo: PartInfo) {
        super(partInfo);
        if (
            !(
                partInfo.type === PartType.PROPERTY ||
                partInfo.type === PartType.ATTRIBUTE ||
                partInfo.type === PartType.BOOLEAN_ATTRIBUTE
            )
        ) {
            throw new Error(
                'The `live` directive is not allowed on child or event bindings'
            );
        }
        if (!isSingleExpression(partInfo)) {
            throw new Error('`live` bindings can only contain a single expression');
        }
    }

    render(value: unknown) {
        return value;
    }

    override update(part: AttributePart, [value]: DirectiveParameters<this>) {
        if (value === noChange || value === nothing) {
            return value;
        }
        const element = part.element;
        const name = part.name;

        if (part.type === PartType.PROPERTY) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } else if (part.type === PartType.BOOLEAN_ATTRIBUTE) {
            if (!!value === element.hasAttribute(name)) {
                return noChange;
            }
        } else if (part.type === PartType.ATTRIBUTE) {
            if (element.getAttribute(name) === String(value)) {
                return noChange;
            }
        }
        // Resets the part's value, causing its dirty-check to fail so that it
        // always sets the value.
        setCommittedValue(part);
        return value;
    }
}

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
export const forceWrite = directive(ForceWriteDirective);

/**
 * The type of the class that powers this directive. Necessary for naming the
 * directive's return type.
 */
export type {ForceWriteDirective};