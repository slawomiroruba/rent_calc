function calculateLease() {
    // Funkcja pomocnicza do logowania
    const logger = new Logger();

    /* 1. Pobieranie danych z formularza */
    logger.log("1. Pobieranie danych z formularza");


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
    const wskaznikMarzowowsci = parseFloat(document.getElementById('wskaznikMarzowowsci').value);

    // Wpływ NSTO na wartość rezydualną
    const wplywNSTO = parseFloat(document.getElementById('wplywNSTO').value);

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

    console.log("Wartość samochodu po okresie wynajmu: ", wartoscSamochoduPoOkresieWynajmu);

    const carValuePredictor = new CarValuePredictor(preparePoints(wartoscSamochoduPoOkresieWynajmu));

    // Console log everything
    logger.log("Cena katalogowa: ", cenaKatalogowa + " zł");
    logger.log("Cena podstawy: ", cenaPodstawy + " zł");
    logger.log("Cena wyposażenia: ", cenaWyposazenia + " zł");
    logger.log("Opłata wstępna: ", wskaznikOplatyWstepnej);
    logger.log("Przebieg roczny: ", limitRocznyPrzebiegu + " km");
    logger.log("Rabat: ", rabat + " zł");
    logger.log("Wskaźnik marżowości: ", wskaznikMarzowowsci);

    logger.log("Opłaty za dodatkowe opcje: ", kosztyDodatkowychOpcji + " zł");
    // log the object properties
    
    logger.log("Wartosc po " + okresWynajmu + " msc: ", carValuePredictor.predict(okresWynajmu) + "%");
    logger.log("Okres wynajmu: ", okresWynajmu + " miesięcy");


    if (cenaKatalogowa !== cenaPodstawy + cenaWyposazenia) {
        logger.log("Suma ceny bazowej i opcji: ", (cenaPodstawy + cenaWyposazenia));
        logger.log("Cena katalogowa: ", cenaKatalogowa);
        alert("Suma ceny bazowej i opcji nie zgadza się z ceną katalogową.");
        return;
    } else if (okresWynajmu < 1 || okresWynajmu > 120) {
        alert("Okres wynajmu powinien być między 1 a 120 miesięcy.");
        return;
    }


    /* 3. Obliczanie wyniku */
    logger.log("2. Obliczanie wyniku");

    // Dodaj cenę katalogową samochodu i cenę wyposażenia, aby uzyskać pełną wartość samochodu
    const wartoscSamochodu = cenaPodstawy + cenaWyposazenia;

    // Obliczanie kwoty po rabacie
    const zrabatowanaCena = Number.isInteger(rabat) ? wartoscSamochodu - rabat : wartoscSamochodu;
    logger.log("Zrabatowana cena: ", zrabatowanaCena.toFixed(2) + " zł");

    // Obliczanie opłaty wstępnej 
    const kwotaOplatyWstepnej = cenaKatalogowa * wskaznikOplatyWstepnej;
    logger.log("Kwota opłaty wstępnej: ", kwotaOplatyWstepnej.toFixed(2) + " zł");


    // Obliczanie wskaznika NSTO
    const wskaznikNSTO = cenaWyposazenia / cenaPodstawy;
    logger.log("Wskaznik NSTO: ", wskaznikNSTO.toFixed(2));

    // Obliczanie wartości NSTO
    // const wartoscNSTO = cenaKatalogowa * wskaznikNSTO;
    // logger.log("Wartość NSTO: ", wartoscNSTO.toFixed(2) + " zł");

    // Dodajemy opłatę za limit kilometrów
    const oplataZaPrzebieg =  limitRocznyPrzebiegu > 15000 ? (limitRocznyPrzebiegu - 15000) * 0.1 : 0;
    logger.log("Opłata za limit kilometrów: ", oplataZaPrzebieg.toFixed(2) + " zł");

    // Obliczanie wartości rezydualnej
    // TODO: dodać współczynnik wpływu wskaźnika NSTO na wartość rezydualną
    console.log(((carValuePredictor.predict(okresWynajmu) / 100) * (1 + wplywNSTO * wskaznikNSTO)));
    const wartoscRezydualna = wartoscSamochodu * ((carValuePredictor.predict(okresWynajmu) / 100) * (1 + wplywNSTO * wskaznikNSTO));
    logger.log("Wartość rezydualna: ", wartoscRezydualna.toFixed(2) + " zł");

    // Obliczanie miesięcznej raty
    const DoRozlozeniaNaRaty = zrabatowanaCena - wartoscRezydualna - kwotaOplatyWstepnej  + oplataZaPrzebieg;
    logger.log("Do rozłożenia na raty: ", DoRozlozeniaNaRaty.toFixed(2) + " zł");

    // Dodanie do raty opłaty za dodatkowe opcje
    const rataMiesieczna = (((DoRozlozeniaNaRaty / okresWynajmu + kosztyDodatkowychOpcji) * wskaznikMarzowowsci).toFixed(2));
    logger.log("Rata bez opcji dodatkowych: ", (((DoRozlozeniaNaRaty / okresWynajmu) * wskaznikMarzowowsci).toFixed(2)) + " zł");
    logger.log("Miesięczna rata: ", rataMiesieczna + " zł");

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
