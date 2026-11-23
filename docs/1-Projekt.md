# 1. Opseg projekta

## 1.1 Problem i cilj projekta

Cilj projekta je razvoj web-aplikacije **Charterly** za upravljanje poslovanjem charter tvrtke koja iznajmljuje plovila. Aplikacija klijentima treba omogućiti jednostavno pronalaženje odgovarajućeg plovila prema terminu i karakteristikama, uvid u cijenu najma i slanje zahtjeva za rezervaciju. Zaposlenicima tvrtke treba pružiti jedinstveno mjesto za upravljanje flotom, rezervacijama, dodatnim uslugama, nedostupnošću plovila, dodjelom djelatnika rezervacijama te rasporedom preuzimanja i povrata.

Kada se provjera dostupnosti plovila, dogovaranje termina, evidentiranje dodatnih usluga i praćenje rezervacija vode odvojeno, otežan je pregled poslovanja i raste mogućnost pogreške, osobito dvostrukog rezerviranja istog plovila u terminima koji se preklapaju. Predložena aplikacija objedinjuje te postupke u jednom sustavu s jednoznačnom evidencijom zauzetosti plovila.

Očekivana korist za klijente jest jednostavnije pretraživanje ponude, pregled cijene najma i praćenje vlastitih rezervacija. Za charter tvrtku očekivane su koristi lakše upravljanje plovilima i rezervacijama, smanjena mogućnost dvostrukog rezerviranja i jednostavnije praćenje poslovnih podataka.

## 1.2 Ciljani korisnici i dionici

Svi korisnici u sustav se prijavljuju isključivo putem Google računa (OAuth 2.0), a ovlasti korisnika određuje uloga koju mu dodjeljuje administrator aplikacije. Skupine se razlikuju prema tome koriste li aplikaciju izravno ili utječu na zahtjeve i ograničenja sustava.

| Skupina korisnika ili dionika | Potreba ili interes relevantan za ovaj projekt |
| --- | --- |
| Posjetitelj (neprijavljeni korisnik) | Bez prijave pregledati katalog plovila, njihove detalje, raspoloživost, kartu, vremensku prognozu i dodatne usluge i opremu. |
| Klijent (prijavljeni korisnik koji želi unajmiti plovilo) | Pretražiti plovila prema terminu i karakteristikama, vidjeti cijenu, poslati zahtjev za rezervaciju s dodatnim uslugama i opremom te pregledati, izmijeniti ili otkazati vlastite rezervacije u skladu s pravilima sustava. |
| Djelatnik charter tvrtke | Pregledati raspored preuzimanja i povrata plovila te podatke potrebne za realizaciju najma. Svaki djelatnik ima svoju specijalnost (skiper, mehaničar, čistač...). |
| Administrator | Upravljati korisničkim računima, ulogama i specijalnostima, plovilima, lukama, vrstama plovila, fotografijama, opremom, cijenama, dodatnim uslugama, rezervacijama i razdobljima nedostupnosti, dodjeljivati djelatnike rezervacijama te održavati ispravnost podataka sustava. |
| Voditelj charter tvrtke | Pregledati statističke podatke o poslovanju (broj rezervacija, zauzetost, iznosi, najtraženije kategorije i usluge) i izvesti izvještaje. |
| Vlasnik ili uprava charter tvrtke (dionik) | Osigurati da aplikacija podržava poslovne potrebe tvrtke, olakšava organizaciju najma i kontrolira pristup podacima prema ulogama. |
| Pružatelji vanjskih usluga (dionici) | Google (prijava putem Google računa), meteorološki i kartografski servis te servis za slanje e-pošte omogućuju rad aplikacije, ovisno o dostupnosti i uvjetima korištenja tih usluga. |
| Osobe čiji se osobni podaci obrađuju i nadležna tijela za zaštitu podataka (dionici) | Očekuju odgovarajuću zaštitu osobnih podataka i ograničavanje pristupa podacima samo na ovlaštene osobe. Ne koriste aplikaciju izravno, ali određuju ograničenja sustava. |

Skupine imaju različite potrebe i ovlasti: klijent ne smije imati mogućnosti administratora ili voditelja, a djelatnik pristupa samo funkcionalnostima potrebnima za svoj posao. Aplikacija zato mora razlikovati korisničke uloge i kontrolirati pristup funkcionalnostima.

Neobavezna persona: Baltazar, klijent koji planira ljetovanje s prijateljima, želi pronaći plovilo dovoljnog kapaciteta u odgovarajućem terminu i unaprijed znati koliko će najam koštati. Primjer pokazuje zašto su pretraživanje prema kapacitetu i terminu te prikaz ukupne cijene važni za korisničko sučelje. Persona služi za pojašnjenje projektne odluke, a nije tvrdnja o stvarnom korisniku.

## 1.3 Granice projekta

Granice projekta određuju funkcionalnosti koje pripadaju prvoj inačici aplikacije, funkcionalnosti koje su izostavljene te vanjske usluge o kojima sustav ovisi.

**Uključeno:**

- Prijava i odjava isključivo putem Google računa (OAuth 2.0); automatsko stvaranje računa pri prvoj prijavi, upravljanje korisničkim računima, ulogama (klijent, djelatnik, voditelj, administrator) i specijalnostima djelatnika.
- Pregled kataloga plovila te dodatnih usluga i opreme bez prijave; pretraživanje i filtriranje prema terminu najma, matičnoj luci, vrsti plovila i kapacitetu.
- Prikaz detalja plovila (osnovni podaci, fotografije, oprema, matična luka, cijena najma) i kalendara raspoloživosti.
- Izrada, izmjena (dok je zahtjev u obradi), potvrđivanje i otkazivanje rezervacija uz definirane statuse i dopuštene prijelaze; automatski završetak najma nakon isteka razdoblja najma.
- Evidencija zauzetosti plovila, razdoblja nedostupnosti i sprječavanje preklapanja termina; razdoblja se zadaju datumom i vremenom.
- Odabir dodatnih usluga i dodatne opreme (oprema s količinom) te izračun ukupnog iznosa rezervacije prema broju započetih 24-satnih razdoblja najma.
- Dodjela djelatnika rezervaciji uz upozorenje kada je djelatnik već dodijeljen preklapajućoj rezervaciji.
- Raspored preuzimanja i povrata za djelatnike s podacima o dodijeljenim djelatnicima.
- Upravljanje plovilima, lukama, vrstama plovila, fotografijama, opremom, cijenama, dodatnim uslugama i nedostupnošću.
- Slanje e-pošte: potvrda rezervacije ili obavijest o otkazivanju.
- Statistika poslovanja i izvoz izvještaja u CSV formatu.
- Prikaz matične luke (mjesta preuzimanja) na karti i vremenske prognoze putem vanjskih usluga, u granicama mogućnosti tih usluga.
- Responzivno korisničko sučelje za računala, tablete i mobilne uređaje.

**Izvan opsega ili odgođeno:**

- **Online plaćanje:** aplikacija prikazuje izračunati iznos, ali ne provodi naplatu niti obrađuje podatke o platnim karticama ili evidenciju uplata.
- **Upravljanje radnim vremenom, zadacima i plaćama osoblja:** djelatnici se samo dodjeljuju rezervacijama; ne postoji zaseban sustav radnih zadataka niti evidencija radnog vremena.
- **Naknade za otkazivanje, sezonski cjenici i popusti:** cijena najma i dodatne opreme određuje se po danu najma, a dodatne usluge jednokratno, čime se model cijena drži jednostavnim.
- **Rezervacija više plovila odjednom:** pojednostavljenje modela; jedna rezervacija odnosi se na jedno plovilo i jednog klijenta.
- **Vremenska prognoza izvan raspona servisa:** prikaz ovisi o razdoblju za koje odabrani meteorološki servis nudi podatke.


**Vanjske ovisnosti:**

- **Google račun (OAuth 2.0):** jedini način prijave korisnika; pruža identitet korisnika, dok uloge dodjeljuje sama aplikacija.
- **Servis za slanje e-pošte:** slanje potvrda i obavijesti klijentima; konkretan servis još nije odabran.
- **Kartografska usluga (Thunderforest):** kartografske pločice za prikaz lokacije matičnih luka, koje web-klijent prikazuje pomoću biblioteke Leaflet, ovisno o mogućnostima i uvjetima korištenja servisa.
- **Meteorološka usluga:** dohvat vremenske prognoze za lokaciju i termin, ovisno o mogućnostima i uvjetima korištenja servisa; konkretan servis još nije odabran.
- **Hosting aplikacije (AWS EC2):** aplikacija se kao Docker kontejner postavlja na virtualni poslužitelj Amazon EC2 i dostupna je na adresi [charterly.site](https://charterly.site); postavljanje pokreće GitHub Actions pri svakoj promjeni na grani `main`.

Vanjske usluge odgovorne su za vlastite podatke i dostupnost. Aplikacija ostaje odgovorna za ispravnost vlastitih poslovnih podataka i pravila rezerviranja. Primjerice, prikaz vremenske prognoze nije jamstvo vremenskih uvjeta, a prikaz plovila kao dostupnog temelji se isključivo na podacima o rezervacijama i nedostupnosti u aplikaciji.

## 1.4 Postojeći pristupi i opravdanost projekta

Pri organizaciji najma plovila informacije o ponudi, raspoloživim terminima, korisnicima i dodatnim uslugama mogu se razmjenjivati putem e-pošte ili različitih evidencija. Takav postupak može zahtijevati ručno uspoređivanje termina i zasebno ažuriranje podataka, osobito kada više osoba sudjeluje u upravljanju rezervacijama. Predložena aplikacija objedinjuje te informacije i omogućuje pregled dostupnosti plovila, evidentiranje rezervacija i automatski izračun ukupnog iznosa. Time se nastoji olakšati rad korisnicima i zaposlenicima te smanjiti mogućnost pogrešaka uzrokovanih nepovezanim evidencijama.