import { registerComponents, registerLayouts } from './utils.js'
import './store.js'

const components = [...document.querySelectorAll("[x-data$='()']")].map(component => {
  return component.getAttribute('x-data').slice(0,-2)
})

const layouts = [...document.querySelectorAll("[x-src]")].map(layer => layer.getAttribute('x-src'))

;(async () => {
  /*
  await registerComponents({
    toggle: './components/toggle.js'
  })
  */
  /*
  fetch('./layouts/header.html?nocache='+ Math.random())
  .then(response => response.text())
  .then(data => document.querySelector("header").innerHTML = data );
  */
  
  
  await registerLayouts(layouts)
  await registerComponents(components)

  await import('https://cdn.jsdelivr.net/gh/kevinbatdorf/alpine-magic-helpers@0.3.x/dist/index.js')
  await import('https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js')  
})()
  
