
// variable of array contact & array favoris
var arrayContacts = [];
var arrayFavContacts = [];


// Remplir la liste des contact au chargement de la page
window.onload = function(){
	
	getStorageContact();
	getStorageFav();
	refrechList(); 	
	panelActive(2);
};


//ajout contact a la liste des contacts
document.getElementById('ajouter').onclick = function () {
	
	cleanErrors();
	//format d'email
	var formatEmail = /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/;
	var nom = document.getElementById('nom').value;
	var prenom = document.getElementById('prenom').value;
	var telephone = document.getElementById('telephone').value;
	var email = document.getElementById('email').value;
	var erreur = 0;
	
	if(!nom) {
		document.getElementById('erreurNom').style.display="block";
		erreur = 1;
	}
	
	if(!prenom) {
		document.getElementById('erreurPrenom').style.display="block";
		erreur = 1;
	}
	
	if(!email) {
		document.getElementById('erreurEmail').style.display="block";
		erreur = 1;
	}else{
		if(!formatEmail.test(email)){
			document.getElementById('erreurValidEmail').style.display="block";
			erreur = 1;
		}else{
			document.getElementById('erreurValidEmail').style.display="none";
		}
	}
	
	if(!telephone) {
		document.getElementById('erreurTel').style.display="block";
		erreur = 1;
	}else{
		if(isNaN(telephone)){
			document.getElementById('erreurNumTel').style.display="block";
			erreur=1;
		}else{
			document.getElementById('erreurNumTel').style.display="none";
			if (telephone.length!=10)
			{
				document.getElementById('erreurChiffre').style.display="block";
				erreur=1;
			}else{
				document.getElementById('erreurChiffre').style.display="none";
			}
		}
	}
	
	if(erreur===0){
		var cnt = {
				kid : arrayContacts.length + 1,
				knom: nom,
				kprenom: prenom,
				ktel: telephone,
				kemail: email
			};
		arrayContacts.push(cnt);
		clearInputs();
	
	
		// Enregistrement dans la session storage
		setStorageContact();

		document.getElementById('msgSuccess').innerHTML = "Le contact a été bien ajouté";
		// On l'efface 8 secondes plus tard
		setTimeout(function() {
		  document.getElementById('msgSuccess').innerHTML = "";
		},2000);
		
	}
	return false;
};

//linkAjoutContact
document.getElementById('linkAjoutContact').onclick = function(){
	panelActive(1);

	return false;
};


//linkContact
document.getElementById('linkContact').onclick = function(){
	panelActive(2);
		getStorageFav();
	refrechList();


	return false;
};

//link favoris 
document.getElementById('linkFav').onclick = function(){
	panelActive(3);
	//cacher le bloc favoris tant qu'il est vide
	if(arrayFavContacts.length){
		document.getElementById('aucunFav').innerHTML="";
		document.getElementsByTagName('thead')[1].style.display="";

	}else{
		document.getElementById('favoris').style.display="block";
		document.getElementById('contacts').style.display="none";
		document.getElementsByTagName('thead')[1].style.display="none";

		document.getElementById('aucunFav').innerHTML="Aucun contact n'est ajouté a la section favoris";
	}
	
	refreshListFav();
	
	return false;
};
