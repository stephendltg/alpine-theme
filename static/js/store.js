/**
 * Name: store
 * Description: store for alpinejs
 * Sub Module: store.js
 * Author: Epyo - stephen D.
 * Version: 1.0.0
 */

Spruce.store('user', {
    name: 'stephendtlg',
    email: 's.deletang@icloud.com',
})

Spruce.watch('user.name', value => console.log(value))

