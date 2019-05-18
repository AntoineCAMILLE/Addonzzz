'use strict';

const AllianceChat = () => {
	
	let t;
	let msgDiv;
	
	const envoiChat = () => {
	$.ajax({
		url : "appelAjax.php",
		type : 'GET',
		data: "actualiserChat=alliance&message=%5Bcolor%3D%23000031%5D%20"+ encodeURIComponent($('#messageInput').val())+"&inputCouleur=000000&t=" + t,
		success : (data) => $('#anciensMessages').prepend(data.message)
	});
	}

	const updateChat = () => {
	$.ajax({
		url : "appelAjax.php",
		type : 'GET',
		data: "actualiserChat=alliance",
		success : (data) => $('#anciensMessages').prepend(data.message)
	});
	}

	const getMessages = () => {
		$.ajax({url: "http://s4.fourmizzz.fr/alliance.php",
				success: (data) => {
					const dom = $(data);
					const target = $('#anciensMessages');
					dom.find('#anciensMessages').each((idx, msg) => {
						target.append(msg);
					}).css('padding-left', '2px');
					setInterval(updateChat, 10000);
				}
			   });
	};
	
	const init = () => {


	const msgDivCSS = {
		'overflow-x': 'hidden',
		'background-color': 'khaki',
		right: '0px',
		width: '240px',
		position: 'fixed',
		'border-left': '2px black solid',
		'overflow-y': 'scroll',
		height: '100%'
					  };

		$('#droite').before('<div id="allianceMessages"></div>').remove();
		msgDiv = $('#allianceMessages');
		msgDiv.append('<h4 style="text-align: center;">Chat d\'alliance</h4><input type="text" id="messageInput"><div id="anciensMessages></div>"');
		t = dom.find('#t').val();
		$('#messageInput').css('width', '223px')
		.keypress((e) => {
		if (e.keyCode === 13) {
			envoiChat();
			getMessages();
			}
		});
		msgDiv.css(msgDivCSS);
		getMessages();
		setInterval(updateChat, 10000)
	}
	init();
}

if (window.location.pathname !== "/alliance.php") {
	AllianceChat();
}

