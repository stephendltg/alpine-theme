import { registerComponents, registerLayouts, loadScript } from './utils.js'
import ('./vendors/spruce.js')
import ('./store.js')

/* 
 * materialdesign js
 *
 */
loadScript('./static/js/vendors/materialize.min.js')
.then( e => {
  
  // Floating button
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left'
  });

  // Date picker
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems);
})

const components = [...document.querySelectorAll("[x-data$='()']")].map(component => {
  return component.getAttribute('x-data').slice(0,-2)
})

const layouts = [...document.querySelectorAll("[x-src]")].map(layer => layer.getAttribute('x-src'))



;(async () => {
    
  await registerLayouts(layouts)
  await registerComponents(components)

  await import('./vendors/alpine-magic-helper.js')
  await import('./vendors/alpine.js')
  
})()
