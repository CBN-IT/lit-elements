const hasChanged = (changedProperties, deps) => deps.some(dep => changedProperties.has(dep)),
    flattenDeps = (depList, deps, initSet = new Set()) =>
        deps.reduce((set, dep) => {
            if (set.has(dep)) {
                return set;
            }
            set.add(dep);
            const prop = depList.find(d => d.key === dep);
            if (prop != null) {
                return flattenDeps(depList, prop.deps, set);
            }
            return set;
        }, initSet),
    computingMixin = baseClass =>
        class extends baseClass {
            static createProperty(name, options) {
                if (typeof options.compute === "string") {
                    if (this.__computedProps === undefined) {
                        this.__computedProps = [];
                    }
                    this.__computedProps.push({
                        key: name,
                        compute: options.compute,
                        deps: options.deps
                    });
                    this.__computedProps.sort(({key: aKey, deps: aDeps}, {key: bKey, deps: bDeps}) => {
                        const faDeps = flattenDeps(this.__computedProps, aDeps),
                            fbDeps = flattenDeps(this.__computedProps, bDeps);
                        console.log(faDeps, fbDeps);

                        if (faDeps.has(bKey)) {
                            return 1;
                        }
                        if (fbDeps.has(aKey)) {
                            return -1;
                        }
                        return 0;
                    });
                }
                super.createProperty(name, options);
            }
            update(changedProperties) {

                /**
                 * We can't use things like .filter() because each iteration, changedProperties might
                 * be extended.
                 */
                if (this.constructor.__computedProps !== undefined) {
                    for (const prop of this.constructor.__computedProps) {
                        if (hasChanged(changedProperties, prop.deps)) {
                            this[prop.key] = this[prop.compute](...prop.deps.map(dep => this[dep]));
                        }
                    }
                }
                super.update(); // call last to defer render
            }
        };

export {computingMixin};