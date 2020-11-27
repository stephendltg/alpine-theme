/**
 * Name: store
 * Description: store for alpinejs
 * Sub Module: store.js
 * Author: Epyo - stephen D.
 * Version: 1.0.0
 */

Spruce.store('counter', {
  count: 0,
  countUp: 0,
  countDown: 100
})


Spruce.store('toast', {
    toasts: ["<i>test</i>"],
    add(message) {
        this.toasts.push(message)
    },
    remove(index) {
        this.toasts.splice(index, 1)
    }
} )


Spruce.store('user', {
    name: 'stephendtlg',
    email: 's.deletang@icloud.com',
})

Spruce.watch('user.name', value => console.log(value))

