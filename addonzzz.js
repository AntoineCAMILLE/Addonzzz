'use strict';

var jq = jQuery.noConflict();

console.log(jq.fn.jquery);

const createDivGauche = () => {
    const css = {
       height: '30%',
        width: 'inherit',
        position: 'fixed',
        bottom: '2px',
        'background-color': 'khaki',
        border: 'black solid 1px',
        'border-top': 0
    };
    jq('#gauche').append('<div id="bottomLeft"></div>');
    jq('#bottomLeft').css(css);
};

const Capacities = () => {
    if (window.location.pathname === '/construction.php') {
        const food = jq('#descriptionComplete9').text().split('.')[2].split(': ')[1].split('C')[0];
        const wood = jq('#descriptionComplete10').text().split('.')[2].split(': ')[1].split('C')[0];
        window.localStorage.setItem('capacities', JSON.stringify({food, wood}));
    }
    const foodImg = '<img class="icone_nourriture_boite_info" alt="Nourriture" src="images/icone/icone_pomme.png" height="20">';
    const woodImg = '<img class="icone_materiaux_boite_info" alt="Materiaux" src="images/icone/icone_bois.png" width="20">';
    const divStyle = 'style="border-bottom: 1px solid black;"';
    const title = '<h4 style="font-size: smaller;margin: 0;text-align: center;border: 1px solid black;border-left: 0;border-right: 0;">Capacités Entrepôts</h4>'
    const target = jq('#bottomLeft');
    const capacities = window.localStorage.getItem('capacities');
    if (capacities != null) {
        const {food, wood} = JSON.parse(capacities)
        target.append(`${title}<div ${divStyle}>${foodImg}<span>${food}</span></br>${woodImg}<span>${wood}</span></div>`);
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




/*
.jauge 
	width: 125%;
	__________________
	$('#centre').prepend("<td>" + $("td[rowspan='4']").html() + "</td>")
	position: absolute;
    top: 15px;

*/