# Algorytm obliczania miesięcznej raty wynajmu samochodu wygląda następująco:

Funkcja rozpoczyna od pobierania danych z formularza. Są to m.in.:

1. Cena katalogowa samochodu
2. Wskaźnik opłaty wstępnej
3. Cena podstawy (netto)
4. Cena wyposażenia
5. Rabat
6. Wskaźnik marżowości
7. Wpływ NSTO na wartość rezydualną
8. Okres wynajmu
9. Limit roczny przebiegu
10. Opłaty za dodatkowe opcje
11. Wartość samochodu po okresie wynajmu

Następnie, funkcja przechodzi do sprawdzenia poprawności danych. Jeśli suma ceny bazowej i opcji nie zgadza się z ceną katalogową, funkcja zwraca błąd. Podobnie, jeśli okres wynajmu nie mieści się w granicach od 1 do 120 miesięcy, funkcja także zwraca błąd.

Po weryfikacji danych, funkcja przechodzi do obliczeń:

1. Dodaje cenę podstawy i cenę wyposażenia, aby uzyskać pełną wartość samochodu.
2. Oblicza kwotę po rabacie.
3. Oblicza opłatę wstępną.
4. Oblicza wskaźnik NSTO.
5. Oblicza opłatę za limit kilometrów, jeżeli limit roczny przebiegu przekracza 15,000 km.
6. Oblicza wartość rezydualną samochodu.
7. Oblicza kwotę do rozłożenia na raty, odejmując wartość rezydualną i opłatę wstępną od zrabatowanej ceny, a następnie dodaje opłatę za limit kilometrów.
8. Oblicza miesięczną ratę, dzieląc kwotę do rozłożenia na raty przez okres wynajmu i dodaje opłaty za dodatkowe opcje, po czym mnoży wynik przez wskaźnik marżowości.
9. Na koniec, wynik jest wyświetlany użytkownikowi.