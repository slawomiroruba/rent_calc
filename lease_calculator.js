function calculateLease() {

    const logDiv = document.getElementById('logDiv');  // Make sure to have a div with id 'logDiv' in your HTML
    logDiv.classList.remove('hidden');  // Remove the 'hidden' class from the div
    logDiv.innerHTML = '';  // Clear the div


    const log = (label, message) => {
        let p = document.createElement('p');

        if (!message) {
            p.style.textAlign = 'center';
            p.style.color = 'red';
            p.textContent = label;
        } else {
            let strong = document.createElement('strong');
            strong.textContent = label;
            p.appendChild(strong);

            let span = document.createElement('span');

            // If the message is a string and ends with ' zł', format it as a currency
            if (typeof message === 'string' && message.endsWith(' zł')) {
                let number = parseFloat(message.replace(' zł', ''));
                span.textContent = number.toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' });
            } else {
                span.textContent = message;
            }

            span.style.cssFloat = 'right'; // This makes the message float to the right
            p.appendChild(span);
        }

        logDiv.appendChild(p);
    }


    /* 1. Pobieranie danych z formularza */
    log("1. Pobieranie danych z formularza");


    // Cena katalogowa
    const cenaKatalogowa = parseFloat(document.getElementById('cenaKatalogowa').value);

    // Opłata wstępna
    const wskaznikOplatyWstepnej = parseFloat(document.getElementById('wskaznikOplatyWstepnej').value);;

    // Cena podstawy (netto)
    const cenaPodstawy = parseFloat(document.getElementById('cenaPodstawy').value);

    // Cena wszystkich opcji
    const cenaWyposazenia = parseFloat(document.getElementById('cenaWyposazenia').value);

    // Rabat w postaci ułamka dziesiętnego
    const rabat = parseFloat(document.getElementById('rabat').value);

    // Doliczanie wskaźnika marżowości
    const wskaznikMarzowowsci = parseFloat(document.getElementById('wskaznikMarzowowsci').value);;

    // Okres wynajmu
    const okresWynajmu = parseInt(document.getElementById('okresWynajmu').value);

    // Przebieg roczny
    const limitRocznyPrzebiegu = parseInt(document.getElementById('limitRocznyPrzebiegu').value);

    // Opłaty za dodatkowe opcje (array)
    let kosztyDodatkowychOpcji = 0;
    const additionalOptions = document.querySelectorAll('.additional-options input').forEach(function (input) {
        if (input.value !== "") {
            kosztyDodatkowychOpcji += parseFloat(input.value);
        }
    });

    // Wartość samochodu po okresie wynajmu
    const percentageAfterRent = document.querySelectorAll('.percent-after-rental input');
    let wartoscSamochoduPoOkresieWynajmu = {};

    percentageAfterRent.forEach(input => {
        if (input.value !== "") {
            wartoscSamochoduPoOkresieWynajmu[input.id] = Number(input.value);
        }
    });


    // Console log everything
    log("Cena katalogowa: ", cenaKatalogowa + " zł");
    log("Opłata wstępna: ", wskaznikOplatyWstepnej + " %");
    log("Cena podstawy: ", cenaPodstawy + " zł");
    log("Cena opcji: ", cenaWyposazenia + " zł");
    log("Przebieg roczny: ", limitRocznyPrzebiegu + " km");
    log("Rabat: ", rabat + " zł");
    log("Wskaźnik marżowości: ", wskaznikMarzowowsci);

    log("Opłaty za dodatkowe opcje: ", kosztyDodatkowychOpcji + " zł");
    // log the object properties
    for (let key in wartoscSamochoduPoOkresieWynajmu) {
        if (wartoscSamochoduPoOkresieWynajmu.hasOwnProperty(key) && key == okresWynajmu) {
            log("Wartosc po " + key + " msc: ", wartoscSamochoduPoOkresieWynajmu[key] + "%");
        }
    }
    log("Okres wynajmu: ", okresWynajmu + " miesięcy");


    if (cenaKatalogowa !== cenaPodstawy + cenaWyposazenia) {
        log("Suma ceny bazowej i opcji: ", (cenaPodstawy + cenaWyposazenia));
        log("Cena katalogowa: ", cenaKatalogowa);
        alert("Suma ceny bazowej i opcji nie zgadza się z ceną katalogową.");
        return;
    } else if (okresWynajmu < 24 || okresWynajmu > 60) {
        alert("Okres wynajmu powinien być między 24 a 60 miesięcy.");
        return;
    }


    /* 3. Obliczanie wyniku */
    log("2. Obliczanie wyniku");

    // Dodaj cenę katalogową samochodu i cenę wyposażenia, aby uzyskać pełną wartość samochodu
    const wartoscSamochodu = cenaPodstawy + cenaWyposazenia;

    // Obliczanie opłaty wstępnej 
    const kwotaOplatyWstepnej = cenaKatalogowa * wskaznikOplatyWstepnej;
    log("Kwota opłaty wstępnej: ", kwotaOplatyWstepnej.toFixed(2) + " zł");


    // Obliczanie wskaznika NSTO
    const wskaznikNSTO = cenaWyposazenia / cenaKatalogowa;
    log("Wskaznik NSTO: ", wskaznikNSTO.toFixed(2));

    // Obliczanie wartości NSTO
    const wartoscNSTO = cenaKatalogowa * wskaznikNSTO;
    log("Wartość NSTO: ", wartoscNSTO.toFixed(2) + " zł");

    // Obliczanie kwoty po rabacie
    const zrabatowanaCena = wartoscSamochodu - rabat;
    log("Zrabatowana cena: ", zrabatowanaCena.toFixed(2) + " zł");

    // Dodaj wartość NSTO do wartości po rabacie
    const WartoscZNSTO = zrabatowanaCena + wartoscNSTO;
    log("Wartość z NSTO: ", WartoscZNSTO.toFixed(2) + " zł");


    // Obliczanie wartości rezydualnej
    const wartoscRezydualna = WartoscZNSTO * (wartoscSamochoduPoOkresieWynajmu[okresWynajmu] / 100);
    log("Wartość rezydualna: ", wartoscRezydualna.toFixed(2) + " zł");

    // Obliczanie miesięcznej raty
    const DoRozlozeniaNaRaty = WartoscZNSTO - wartoscRezydualna - kwotaOplatyWstepnej;
    log("Do rozłożenia na raty: ", DoRozlozeniaNaRaty.toFixed(2) + " zł");

    // Dodanie do raty opłaty za dodatkowe opcje
    const rataMiesieczna = ((DoRozlozeniaNaRaty / okresWynajmu + kosztyDodatkowychOpcji) * wskaznikMarzowowsci).toFixed(2);
    log("Miesięczna rata: ", rataMiesieczna + " zł");

    // Wyświetlanie wyniku
    document.getElementById('result').innerHTML = "Miesięczna rata wynajmu: " + rataMiesieczna + " zł (netto)";
}

function calculatePrice() {
    var cenaKatalogowa = document.getElementById('cenaKatalogowa');
    var cenaPodstawy = document.getElementById('cenaPodstawy');
    var cenaWyposazenia = document.getElementById('cenaWyposazenia');

    if (cenaKatalogowa.value && cenaPodstawy.value && !cenaWyposazenia.value) {
        cenaWyposazenia.value = (parseFloat(cenaKatalogowa.value) - parseFloat(cenaPodstawy.value)).toFixed(2);
    } else if (cenaKatalogowa.value && cenaWyposazenia.value && !cenaPodstawy.value) {
        cenaPodstawy.value = (parseFloat(cenaKatalogowa.value) - parseFloat(cenaWyposazenia.value)).toFixed(2);
    } else if (cenaPodstawy.value && cenaWyposazenia.value && !cenaKatalogowa.value) {
        cenaKatalogowa.value = (parseFloat(cenaPodstawy.value) + parseFloat(cenaWyposazenia.value)).toFixed(2);
    }
}


// Dodaj procedury obsługi zdarzeń do pól.
document.getElementById('cenaKatalogowa').addEventListener('change', calculatePrice);
document.getElementById('cenaPodstawy').addEventListener('change', calculatePrice);
document.getElementById('cenaWyposazenia').addEventListener('change', calculatePrice);
