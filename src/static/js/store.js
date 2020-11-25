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
    name: 'Stephen',
    email: 'support@ryangjchandler.co.uk',
})

Spruce.watch('user.name', value => console.log(value))

