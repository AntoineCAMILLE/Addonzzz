'use strict';

const AllianceChat = () => {

	let t;
	let msgDiv;
    let dom;

	const envoiChat = () => {
	$.ajax({
		url : "appelAjax.php",
		type : 'GET',
		data: "actualiserChat=alliance&message=%5Bcolor%3D%23000031%5D%20"+ encodeURIComponent($('#messageInput').val())+"&inputCouleur=000000&t=" + t,
		success : (data) => {
            $('#messageInput').val("");
            $('#anciensMessages').prepend(data.message);
        }
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
					dom = $(data);
                    t = dom.find('#t').val();
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
		//width: '250px',
		position: 'fixed',
		'border-left': '2px black solid',
		'overflow-y': 'scroll',
		height: '100%',
        "background-image" : "none"
					  };

		$('#droite').before('<div id="allianceMessages"></div>').remove();
		msgDiv = $('#allianceMessages').attr('id', 'droite');
        msgDiv.css(msgDivCSS);
		msgDiv.append('<h4 style="text-align: center;">Chat d\'alliance</h4><input type="text" id="messageInput"><div id="anciensMessages"></div>');
        getMessages();
		$('#messageInput').css({width: '99%', 'margin-left': '2px'})
		.keypress((e) => {
		if (e.keyCode === 13) {
			envoiChat();
			}
		});
		setInterval(updateChat, 10000)
	}
	init();
}

if (window.location.pathname !== "/alliance.php" || window.location.search.length > 0) {
	AllianceChat();
}