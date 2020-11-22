import Spruce from 'https://cdn.jsdelivr.net/gh/ryangjchandler/spruce@1.x.x/dist/spruce.module.js'


Spruce.store('counter', {
  count: 0,
  countUp: 0,
  countDown: 100
})

// persitent store
Spruce.store('toast', {
    toasts: [],
    add(message) {
        this.toasts.push(message)
    },
    remove(index) {
        this.toasts.splice(index, 1)
    }
}, true )


Spruce.store('user', {
    name: 'Ryan Chandler',
    email: 'support@ryangjchandler.co.uk',
})

Spruce.watch('user.name', value => console.log(value))

export default Spruce
