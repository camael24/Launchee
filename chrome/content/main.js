const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");




var log = (function ( ) {

    var i = 0;

    return function ( msg ) {

        dump('#' + i++ + ' ' + msg + '\n');
    };
})();


var $ = function ( selector ) {

    return document.querySelector(selector);
};

var $$ = function ( selector ) {

    return document.querySelectorAll(selector);
}

log('Start Main.js');

function refresh(){
	alert('refresh');
}

$('#titlebar-name').value = $('#main').getAttribute('title')

