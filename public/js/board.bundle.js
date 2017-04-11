webpackJsonp([3],{

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  console.log("board");
  var socket = io('/' + document.body.getAttribute("data-slug"));
  socket.on('client', function (data) {
    console.log(data);
  });
})();

/***/ })

},[84]);