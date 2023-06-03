# Kalkulator raty miesięcznej najmu

## Algorytm obliczania miesięcznej raty wynajmu samochodu może wyglądać następująco:

1. Dodaj cenę katalogową samochodu i cenę wyposażenia, aby uzyskać pełną wartość samochodu.

`WartoscSamochodu = CenaKatalogowa + CenaWyposazenia`

2. Oblicz wartość NSTO na podstawie pełnej wartości samochodu.

`WartoscNSTO = WartoscSamochodu * WskaznikNSTO`

3. Od pełnej wartości samochodu odejmij rabat.

`WartoscPoRabacie = WartoscSamochodu - Rabat`

4. Dodaj wartość NSTO do wartości po rabacie.

`WartoscZNSTO = WartoscPoRabacie + WartoscNSTO`

5. Oblicz wartość rezydualną samochodu po określonym okresie wynajmu (np. po 36 miesiącach).

`WartoscRezydualna = WartoscSamochodu * 0.5`

6. Od wartości z NSTO odejmij wartość rezydualną i opłatę wstępną, aby uzyskać kwotę do rozłożenia na raty.

`DoRozlozeniaNaRaty = WartoscZNSTO - WartoscRezydualna - OplataWstepna`

7. Kwotę do rozłożenia na raty pomnóż razy współczynnik marżowości np. `1.3`
   
`DoRozlozeniaNaRaty = DoRozlozeniaNaRaty * WspolczynnikMarzowosci`

8. Oblicz ratę miesięczną przez podzielenie kwoty do rozłożenia na raty przez liczbę miesięcy wynajmu.

`RataMiesieczna = DoRozlozeniaNaRaty / LiczbaMiesiecyWynajmu`

8. Jeżeli są dodatkowe koszty związane z limitem kilometrów (np. dodatkowe opłaty za przekroczenie limitu), powinny one być uwzględnione osobno.

Zakładając, że wszystkie wartości są podane w złotych, a wskaźnik NSTO jest podany jako liczba z zakresu 0-1 (np. 0,05 dla 5%), powyższy algorytm powinien poprawnie obliczyć miesięczną ratę wynajmu. Wskaźnik NSTO i wartość rezydualna mogą się różnić w zależności od specyfikacji samochodu, polityki firmy i innych czynników, więc zawsze warto skonsultować się z ekspertem ds. finansów lub księgowości, aby upewnić się, że wszystkie koszty są właściwie uwzględnione.

## Przykład
Załóżmy, że wskaźnik NSTO wynosi 5% (0.05), a wartość rezydualna samochodu po 36 miesiącach wynajmu wynosi 50% (0.5) wartości samochodu.

Dodaj cenę katalogową samochodu i cenę wyposażenia, aby uzyskać pełną wartość samochodu:

`WartoscSamochodu = 208699.91 + 71487.80 = 280187.71 zł`

Oblicz wartość NSTO na podstawie pełnej wartości samochodu:

`WartoscNSTO = 280187.71 * 0.05 = 14009.39 zł`
Od pełnej wartości samochodu odejmij rabat:

`WartoscPoRabacie = 280187.71 - 10000 = 270187.71 zł`

Dodaj wartość NSTO do wartości po rabacie:

`WartoscZNSTO = 270187.71 + 14009.39 = 284197.10 zł`

Oblicz wartość rezydualną samochodu po określonym okresie wynajmu (np. po 36 miesiącach):

`WartoscRezydualna = 280187.71 * 0.5 = 140093.86 zł`

Od wartości z NSTO odejmij wartość rezydualną i opłatę wstępną, aby uzyskać kwotę do rozłożenia na raty:

`DoRozlozeniaNaRaty = 284197.10 - 140093.86 - 12337 = 131766.24 zł`

Kwotę do rozłożenia na raty pomnóż razy współczynnik marżowości np. `1.3`

 `DoRozlozeniaNaRaty = 131766.24 * 1.3 = 171296.11 zł`

Oblicz ratę miesięczną przez podzielenie kwoty do rozłożenia na raty przez liczbę miesięcy wynajmu:

`RataMiesieczna = 171296.11 / 36 = 4758.23 zł`

Zatem, na podstawie podanych danych i założeń, rata miesięczna dla klienta wynosiłaby 3660.18 zł. Pamiętaj jednak, że ten wynik jest uproszczony i nie uwzględnia dodatkowych kosztów, takich jak koszty przekroczenia limitu kilometrów, koszty ubezpieczenia, utrzymania samochodu, itp. Zawsze warto skonsultować się z ekspertem ds. finansów lub księgowości, aby upewnić się, że wszystkie koszty są właściwie uwzględnione.