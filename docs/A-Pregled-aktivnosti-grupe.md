# A. Pregled aktivnosti grupe

## A.1 Evidencija sastanaka

**Kratice članova tima:** JG = Jakov Gregurić; BL = Borna Lončar; FR = Fabijan Radat; JS = Josip Sinković; IT = Ivan Tačković; TT = Toni Travica; IŽ = Ivana Žukina

| Datum i sudionici | Glavna tema | Odluka, radnja ili otvoreno pitanje | Poveznica na zadatak ili nastali rezultat, ako postoji |
| --- | --- | --- | --- |
| 15. 10. 2026.; Svi | Podjela uloga, odabir tehnologija, početni zadatci | TT, FR i IT rade model baze podataka. IŽ, BL, JG rade početni dizajn glavne stranice, IT, TT i JS rade početnu dokumentaciju (funkcijske i nefunkcijske zahtjeve) | Zadaci #1 i #2. |
| 22. 10. 2026.; svi osim TT | Početni deployment, dorada baze, inicijalni frontend i backend | JG radi početni deployment, FR i IT dorađuju bazu, FR i IT rade početni backend, TT i JS dorađuju dokumentaciju, IŽ, BL i JG rade početni frontend | Zadaci #3, #4, #8. |
| 29. 10. 2026.; Svi | Dovršetak inicijalnog frontenda, dokumentacija arhitekture, postavljanje na server, početne rute backenda | IŽ, BL i JG dovršavaju inicijalni frontend, JS i TT rade dokumentaciju arhitekture, JG postavlja bazu, backend i frontend na server, FR i IT rade početne rute backenda | Zadatak #15 |
| 7. 11. 2026.; Svi | Promjene baze, OAuth prijava, filtriranje i pretraga na frontendu | IT, FR i JS rade promjene na bazi, TT dodaje dodatne podatke u bazu, FR počinje implementaciju prijave putem OAuth 2.0, IŽ, BL i JG implementiraju filter i fuzzy pretragu na frontendu. | Zadaci #13, #21, #22, #23 |


## A.2 Plan rada

| Razdoblje | Glavni planirani rad | Odgovorni članovi | Poveznica na zadatke/opis |
| --- | --- | --- | --- |
| Projektni tjedan 2 | Podjela uloga i odabir tehnologija. Izrada modela baze podataka. Početni dizajn glavne stranice. Početna dokumentacija (funkcijski i nefunkcijski zahtjevi). | Svi (podjela uloga, odabir tehnologija). TT, FR, IT (model baze). IŽ, BL, JG (dizajn glavne stranice). IT, TT, JS (dokumentacija). | Zadaci #1 i #2. |
| Projektni tjedan 3 | Početni deployment. Dorada baze podataka. Inicijalni backend. Dorada dokumentacije. Inicijalni frontend. | JG (deployment). FR, IT (baza i backend). TT, JS (dokumentacija). IŽ, BL, JG (frontend). | Zadaci #3, #4 i #8. |
| Projektni tjedan 4 | Dovršetak inicijalnog frontenda (Vite i React). Automatsko postavljanje aplikacije na poslužitelj. Početne rute backenda za luke i filtriranje. Dijagram i specifikacije obrazaca uporabe. | JG (frontend i postavljanje). FR, IT (backend). TT, JS (dokumentacija). | Zadatak #15 |
| Projektni tjedan 5 | Karta luka, početna stranica, popis i stranica plovila. Revizija baze (status u terminu, okidači) i testna baza na poslužitelju. Približna (fuzzy) pretraga plovila. Dokumentacija arhitekture. | JG (karta, testna baza). BL (početna stranica). IŽ (popis i stranica plovila). IT, FR, JS (baza). IT (pretraga). JS, TT (arhitektura). | Zadatak #15 |
| Projektni tjedan 6 | Dodatni podaci u bazi. Pretraga po nazivu na popisu plovila i kartice plovila. Ruta za plovila u pojedinoj luci. Početak implementacije prijave putem Google računa. Usklađivanje dokumentacije s promjenama baze. | TT (podaci). IŽ, BL, JG (frontend). IT (backend). FR (prijava). JS (dokumentacija). | Zadaci #13, #21, #22, #23 |
| Projektni tjedan 7 | Dovršetak prijave putem Google računa i gumb za prijavu u sučelju. Domena charterly.site i HTTPS. Novi parametri filtra. Stranice pravila privatnosti i uvjeta korištenja. Dokumentacija za predaju na polovici projekta. | FR (prijava). JG (domena i HTTPS). IT (filtar, pravne stranice). JS, TT (dokumentacija). | Zadaci #13, #21, #22, #23 |

## A.3 Aktivnosti i doprinosi članova

Tablica navodi glavne aktivnosti svakog člana do polovice projekta (projektni tjedni 2–7). Sati su **samoprijavljena procjena** uloženog rada, a ne točna evidencija. Zajednički sastanci nisu uključeni, a zajednički rad (npr. model baze) svaki član navodi samo za svoj dio. Sati ne mjere kvalitetu rada; rezultat se provjerava u repozitoriju.

| Aktivnost ili rezultat | Član | Prijavljeni sati | Reprezentativni rezultat ili poveznica |
| --- | --- | --- | --- |
| Postavljanje na poslužitelj (Docker, GitHub Actions, domena, HTTPS, testna baza) | JG | 24 | `Dockerfile`, `.github/workflows/` |
| Osnova web-klijenta, karta luka i zajedničke komponente | JG | 20 | `frontend/src/` |
| Dizajn i izrada početne stranice | BL | 28 | `Home.jsx` |
| Zaglavlje stranice | BL | 6 | `Header.jsx` |
| Dizajn glavne stranice i logotipa | IŽ | 12 | Zadatak #2 |
| Popis plovila, detalji plovila i pretraga | IŽ | 29 | `Details.jsx`, `Vessel.jsx` |
| Model baze, EF modeli i prvi kontroler | FR | 26 | `db/`, `backend/Models/` |
| Prijava putem Google računa | FR | 16 | `AuthController`, `AccountService` |
| Ograničenja, podaci i revizija sheme baze | IT | 17 | `db/`, `backend/Models/` |
| Rute API-ja, filtriranje i pretraga plovila | IT | 20 | `backend/Controllers/` |
| Stranice privatnosti i uvjeta korištenja | IT | 5 | `Privacy.jsx`, `Terms.jsx` |
| Opseg projekta i analiza zahtjeva | TT | 12 | Poglavlja 1 i 2 |
| Obrasci uporabe | TT | 16 | Poglavlje 3 |
| Dorada sheme baze | TT | 7 | `db/` |
| Koordinacija tima i plan rada | JS | 6 | Odjeljci A.1 i A.2 |
| Dokumentacija (zahtjevi, arhitektura, UML, README) | JS | 28 | Poglavlja 1–4 |
| Iscrtavanje dijagrama i ispravci okidača | JS | 6 | `.github/workflows/`, `db/` |

**Ukupno po članu (procjena):**

| Član | JG | BL | IŽ | FR | IT | TT | JS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Prijavljeni sati | 44 | 34 | 41 | 42 | 42 | 35 | 40 |

## A.4 Ključni inženjerski izazovi i rješenja

| Izazov | Poduzeta radnja | Ishod ili preostalo ograničenje |
| --- | --- | --- |
| Prvi model baze nije podržavao dio zahtjeva: otkazana rezervacija i dalje je blokirala termin, a stavke nisu pamtile cijenu i količinu. | IT je revidirao shemu: status je premješten u tablicu termina, otkazani termini isključeni su iz ograničenja protiv preklapanja, a stavkama su dodane cijena i količina (zadatak #13). | Shema podržava pravila zauzetosti i izračun iznosa. |
| Okidači u bazi imali su pogreške koje se ne vide pri stvaranju funkcija: okidač za klijente uz klijenta je odbijao i dodjelu djelatnika, a druga dva okidača imala su dvosmislen naziv varijable i pogrešan naziv tablice. | FR je ispravio logiku okidača za klijente tako da provjerava ulogu korisnika kojeg se dodaje, a JS je ispravio nazive; skripte su izvedene na praznoj ispitnoj bazi. | Skripte se izvode bez pogreške, a rezervacija može imati jednog klijenta i više djelatnika. Automatsko ispitivanje baze planirano je za drugu polovicu projekta. |
| Nakon promjene sheme EF modeli u backendu više nisu odgovarali tablicama, pa su upiti nad korisnicima i rezervacijama padali. | IT je uskladio modele s novom shemom (status termina, cijene i količine stavki), a FR je korisniku dodao Google identifikator. | Modeli odgovaraju shemi. |
| Postavljanje na poslužitelj zahtijevalo je usklađivanje vrata, CORS pravila, adrese poslužitelja i certifikata. | JG je postupno doradio `Dockerfile` i `cd.yml`, uveo domenu charterly.site i HTTPS te zaseban radni tijek za testnu bazu. | Aplikacija se automatski postavlja pri svakoj promjeni na grani `main`. U produkciji se još pokreću razvojni poslužitelj web-klijenta i razvojni certifikati (vidi 4.7). |
| Prijava putem AAI@EduHr nije bila pravodobno dostupna timu. | Tim je odlučio prijeći na prijavu putem Google računa (vidi 2.5); FR je implementirao prijavu i vlastiti JWT u kolačiću, a JG domenu i HTTPS koje Google zahtijeva za povratnu adresu prijave. | Prijava radi u aplikaciji, uključujući gumb za prijavu u sučelju. |
