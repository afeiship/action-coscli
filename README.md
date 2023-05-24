# pinia-state-tree
> Pinia state tree.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/pinia-state-tree
```

## usage
```js
import { createSSRApp, watch } from "vue";
import { createPinia } from "pinia";
import PiniaStateTree from "@jswork/pinia-state-tree";
import App from "./App.vue";

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();

  pinia.use(PiniaStateTree);
  app.use(pinia);
  //...
}
```

## features
- [x] `nx.$app`: app instance
- [x] `nx.$pinia`: pinia instance 
- [x] `nx.$get`: get state by path
- [x] `nx.$set`: set state by path
- [x] `nx.$root`: root state with set/get

## license
Code released under [the MIT license](https://github.com/afeiship/pinia-state-tree/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/pinia-state-tree
[version-url]: https://npmjs.org/package/@jswork/pinia-state-tree

[license-image]: https://img.shields.io/npm/l/@jswork/pinia-state-tree
[license-url]: https://github.com/afeiship/pinia-state-tree/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/pinia-state-tree
[size-url]: https://github.com/afeiship/pinia-state-tree/blob/master/dist/pinia-state-tree.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/pinia-state-tree
[download-url]: https://www.npmjs.com/package/@jswork/pinia-state-tree
