'use strict';

var jq = jQuery.noConflict();

console.log(jq.fn.jquery);

const Capacities = () => {
    if (window.location.pathname === '/construction.php') {
        const food = jq('#descriptionComplete9').text().split('.')[2].split(': ')[1].split('C')[0];
        const wood = jq('#descriptionComplete10').text().split('.')[2].split(': ')[1].split('C')[0];
        window.localStorage.setItem('capacities', JSON.stringify(["", food, wood]));
    }
    const target = jq('.texte_ligne_boite_info');
    let capacities = window.localStorage.getItem('capacities');
    if (capacities != null) {
        capacities = JSON.parse(capacities);
        for (let i = 1; i < 3; i++) {
            const tmp = target.eq(i);
            tmp.text(`${tmp.text()} / + ${capacities[i]}`);
        }
    }
}

const AllianceChat = () => {

	let t;
	let msgDiv;
    let dom;

	const envoiChat = () => {
        if (jq('#messageInput').val().length > 0) {
            jq.ajax({
                url : "appelAjax.php",
                type : 'GET',
                data: "actualiserChat=alliance&message=%5Bcolor%3D%23000031%5D%20"+ encodeURIComponent(jq('#messageInput').val())+"&inputCouleur=000000&t=" + t,
                success : (data) => {
                    jq('#messageInput').val("");
                    jq('#allianceMessages').prepend(data.message);
                }
            });
        }
	}

	const updateChat = () => {
	jq.ajax({
		url : "appelAjax.php",
		type : 'GET',
		data: "actualiserChat=alliance",
		success : (data) => jq('#allianceMessages').prepend(data.message)
	});
	}

	const getMessages = () => {
		jq.ajax({url: "http://s4.fourmizzz.fr/alliance.php",
				success: (data) => {
					dom = jq(data);
                    t = dom.find('#t').val();
					const target = jq('#allianceMessages');
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

		jq('#droite').before('<div id="allianceMessages"></div>').remove();
		msgDiv = jq('#allianceMessages').attr('id', 'droite');
        msgDiv.css(msgDivCSS);
		msgDiv.append('<h4 style="text-align: center;">Chat d\'alliance</h4><input type="text" id="messageInput"><div id="allianceMessages"></div>');
        getMessages();
		jq('#messageInput').css({width: '99%', 'margin-left': '2px'})
		.keypress((e) => {
		if (e.keyCode === 13) {
			envoiChat();
			}
		});
		setInterval(updateChat, 10000)
	}
	init();
}

const MenuBar = () => {

    const btnHorizontalMenu = `<li style="width: 14%;"><a id="aozidn" target="_blank" class="">Addonzzz</a></li>`
    const Menu =  `<ul id="menuAddonzzz" class="menu_colonne">
<li><a class="boutonLivre" href="cookies.php"><span></span>Cookies</a></li>
</ul>`
}

if (window.location.pathname !== "/alliance.php" || window.location.search.length > 0) {
	AllianceChat();
}

Capacities();
