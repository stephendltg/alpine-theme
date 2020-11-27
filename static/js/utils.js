/**
 * Name: utils
 * Description: utils for environment alpinejs
 * Sub Module: utils.js
 * Author: Epyo - stephen D.
 * Version: 1.0.0
 */

export const registerComponents = components => {
  return Promise.all(
    components.map(component => {
      return import(`./components/${component}.js`).then(module => window[component] = module.default)
    })
  )
}

export const buildComponent = (data, methods = {}, init = () => {}) => {
  return () => { return { init, ...data, ...methods } }
}

export const registerLayouts = layouts => {
  let layers = []
  return Promise.all( 
    layouts.map(url => 
      _fetch(url)
      .then(res => res.text())
      .then(data => 
        layers.push({
          url: url,
          data: data
        }) 
      ) 
    )
  )
  .then(data => layers.map( x => {
      [...document.querySelectorAll("[x-src='"+x.url+"']")].map(e => e.innerHTML = x.data )
    })
  )
}


export const _fetch = ( uri, options = {}, timeout = 1000 ) => {
  const req = fetch( uri, options );
  const TIMEOUT = new Promise((resolve, reject) => {
   return setTimeout(() => reject(new Error('request timeout')), timeout );
  })
  return Promise.race([req, TIMEOUT]).then(response => response);
}


export const loadScript = src => {
  return new Promise( function (resolve, reject) {
    if( document.querySelector('script[src="'+src+'"]') ){
      resolve();
      return;
    }
    let el = document.createElement('script')
    el.type = 'text/javascript'
    el.async = true
    el.src = src
    el.addEventListener('load',  resolve)
    el.addEventListener('error', reject)
    el.addEventListener('abort', reject)
    document.head.appendChild(el)
  })
}

export const unloadScript = src => {
  return new Promise( function (resolve, reject) {
    const el = document.querySelector('script[src="'+src+'"]')
    if(!el){
      reject()
      return
    }
    document.head.removeChild(el);
    resolve();
  })
}

