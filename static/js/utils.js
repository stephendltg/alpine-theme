/**
 * Name: utils
 * Description: utils for environment alpinejs
 * Sub Module: utils.js
 * Author: Epyo - stephen D.
 * Version: 1.0.0
 */
 
// Global - lang
const lang = navigator.language || navigator.userLanguage

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
      .then(data => layers.push({ url: url, data: data }) ) 
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

/*
 * 
 * const formattedDateStr = humanTime('2017-11-18T10:11:47.232Z');

 * or a Date object
 * const formattedDateObj = humanTime(new Date());
 * const formattedDateObjFrenchCanadian = humanTime(new Date(), 'fr-CA');
 */
export const humanDate = (date, locales = 'default-u-nu-latn') => {
    let dateObj;
    if (typeof date === 'string') dateObj = new Date(date);
    else dateObj = date;

    const options = { month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const dateYear = dateObj.toLocaleString(locales, { year: 'numeric' });
    const dateMonth = dateObj.toLocaleString(locales, { month: 'numeric' });
    const dateDay = dateObj.toLocaleString(locales, { day: 'numeric' });
    const dateHour = dateObj.getHours();
    const dateMinute = dateObj.getMinutes();

    const now = new Date();
    const nowYear = now.toLocaleString(locales, { year: 'numeric' });
    const nowMonth = now.toLocaleString(locales, { month: 'numeric' });
    const nowDay = now.toLocaleString(locales, { day: 'numeric' });
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();

    // set year only if not the same year as now
    if (dateYear !== nowYear) options.year = 'numeric';

    // if today, display relative time
    if (dateYear === nowYear && dateMonth === nowMonth && dateDay === nowDay) {
        const diffHour = nowHour - dateHour;
        const diffMinute = Math.abs(nowMinute - dateMinute);

        if (diffHour === 0 && diffMinute > 30) return '1 h';
        else if (diffHour === 0) return `${diffMinute} min`;
        else if (diffMinute >= 30) return `${diffHour + 1} h`;
        return `${diffHour} h`;
    }

    return dateObj.toLocaleString(locales, options);
}

/*
 	* Translate
 	*
 	* usage: __( 'text' )
 	*        __( 'Hello %s', 'Brian')
 	*
 	*/
export const __ = function(text, ...args) {
    if (typeof text != "string") return text;
    text = text.trim()
    if (text.length == 0) return ""
    if ( typeof i18n != "undefined" && i18n.hasOwnProperty(lang.toLowerCase()) && i18n[lang.toLowerCase()].hasOwnProperty(text) ) {
      text = i18n[lang.toLowerCase()][text]
    }
    let i = 0;
    return text.replace(/%s/g, () => args[i++])
  }

	/*
 	* Function translate singular / plural
 	*
 	* Usage: _n( car, cars, 10 )
 	*
 	*/
export const _n = function(singular, plural, number, ...args) {
  if (typeof number === "number" && isFinite(number) && number > 1) {
    return __(plural, ...args)
  }
  return __(singular, ...args)
}



/*
 * i18n - functions global for template
 */
import {i18n} from './i18n/dictionnary.js'
window._date = ( date = new Date() ) => humanDate( date, lang )
window.__ = ( text, ...args ) => __( text, ...args )
window._n = ( singular, plural, number, ...args ) => _n( singular, plural, number, ...args)

