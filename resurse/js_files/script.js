window.onload = function () {
	//creez un obiect de tip XMLHttpRequest cu care pot transmite cereri catre server
	var ajaxRequest = new XMLHttpRequest();
	var abonati_1;

	//la schimbarea starii obiectului XMLHttpRequest (la schimbarea proprietatii readyState)
	/* stari posibile:
	  0 - netrimis
	  1 - conexiune deschisa
	  2 - s-au transmis headerele
	  3 - se downleadeaza datele (datele sunt impartite in pachete si el primeste cate un stfel de pachet)
	  4 - a terminat
	  */
	ajaxRequest.onreadystatechange = function () {
		//daca am primit raspunsul (readyState==4) cu succes (codul status este 200)
		if (this.readyState == 4 && this.status == 200) {
			//in proprietatea responseText am contintul fiserului JSON
			if (!localStorage.getItem("original")) {
				document.getElementById("afisTemplate").innerHTML = this.responseText;
				var obJson = JSON.parse(this.responseText);
				abonati_1 = obJson.abonati;
				localStorage.setItem("original", JSON.stringify(abonati_1));
				localStorage.setItem("curent", JSON.stringify(abonati_1));
			}
			abonati_1 = JSON.parse(localStorage.getItem("curent"));
			afiseajaJsonTemplate(abonati_1);
		}
	};
	//deschid o conexiune cu o cerere de tip get catre server
	//json e pus in folderul static "resurse" deci calea e relativa la acel folder (fisierul e la calea absoluta /resurse/json/studenti.json)
	ajaxRequest.open("GET", "/json/abonati.json", true);
	//trimit catre server cererea
	ajaxRequest.send();

	function afiseajaJsonTemplate(abonati_1) {
		localStorage.setItem("curent", JSON.stringify(abonati_1));
		//in acets div voi afisa template-urile
		let container = document.getElementById("afisTemplate");

		//in textTemplate creez continutul (ce va deveni innerHTML-ul) divului "afisTemplate"
		let textTemplate = "";
		//parcurg vetorul de studenti din obJson
		for (let i = 0; i < abonati_1.length; i++) {
			//creez un template ejs (primul parametru al lui ejs.render)
			//acesta va primi ca parametru un student din vectorul de studenti din json {student: obJson.studenti[i]}
			//practic obJson.studenti[i] e redenumit ca "student" in template si putem sa ii accesam proprietatile: student.id etc
			textTemplate += ejs.render(
				"<div class='templ_abonat'>\
			<p>Id: <%= abonati.id %></p>\
			<p class='nume'>Nume: <%= abonati.nume %></p>\
			<p>Descriere: <%= abonati.descriere %></p>\
			<p>Inaltime: <%= abonati.inaltime %></p>\
			<p>Sex: <%= abonati.baiat %></p>\
			<p>Data inregistrare: <%= abonati.dataInreg %></p>\
			<p>Kg :<%= abonati.kg %></p>\
			</div>",
				{ abonati: abonati_1[i] }
			);
		}
		//adaug textul cu afisarea studentilor in container
		container.innerHTML = textTemplate;
	}

	//sorteaza dupa inaltime la click pe butonul de sorteaza dupa inalitme
	document.getElementById("sort_inaltime").onclick = function () {
		abonati_1.sort(function (a, b) {
			if (a.inaltime - b.inaltime != 0)
				return a.inaltime - b.inaltime;
			else {
				if ((a.kg / a.inaltime) - (b.kg / b.inaltime) != 0)
					return a.kg / a.inaltime - b.kg - b.inaltime;

				else {
					return b.id - a.id;
				}
			}
		});
		afiseajaJsonTemplate(abonati_1);
	};



	window.onkeypress = function () {
		var x = event.key;
		if (x == 'a') {
			abonati_1.sort(function (a, b) {
				return b.id - a.id;
			})
		};
		afiseajaJsonTemplate(abonati_1);
	};

	//stergere la apasare de tasta
	abon = document.getElementById("afisTemplate");
	abon.onclick = function () {
		for (let i = 0; i < abon.children.length; i++) {
			abon.children[i].onclick = function (e) {
				var ind = abon.children[i].children[0].innerHTML.replace("Id: ", "");
				for (let j = 0; j < abonati_1.length; j++)
					if (abonati_1[j].id == ind && e.altKey) {
						setTimeout(function () {
							alert("Abonatul a fost sters cu succes");
						}, 1000);
						abonati_1.splice(j, 1);
						afiseajaJsonTemplate(abonati_1);
						break;
					}
			};
		}
	};

	//calculare medie inaltime
	document.getElementById("medie").onclick = function () {
		var medie = 0;
		for (let i = 0; i < abonati_1.length; i++) {
			medie += abonati_1[i].inaltime;
		}
		medie = medie / abonati_1.length;
		var para = document.createElement("P");
		para.innerText = "Inaltime medie este " + medie;
		document.getElementById("ma").insertBefore(para, document.getElementById("ma").childNodes[24]);
	};

	//resetare

	document.getElementById("reset").onclick = function () {
		abonati_1 = JSON.parse(localStorage.getItem("original"));

		afiseajaJsonTemplate(abonati_1);
	};

	//filtrare
	check = document.getElementById("a1");
	check2 = document.getElementById("a2");

	check.onclick = function () {
		afiseajaJsonTemplate(abonati_1);
		if (check.checked == true) {
			abona = document.getElementsByClassName("templ_abonat");
			let i = 0;
			while (i < abona.length) {
				var desc = abona[i].children[2].innerHTML;
				if (!desc.includes(check2.innerHTML)) {
					console.log(desc);
					abona[i].remove();
				} else i++;
			}
		}
	};

	check3 = document.getElementById("a3");
	check4 = document.getElementById("a4");

	check3.onclick = function () {
		afiseajaJsonTemplate(abonati_1);
		if (check3.checked == true) {
			abona = document.getElementsByClassName("templ_abonat");
			let i = 0;
			while (i < abona.length) {
				var desc = abona[i].children[2].innerHTML;
				if (!desc.includes(check4.innerHTML)) {
					console.log(desc);
					abona[i].remove();
				} else i++;
			}
		}
	};

	check5 = document.getElementById("a5");
	check6 = document.getElementById("a6");

	check5.onclick = function () {
		afiseajaJsonTemplate(abonati_1);
		if (check5.checked == true) {
			abona = document.getElementsByClassName("templ_abonat");
			i = 0;
			while (i < abona.length) {
				var desc = abona[i].children[2].innerHTML;
				if (!desc.includes(check6.innerHTML)) {
					console.log(desc);
					abona[i].remove();
				} else i++;
			}
		}
	};

	// set interval +style
	var g = -1;

	document.getElementById("afis_ind").onclick = function () {
		setInterval(timp, 1000);
	};
	function timp() {
		var num = document.getElementsByClassName("nume");
		g++;
		g = g % num.length;
		console.log(num[g]);
		var x = Math.floor(Math.random() * 256);
		var y = Math.floor(Math.random() * 256);
		var z = Math.floor(Math.random() * 256);
		num[g].style.color = "rgb(" + x + "," + y + "," + z + ")";
	}

	//-----------verif varsta util 2.1


	document.getElementById("calc").onclick = function () {
		setInterval(fun, 1000);
	};
	function fun() {
		var today = new Date();
		var an = 0;
		var luna = 0;
		var zi = 0;
		var A = document.getElementById("txt").value.split("#");
		var DOB = new Date(A[2], A[1], A[0]);
		var zi_nast = DOB.getDate();
		var lun_nast = DOB.getMonth();
		var an_nast = DOB.getFullYear();
		var zi_cur = today.getDate();
		var lun_cur = today.getMonth();
		var an_cur = today.getFullYear();
		var ora = today.getHours();
		var minute = today.getMinutes();
		var sec = today.getSeconds();

		if (lun_cur > lun_nast) {
			an = an_cur - an_nast;
			luna = lun_cur - lun_nast;
			zi = zi_cur - zi_nast;
			if (zi < 0)
				zi = 30 + zi;
		}
		else if (lun_nast == lun_cur) {
			if (zi_cur >= zi_nast) {
				an = an_cur - an_nast;
				luna = 0;
				zi = zi_cur - zi_nast;
			}
			else {
				an = an_cur - an_nast - 1;
				luna = 11;
				zi = 30 - (zi_nast - zi_cur);
			}
		}
		else {
			an = an_cur - an_nast - 1;
			luna = (lun_nast + lun_cur + 3) % 12;
			zi = zi_cur - zi_nast;
			// console.log(luna);
		}
		document.getElementById("rez").innerHTML = an + " ani " + luna + " luni " + zi + " zile " + ora + " ore " + minute + " minute " + sec + " secunde ";
	}


	//ravas ------------------------------------ 1.7
	function motiv() {
		setInterval(ravas, 4000);
	};
	function ravas() {
		var vect = ["Peste douăzeci de ani vei regreta lucrurile pe care nu le-ai făcut, nu cele pe care le-ai făcut",
			"Dacă s-a făcut penicilină din pâine mucegăită, cu siguranţă şi din tine se poate face ceva.",
			"Fiecare campion a fost, la un moment dat, un concurent care a refuzat să se dea bătut",
			"Succesul înseamnă a fi în stare să mergi din eşec în eşec fără a-ţi pierde entuziasmul",
			"Toţi performăm mai bine şi cu mai multă voinţă atunci când ştim de ce facem ceea ce facem",
			"Omul înţelept nu-şi calculează şansele. El îşi fixează ţelul şi apoi îl atinge"
		]
		var item = vect[Math.floor(Math.random() * vect.length)];
		afis = document.getElementById("ravas");
		afis.innerText = item;
	}
	motiv();

	//----------salut utilizator  1.16
	setTimeout(salut, 3000);
	var inp = document.getElementById("bg-text");
	var inp_cp = inp.innerText;
	function salut() {
		z = prompt("Salut, cum te numesti?");
		inp.innerText = "Salut, " + z + "!";
		setTimeout(rev, 2000);
	}
	function rev() {
		inp.innerText = inp_cp;
	}

	//----------------reset local storage-----------------------
	document.getElementById("reset_loc").onclick = function () {
		localStorage.clear();
	}

	//-----------------stergere duplicat
	var kk=document.getElementById("ster").onclick=function() {
		for (let i = 0; i < abonati_1.length; i++) {
			for (let j = i+1; j < abonati_1.length; j++) {
				if (abonati_1[i].nume == abonati_1[j].nume){
				console.log(abonati_1[i].nume);
					abonati_1.splice(j, 1);
				}
			}
		}
		afiseajaJsonTemplate(abonati_1);
	}

	//-------stergere elemente ce au celule vide
	var kk2=document.getElementById("sort_gen").onclick=function(){
		for(let i=0;i<abonati_1.length;i++){
			for (var property in abonati_1[i]) {
				if(abonati_1[i][property]=="")
				abonati_1.splice(i, 1);
				
			  }
		}
		afiseajaJsonTemplate(abonati_1);
		}
	
};








