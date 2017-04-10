webpackJsonp([3],{

/***/ 2:
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

},[2]);