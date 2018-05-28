export default function (Vue, {
  name: defaultStoreName = 'persist:store',
  expiration: defaultExpiration,
  read = k => JSON.parse(localStorage.getItem(k)),
  write = (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  clear = k => localStorage.removeItem(k)
} = {}) {
  const store = new Proxy({}, {
    get (target, key) {
      return read(key)
    },
    set (target, key, value) {
      write(key, value)
      return true
    },
    deleteProperty (target, key) {
      clear(key)
    }
  })

  Vue.mixin({
    beforeCreate() {
      this.$persist = obj => {
        Object.getOwnPropertyNames(obj).map(prop => {
          let config = obj[prop]
          if (typeof config === 'string') {
            config = { key: config }
          }
          config = Object.assign({ expiration: 0 }, config)

          if (store[config.key]) {
            if (isExpired(store[config.key].expiration)) {
              delete store[config.key]
            } else {
              this[prop] = store[config.key].data
            }
          }

          this.$watch(prop, val => {
            store[config.key] = {
              data: val,
              expiration: getExpiration(config.expiration)
            }
          }, { deep: true })
        })
      }
    },

    created() {
      const { persist } = this.$options
      if (persist) {
        this.$persist(persist)
      }
    }
  })
}

function getExpiration(exp) {
  return exp ? Date.now() + exp : 0
}

function isExpired(exp) {
  return exp && (Date.now() > exp)
}
