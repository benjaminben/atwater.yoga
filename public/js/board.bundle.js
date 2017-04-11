webpackJsonp([3],{

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var main = document.querySelector("main");

var slug = document.body.getAttribute("data-slug");
console.log(slug + " board");

var socket = io("/" + slug);
socket.on('el', function (data) {
  console.log("new el:", data);

  var node = document.createElement("span");
  main.appendChild(node);
  node.outerHTML = data;
});

/***/ })

},[84]);