// ==UserScript==
// @name         Alliance chat
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://s4.fourmizzz.fr/*
// @exclude      http://s4.fourmizzz.fr/alliance.php
// @grant        none
// ==/UserScript==

'use strict';
let t;

function envoiChat(){
$.ajax({
	url : "appelAjax.php",
	type : 'GET',
	data: "actualiserChat=alliance&message=%5Bcolor%3D%23000031%5D%20"+ encodeURIComponent($('#message').val())+"&inputCouleur=000000&t=" + t,
	success : function(data){
        console.log(data);
        $('#message').val("");
        $('#anciensMessages').prepend(data.message);
	}
});
}

function updateChat(){
$.ajax({
	url : "appelAjax.php",
	type : 'GET',
	data: "actualiserChat=alliance",
	success : function(data){
        console.log(data);
        $('#anciensMessages').prepend(data.message);
	}
});
}

const msgDivCSS = {
    'overflow-x': 'hidden',
    'background-color': 'khaki',
    right: '0px',
    width: '240px',
    position: 'fixed',
    'border-left': '2px black solid',
    'overflow-y': 'scroll',
    height: '100%'
                  }

const main = () => {
    $.ajax({url: "http://s4.fourmizzz.fr/alliance.php",
            success: (data) => {
                const dom = $(data);
                $('#droite').before('<div id="allianceMessages"></div>').remove();
                const msgDiv = $('#allianceMessages');
                msgDiv.append('<h4 style="text-align: center;">Chat d\'alliance</h4><input type="text" id="message">');
                t = dom.find('#t').val();
                $('#message').css('width', '223px')
                .keypress((e) => {
                    if (e.keyCode === 13) {
                        envoiChat();
                    }
                });
                msgDiv.css(msgDivCSS);
                //msgDiv.append(dom.find('#formulaireChat'));
                dom.find('#anciensMessages').each((idx, msg) => {
                    msgDiv.append(msg);
                }).css('padding-left', '2px');
                setInterval(updateChat, 3000);
            }
           });
}
main();