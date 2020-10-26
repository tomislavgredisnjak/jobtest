const skare = document.querySelector('#skare');
const papir = document.querySelector('#papir');
const kamen = document.querySelector('#kamen');
const provjeri = document.querySelector('.provjeri');
const rijec = document.querySelector('.rijec');
const brojevi = document.querySelector('.brojevi');
const traziBroj = document.querySelector('.traziBroj');
const nadi = document.querySelector('.nadi');

skare.addEventListener('click', skarepapirkamen);
papir.addEventListener('click', skarepapirkamen);
kamen.addEventListener('click', skarepapirkamen);

provjeri.addEventListener('click', provjeraPalindroma);

nadi.addEventListener('click', nadiBroj);

var pobjede = 0;
function skarepapirkamen(event){
    event.preventDefault();
    
    var izabrano = event.target.innerText;
    var stvari = ['Škare', 'Papir', 'Kamen'];
    var racunalo = stvari[Math.floor(Math.random()*stvari.length)];
    document.getElementById('computer').innerText = 'Računalo je izabralo: ' + racunalo;
    if(izabrano === racunalo){
        document.getElementById('rezultat').innerText = 'Izjednačeno';
    }else if(izabrano === "Kamen" && racunalo === "Škare"){
        document.getElementById('rezultat').innerText = 'Pobjeda';
        pobjede++;
    }else if(izabrano === "Škare" && racunalo === "Papir"){
        document.getElementById('rezultat').innerText = 'Pobjeda';
        pobjede++;
    }else if(izabrano === "Papir" && racunalo === "Kamen"){
        document.getElementById('rezultat').innerText = 'Pobjeda';
        pobjede++;
    }else{
        document.getElementById('rezultat').innerText = 'Gubitak';
    }
    document.getElementById('pobjede').innerText = 'Pobjede: ' + pobjede;
}

function provjeraPalindroma(event){
    event.preventDefault();
    
    var rijecBezRazmaka = rijec.value.split(' ').join('').toLowerCase();

    var poljeRijeci = rijecBezRazmaka.match(/[a-zA-Z]+/g);
    var palindrom = rijecBezRazmaka.split('').reverse().join('');
    var poljePalindroma = palindrom.match(/[a-zA-Z]+/g);
    rijecBezRazmaka = "";
    palindrom = "";
    if(poljeRijeci == null){
        alert("Unesite riječ.");
    }else{
        for(var i = 0; i < poljeRijeci.length; i++){
            rijecBezRazmaka += poljeRijeci[i];
        }
        for(i = 0; i < poljePalindroma.length; i++){
            palindrom += poljePalindroma[i];
        }
        if(rijecBezRazmaka === palindrom){
            document.getElementById('palindrom').innerText = 'Palindrom';
        }else{
            document.getElementById('palindrom').innerText = 'Nije palindrom';
        }
    }
}

function nadiBroj(event){
    event.preventDefault();
    
    var koristenoBrojeva = 0;
    var poljeBrojeva = brojevi.value.match(/[0-9]+/g).map(function(item) {
        return parseInt(item, 10);
    });
    
    var trazenBroj = parseInt(traziBroj.value);

    for(var i = 0; i < poljeBrojeva.length; i++){
        if(poljeBrojeva[i] > trazenBroj){
            console.log("Izbacujem " + poljeBrojeva[i] + " jer je veće od " + trazenBroj);
            poljeBrojeva.splice(i, 1);
            i--;
        }
    }
    
    poljeBrojeva = poljeBrojeva.sort(function (a, b) { return b - a;});
    var brojPonavljanja = 0;
    var broj = 0;

    while(true){
    var max = Math.floor(trazenBroj/poljeBrojeva[0]);
    for(var i = 0; i < poljeBrojeva.length; i++){
        do{
            if(broj + poljeBrojeva[i] <= trazenBroj){
                broj = broj + poljeBrojeva[i];
                koristenoBrojeva++;
                console.log("Dodan " + poljeBrojeva[i] + " sada je broj: " + broj);
            }else{
                console.log("Izlazak iz petlje jer je " + (broj + poljeBrojeva[i]) + " veće od " + trazenBroj);
                break;
            }

        }while(broj != trazenBroj);

        if(broj == trazenBroj){
            console.log("Nađeno, korišteno: " + koristenoBrojeva + " brojeva.");
            break;
        }else if(i == poljeBrojeva.length - 1 && broj != poljeBrojeva[0]){
                brojPonavljanja++;
                console.log(max);
                broj = max*poljeBrojeva[0] - poljeBrojeva[0]*brojPonavljanja;
                koristenoBrojeva = max - brojPonavljanja;
                console.log("Sada je broj: " + broj);
                i = 0;
        }else if(broj < 0){
            break;
        }
    }

    if(broj != trazenBroj){
        console.log("Izbacujem " + poljeBrojeva[0] + " iz polja brojeva.");
        koristenoBrojeva = 0;
        brojPonavljanja = 0;
        poljeBrojeva.splice(0,1);
        broj = 0;
    }else if(broj == trazenBroj){
        break;
    }
    if(poljeBrojeva.length < 1){
            console.log("Nije moguce naci broj");
            koristenoBrojeva = -1;
            break;
        }
    }

    if(koristenoBrojeva > 0){
        document.getElementById('naden').innerText = 'Za pronalazak broja ' + trazenBroj + ' korišteno je ' + koristenoBrojeva + ' brojeva.';
    }else{
        document.getElementById('naden').innerText = 'Nije moguće doći do broja ' + trazenBroj + ' zbrajanjem u danom nizu.';
    }

}