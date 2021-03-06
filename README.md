<h1 align="center">setter-decorator</h1>

<p align="center">
decorator that attaches setters to properties
</p>

<p align="center">
   <a href="#install">        馃敡 <strong>Install</strong></a>
 路 <a href="#example">        馃З <strong>Example</strong></a>
 路 <a href="#api">            馃摐 <strong>API docs</strong></a>
 路 <a href="https://github.com/stagas/setter-decorator/releases"> 馃敟 <strong>Releases</strong></a>
 路 <a href="#contribute">     馃挭馃徏 <strong>Contribute</strong></a>
 路 <a href="https://github.com/stagas/setter-decorator/issues">   馃枑锔? <strong>Help</strong></a>
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

[src/index.ts:35-82](https://github.com/stagas/setter-decorator/blob/572b4c74029e822f2e0a8c79ca87b1bc97c016dd/src/index.ts#L35-L82 "Source code on GitHub")

Decorates a class as `@settable`. This is required for `@setter` to work.

```ts
```

#### Parameters

*   `ctor` **any** The class to decorate

Returns **any** The decorated class

### setter

[src/index.ts:122-143](https://github.com/stagas/setter-decorator/blob/572b4c74029e822f2e0a8c79ca87b1bc97c016dd/src/index.ts#L122-L143 "Source code on GitHub")

Attaches a `@setter` to a property.

```ts
```

#### Parameters

*   `fn` **Setter** The setter function

Returns **PropertyDecorator** A property decorator

## Contribute

[Fork](https://github.com/stagas/setter-decorator/fork) or
[edit](https://github.dev/stagas/setter-decorator) and submit a PR.

All contributions are welcome!

## License

MIT 漏 2021
[stagas](https://github.com/stagas)
