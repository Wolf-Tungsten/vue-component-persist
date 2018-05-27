# vue-component-persist

> Persist data in localStorage or anywhere for Vue.js apps

## Install

```bash
yarn add vue-component-persist
```

## Usage

```js
import Persist from 'vue-component-persist'

Vue.use(Persist)

new Vue({
  template: '<input v-model="text" v-if="shown" />',

  data: {
    text: '',
    shown: false
  },

  persist: {
    text: 'persist-key:text',
    shown: {
      key: 'persist-key:shown',
      expiration: 1000 * 60
    }
  }
})
```

Then the data of `text` and `shown` will be stored at localStorage and kept in sync.

## API

### Vue.use(Persist, [options])

#### options

##### read

Type: `function`<br>
Default: `k => localStorage.getItem(k)`

The function we use to get stored data.

##### write

Type: `function`<br>
Default: `(k, v) => localStorage.setItem(k, v)`

The function we use to store data.

##### clear

Type: `function`<br>
Default: `k => localStorage.removeItem(k)`

The function we use to clear data in store.

## Original author

**vue-persist** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/vue-persist/contributors)).

> [egoistian.com](https://egoistian.com) · GitHub [@egoist](https://github.com/egoist) · Twitter [@rem_rin_rin](https://twitter.com/rem_rin_rin)
