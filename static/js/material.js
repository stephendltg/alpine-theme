/**
 * Name: material
 * Description: function for material js
 * Sub Module: material.js
 * Author: Epyo - stephen D.
 * Version: 1.0.0
 */

// Floating button
var elems = document.querySelectorAll('.fixed-action-btn');
var instances = M.FloatingActionButton.init(elems, {
  direction: 'left'
});

// Date picker
var elems = document.querySelectorAll('.datepicker');
var instances = M.Datepicker.init(elems);

