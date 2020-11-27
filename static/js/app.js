/**
 * Name: app
 * Description: app
 * Author: Epyo - stephen D.
 * Version: 1.0.0
 */
import { registerComponents, registerLayouts, loadScript } from './utils.js'


const components = [...document.querySelectorAll("[x-data$='()']")].map(component => {
  return component.getAttribute('x-data').slice(0,-2)
})

const layouts = [...document.querySelectorAll("[x-src]")].map(layer => layer.getAttribute('x-src'))


;(async () => {
  
  await import ('./vendors/spruce.js')
  await import ('./store.js')
  
  await registerLayouts(layouts)
  await registerComponents(components)
  
  loadScript('./static/js/vendors/materialize.min.js')
  .then( e => console.log('materialize loaded') )
  .catch( e => console.warn('error: materialize  unloaded') )

  await import('./vendors/alpine-magic-helper.js')
  await import('./vendors/alpine.js')

  await import('./material.js')
  
})()

