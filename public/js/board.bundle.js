webpackJsonp([3],{

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var main = document.querySelector("main");

var slug = document.body.getAttribute("data-slug");
console.log(slug + " board");

var makeEl = function makeEl(data) {
  var node = document.createElement("span");
  main.appendChild(node);
  node.outerHTML = data;
};

var socket = io("/" + slug);
socket.on('initEls', function (data) {
  data.forEach(function (d) {
    makeEl(d);
  });
});
socket.on('el', function (data) {
  console.log("new el:", data);
  makeEl(data);
});

/***/ })

},[84]);