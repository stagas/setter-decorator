import { defineAccessors } from 'define-accessors'

const ctors = new WeakMap()

/**
 * Decorates a class as `@settable`. This is required for `@setter` to work.
 *
 * ```ts
 * @settable
 * class Data { ... }
 * ```
 *
 * @param ctor The class to decorate
 * @returns The decorated class
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const settable = (ctor: any) => {
  // we decorate by inheriting from the previous constructor
  // and try to copy the values to our internal data state
  const Ctor = class extends ctor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any) {
      super(...args)
      // we fetch the properties from the constructor function
      const props = ctors.get(ctor)
      const data = Object.fromEntries(
        [...props].map(([key, fn]) => [key, fn.call(this, this[key])])
      )
      defineAccessors(this, data, key => {
        const fn = props.get(key)
        return {
          configurable: false,
          enumerable: true,
          get() {
            return data[key]
          },
          set(value: never) {
            data[key] = fn.call(this, value, data[key])
          },
        }
      })
    }
  }
  Object.defineProperty(Ctor, 'name', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: ctor.name,
  })
  // type doesn't matter since TS is ignoring decorator return types
  // but maybe in the future it will change:
  // https://github.com/microsoft/TypeScript/issues/4881
  return Ctor as typeof ctor
}

/**
 * Attaches a `@setter` to a property.
 *
 * ```ts
 * @settable
 * class Data {
 *   @setter(value => (value != null ? +value : value))
 *   foo?: number
 *
 *   @setter(value => value != null)
 *   bar!: boolean
 *
 *   @setter(value => value[0].toUpperCase() + value.slice(1))
 *   name = 'john'
 * }
 * ```
 * Or alternatively you could prefactor the decorators like so:
 *
 * ```ts
 * const nullableNumber = setter(value => (value != null ? +value : value))
 * const boolean = setter(value => value != null)
 * const personName = setter(value => value[0].toUpperCase() + value.slice(1).toLowerCase())
 *
 * @settable
 * class Data {
 *   @nullableNumber
 *   foo?: number
 *
 *   @boolean
 *   bar!: boolean
 *
 *   @personName
 *   name = 'john'
 * }
 * ```
 * @param fn The setter function
 * @returns A property decorator
 */
export const setter =  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (fn: (newValue?: any, oldValue?: any) => unknown): PropertyDecorator =>
  (target, propertyKey) => {
    // the constructor here points to the old, undecorated version
    // that we inherit from so we store a pointer and retrieve
    // in our constructor (see above)
    const ctor = target.constructor

    let props
    if (!ctors.has(ctor)) {
      props = new Map()
      ctors.set(ctor, props)
    } else {
      props = ctors.get(ctor)
    }

    props.set(propertyKey, fn)
  }
