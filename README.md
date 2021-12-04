<h1 align="center">setter-decorator</h1>

<p align="center">
decorator that attaches setters to properties
</p>

<p align="center">
   <a href="#install">        🔧 <strong>Install</strong></a>
 · <a href="#example">        🧩 <strong>Example</strong></a>
 · <a href="#api">            📜 <strong>API docs</strong></a>
 · <a href="https://github.com/stagas/setter-decorator/releases"> 🔥 <strong>Releases</strong></a>
 · <a href="#contribute">     💪🏼 <strong>Contribute</strong></a>
 · <a href="https://github.com/stagas/setter-decorator/issues">   🖐️ <strong>Help</strong></a>
</p>

***

## Install

```sh
$ npm i setter-decorator
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [settable](#settable)
    *   [Parameters](#parameters)
*   [setter](#setter)
    *   [Parameters](#parameters-1)

### settable

[src/index.ts:17-52](https://github.com/stagas/setter-decorator/blob/bec6119780ba541811a2b943018055864fec875b/src/index.ts#L17-L52 "Source code on GitHub")

Decorates a class as `@settable`. This is required for `@setter` to work.

```ts
​@settable
class Data { ... }
```

#### Parameters

*   `ctor` **any** The class to decorate

Returns **any** The decorated class

### setter

[src/index.ts:92-109](https://github.com/stagas/setter-decorator/blob/bec6119780ba541811a2b943018055864fec875b/src/index.ts#L92-L109 "Source code on GitHub")

Attaches a `@setter` to a property.

```ts
​@settable
class Data {
  ​@setter(value => (value != null ? +value : value))
  foo?: number

  ​@setter(value => value != null)
  bar!: boolean

  ​@setter(value => value[0].toUpperCase() + value.slice(1))
  name = 'john'
}
```

Or alternatively you could prefactor the decorators like so:

```ts
const nullableNumber = setter(value => (value != null ? +value : value))
const boolean = setter(value => value != null)
const personName = setter(value => value[0].toUpperCase() + value.slice(1).toLowerCase())

​@settable
class Data {
  ​@nullableNumber
  foo?: number

  ​@boolean
  bar!: boolean

  ​@personName
  name = 'john'
}
```

#### Parameters

*   `fn` **function (newValue: any, oldValue: any): any** The setter function

Returns **PropertyDecorator** A property decorator

## Contribute

[Fork](https://github.com/stagas/setter-decorator/fork) or
[edit](https://github.dev/stagas/setter-decorator) and submit a PR.

All contributions are welcome!

## License

MIT © 2021
[stagas](https://github.com/stagas)
