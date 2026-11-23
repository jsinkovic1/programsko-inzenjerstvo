# 2. Analiza zahtjeva

Cilj analize zahtjeva je definirati funkcionalnosti i svojstva kvalitete aplikacije za podršku charter poslovanju i iznajmljivanju plovila. Zahtjevi proizlaze iz izvornog zadatka, uputa kolegija i odabranih projektnih odluka. Svaki zahtjev ima jedinstvenu oznaku, prioritet, izvor i kriterije prema kojima se može provjeriti njegova realizacija.

**Terminologija.** U cijeloj dokumentaciji koriste se sljedeći pojmovi:
- *vrsta plovila* (jedrilica, motorni brod, katamaran i sl.; ujedno kategorija plovila i tip iz zadatka);
- *kapacitet* (najveći broj osoba na plovilu);
- *matična luka* (ujedno mjesto preuzimanja i povrata plovila te polazna lokacija pri pretrazi);
- *oprema plovila* (osnovna oprema koja se nalazi na plovilu i prikazuje u njegovim detaljima);
- *dodatna usluga* (usluga koju klijent može odabrati uz najam, npr. najam skipera, završno čišćenje; naplaćuje se jednokratno);
- *dodatna oprema* (oprema iz kataloga koju klijent uz najam naručuje uz doplatu; naplaćuje se po danu najma);
- *razdoblje najma* (od datuma i vremena preuzimanja do datuma i vremena povrata);
- *dan najma* (započeto 24-satno razdoblje najma, vidi AS-03);
- *klijent* (prijavljeni korisnik koji rezervira plovilo) i *posjetitelj* (neprijavljeni korisnik);
- *djelatnik* (korisnik s ulogom djelatnika i određenom specijalnošću: skiper, mehaničar, kuhar, čistač i sl.).


## 2.1 Funkcijski zahtjevi
 
Funkcijski zahtjevi opisuju mogućnosti koje aplikacija mora pružiti korisnicima i djelatnicima charter tvrtke. Prioritet određuje redoslijed isporuke: svi su zahtjevi dio odobrenog opsega, a „Srednji" označava zahtjeve koji ne blokiraju osnovni tijek pretrage i rezervacije. Prijava putem Google računa nije funkcijski zahtjev nego projektno ograničenje (C-01).
 
| ID | Opis | Prioritet | Izvor | Kriteriji prihvaćanja |
|---|---|---|---|---|
| F-001 | Administrator upravlja korisničkim računima: pregledava ih, dodjeljuje ulogu (klijent, djelatnik, voditelj, administrator) te deaktivira i ponovno aktivira račune. | Visok | Odobreni zadatak | Promjena uloge mijenja dostupne funkcionalnosti korisnika pri sljedećem zahtjevu. Za ulogu djelatnika obavezna je specijalnost, a za ostale uloge nije dopuštena. Deaktivirani korisnik ne može pristupiti sustavu ni nakon uspješne Google OAuth autentifikacije. |
| F-002 | Posjetitelji bez prijave pregledavaju katalog plovila i dodatne usluge. | Visok | Odobreni zadatak | Katalog prikazuje plovila s osnovnim podacima i dodatne usluge s cijenama. Za izradu rezervacije potrebna je prijava. |
| F-003 | Sustav omogućuje pretraživanje i filtriranje plovila prema nazivu, terminu najma, matičnoj luci, vrsti plovila i potrebnom kapacitetu. | Visok | Odobreni zadatak | Kriteriji se mogu kombinirati. Prikazuju se samo plovila koja zadovoljavaju kriterije i slobodna su tijekom cijelog traženog razdoblja (bez zahtjeva za rezervaciju, potvrđenih rezervacija i nedostupnosti). Kada je termin zadan, uz plovilo se prikazuje cijena najma za to razdoblje. Neispravno razdoblje se odbija uz poruku, a prazan rezultat prikazuje odgovarajuću poruku. |
| F-004 | Sustav prikazuje detalje plovila i kalendar njegove raspoloživosti. | Visok | Odobreni zadatak | Detalji uključuju naziv, vrstu, proizvođača i model, godinu proizvodnje, kapacitet, broj kabina i ležajeva, opremu, fotografije, matičnu luku i cijenu najma po danu. Kalendar prikazuje zauzeta i nedostupna razdoblja bez podataka o klijentima. |
| F-005 | Sustav prikazuje položaj matične luke, koja je ujedno mjesto preuzimanja plovila, na karti. | Srednji | Odobreni zadatak | Na stranici plovila i u izradi rezervacije prikazuje se oznaka luke na karti. Ako kartografski servis nije dostupan, prikazuje se obavijest, a ostale funkcionalnosti rade. |
| F-006 | Sustav prikazuje vremensku prognozu za matičnu luku i razdoblje planiranog najma. | Srednji | Odobreni zadatak | Prikazuju se dostupni podaci o temperaturi, vjetru i vremenskim uvjetima. Za razdoblje izvan raspona servisa ili pri nedostupnosti servisa prikazuje se obavijest, a ostale funkcionalnosti rade. |
| F-007 | Klijent izrađuje rezervaciju plovila za odabrano razdoblje s brojem osoba i dodatnim uslugama. | Visok | Odobreni zadatak | Klijent odabire plovilo, datum i vrijeme preuzimanja i povrata plovila, broj osoba (najviše koliko iznosi kapacitet plovila) i usluge. Prije slanja prikazuje se izračun ukupnog iznosa. Vrijeme povrata mora biti nakon vremena preuzimanja, a preuzimanje ne smije biti u prošlosti. Nakon slanja rezervacija ima status `ZAHTJEV`. |
| F-008 | Sustav sprječava preklapanje rezervacija istog plovila i vodi jednoznačnu evidenciju zauzetosti. | Visok | Odobreni zadatak | Nova rezervacija smije početi točno u trenutku povrata prethodne. Nije moguća rezervacija koja se preklapa sa zahtjevom, potvrđenom rezervacijom ili razdobljem nedostupnosti. Provjera vrijedi i pri istodobnim zahtjevima više korisnika. |
| F-009 | Sustav vodi status rezervacije i dopušta samo definirane prijelaze između statusa. | Visok | Odobreni zadatak | Statusi: `ZAHTJEV`, `POTVRDENA`, `OTKAZANA`, `ZAVRSENA`. Dopušteni prijelazi i izvršitelji: `ZAHTJEV` -> `POTVRDENA` (administrator); `ZAHTJEV` -> `OTKAZANA` (klijent povlačenjem ili administrator odbijanjem); `POTVRDENA` -> `OTKAZANA` (klijent do početka najma); `POTVRDENA` -> `ZAVRSENA`. Ostali prijelazi se odbijaju. |
| F-010 | Klijent pregledava vlastite rezervacije i pripadajuće iznose. | Visok | Odobreni zadatak | Prikazuju se statusi, plovila, razdoblja, dodatne usluge i ukupni iznosi rezervacija. Klijent nema pristup rezervacijama drugih klijenata. |
| F-011 | Klijent mijenja i otkazuje vlastite rezervacije. | Srednji | Odluka tima | Izmjena razdoblja, broja osoba i usluga dopuštena je samo dok je rezervacija u statusu `ZAHTJEV`, uz ponovnu provjeru raspoloživosti i izračun iznosa. Otkazivanje je moguće do početka najma, mijenja status u `OTKAZANA` i oslobađa termin. Naknade za otkazivanje se ne obračunavaju. |
| F-012 | Sustav klijentu šalje e-poštu: potvrdu rezervacije i obavijest o otkazivanju. | Visok | Odobreni zadatak, odluka tima | Nakon potvrde rezervacije klijent prima poruku s podacima o plovilu, razdoblju, uslugama, ukupnom iznosu i mjestu preuzimanja. Pri prijelazu u status `OTKAZANA` klijent prima obavijest. |
| F-013 | Djelatnik pregledava raspored preuzimanja i povrata plovila. | Visok | Odobreni zadatak | Za odabrani dan ili razdoblje prikazuju se potvrđene rezervacije s plovilom, klijentom (ime i e-pošta), mjestom preuzimanja odnosno povrata i odabranim uslugama. |
| F-014 | Administrator dodjeljuje djelatnike rezervaciji. | Visok | Odluka tima | Administrator rezervaciji (u statusu `ZAHTJEV` ili `POTVRDENA`) dodaje i uklanja djelatnike; mogu se dodijeliti samo aktivni korisnici s ulogom djelatnika. Ako je djelatnik već dodijeljen drugoj rezervaciji čije se razdoblje preklapa, sustav pri dodjeli prikazuje upozorenje s popisom tih rezervacija. |
| F-015 | Administrator upravlja plovilima, lukama, vrstama plovila, opremom i fotografijama. | Visok | Odobreni zadatak | Moguće je dodavati i uređivati plovila te unositi luke (naziv i koordinate), vrste plovila i opremu. Plovilo može imati više fotografija, od kojih je najviše jedna glavna. Izmjene su vidljive u katalogu. Plovilo povezano s rezervacijama ne može se obrisati, a njegove rezervacije ostaju vidljive administratoru i djelatnicima. |
| F-016 | Administrator definira cijene najma i upravlja uslugama i dodatnom opremom. | Visok | Odobreni zadatak | Cijena najma određuje se po danu najma. Usluga ima naziv i cijenu. Promjena cijene ne mijenja iznose već izrađenih rezervacija. |
| F-017 | Administrator pregledava i upravlja rezervacijama. | Visok | Odobreni zadatak | Moguće je pregledavati i filtrirati rezervacije (status, plovilo, razdoblje, klijent) te potvrditi ili odbiti zahtjev prema pravilima iz F-009. Potvrda pokreće slanje e-pošte (F-012). |
| F-018 | Administrator evidentira razdoblja nedostupnosti plovila. | Visok | Odobreni zadatak | Unosi se razdoblje i razlog (servis, održavanje, drugo); unos se može uređivati i brisati. U tom razdoblju plovilo se ne prikazuje kao raspoloživo. Ako se razdoblje preklapa sa zahtjevom ili potvrđenom rezervacijom, unos se odbija dok se sukob ne riješi otkazivanjem rezervacije. |
| F-019 | Voditelj i administrator pregledavaju statistiku poslovanja i izvoze izvještaje u CSV formatu. | Srednji | Odobreni zadatak, odluka tima | Za odabrano razdoblje prikazuju se broj rezervacija, zauzetost plovila, ugovoreni iznosi te najtraženije kategorije plovila i dodatne usluge, izračunati prema AS-09. Izvezena CSV datoteka sadrži podatke prikazane u izvještaju i otvara se u uobičajenom programu za proračunske tablice. |
 
## 2.2 Nefunkcijski zahtjevi
 
Nefunkcijski zahtjevi definiraju svojstva kvalitete, sigurnosne uvjete i uvjete rada aplikacije.
 
| ID | Opis | Prioritet | Izvor | Način provjere |
|---|---|---|---|---|
| NF-01 | Sučelje mora biti responzivno i prilagođeno računalima, tabletima i mobilnim uređajima. | Visok | Odobreni zadatak | Provjeriti ključne funkcionalnosti na širinama zaslona od 360, 768 i 1280 px te na mobilnom uređaju. |
| NF-02 | Pristup podacima i funkcionalnostima mora biti ograničen prema korisničkim ovlastima, a provjera se mora provoditi na poslužitelju. | Visok | Odobreni zadatak | Izravnim pozivima zaštićenih adresa bez prijave i s ulogama bez ovlasti provjeriti da su zahtjevi odbijeni. |
| NF-03 | Sustav mora podržavati istodobni rad više korisnika bez narušavanja konzistentnosti podataka. | Visok | Odobreni zadatak | Pri istodobnim zahtjevima za isto plovilo i preklapajući termin smije uspjeti najviše jedan zahtjev. |
| NF-04 | Nedostupnost vanjskih servisa (meteorološki, kartografski, e-pošta) ne smije onemogućiti osnovne funkcionalnosti. Za kartu i prognozu prikazuje se obavijest. Neuspjelo slanje e-pošte ne poništava promjenu statusa rezervacije i evidentira se tako da ga administrator može uočiti. | Srednji | Odobreni zadatak, odluka tima | Simulirati nedostupnost svakog servisa i provjeriti prikaz obavijesti, nastavak rada ostalih funkcionalnosti te očuvanje potvrde rezervacije uz evidentiran neuspjeh slanja. |
| NF-05 | Sustav ne pohranjuje lozinke korisnika: autentifikacija se provodi isključivo putem Google računa, promet je zaštićen HTTPS-om, a ulazni se podaci provjeravaju na poslužitelju. | Visok | Upute kolegija, odluka tima | Pregledom baze potvrditi da nema lozinki, provjeriti da se pristup preko HTTP-a preusmjerava ili odbija te unijeti neispravne i zlonamjerne vrijednosti u obrasce i provjeriti da su odbijene. |
| NF-06 | Sustav pohranjuje samo osobne podatke potrebne za rad (prijava putem Google računa, ime, prezime i e-pošta te podaci o rezervacijama). Podaci klijenta vidljivi su samo njemu te djelatnicima i administratoru, a javni prikaz raspoloživosti ne otkriva podatke klijenata. | Visok | Dionici (zaštita osobnih podataka), odluka tima | Pregledati pohranjene podatke te odgovore sustava za svaku ulogu i za posjetitelja. |
 
## 2.3 Dionici i akteri
 
Dionici su osobe ili organizacije koje imaju interes u sustavu, dok su akteri oni koji izravno komuniciraju s aplikacijom ili vanjski sustavi s kojima aplikacija razmjenjuje podatke. Dionici koji nisu akteri (vlasnik ili uprava tvrtke, nadležna tijela za zaštitu podataka) opisani su u odjeljku 1.2, a njihovi se interesi odražavaju u zahtjevima NF-02, NF-05 i NF-06.
 
| ID aktera | Uloga | Odnos prema sustavu | Relevantni zahtjevi |
|---|---|---|---|
| A-01 | Posjetitelj | Pregledava katalog, raspoloživost, kartu i prognozu te se prijavljuje putem Google računa. | F-002–F-006 |
| A-02 | Klijent | Pretražuje plovila, izrađuje, mijenja i otkazuje vlastite rezervacije te ih pregledava. | F-002–F-012 |
| A-03 | Djelatnik | Ima specijalnost (skiper, mehaničar, kuhar, čistač i sl.), pregledava katalog i raspored preuzimanja i povrata te je dodijeljen rezervacijama na kojima radi. | F-002–F-006, F-013, F-014 |
| A-04 | Voditelj charter tvrtke | Pregledava katalog, statističke podatke i izvozi izvještaje. | F-002–F-006, F-019 |
| A-05 | Administrator sustava | Upravlja korisnicima, plovilima, lukama, cijenama, uslugama, rezervacijama i nedostupnošću, dodjeljuje djelatnike rezervacijama te pregledava statistiku. | F-001–F-006, F-014–F-019 |
| A-06 | Google (pružatelj identiteta) | Autentificira korisnike putem OAuth 2.0. | C-01, NF-05 |
| A-07 | Meteorološki servis | Isporučuje podatke o vremenskoj prognozi. | F-006, NF-04 |
| A-08 | Kartografski servis | Omogućuje prikaz karte i lokacije matične luke. | F-005, NF-04 |
| A-09 | Servis za slanje e-pošte | Omogućuje slanje potvrda i obavijesti klijentima. | F-012, NF-04 |
 
## 2.4 Ograničenja i pretpostavke
 
Ovaj odjeljak navodi projektna ograničenja i pretpostavke na kojima se temelji oblikovanje sustava.
 
| ID | Tip | Opis ograničenja ili pretpostavke | Izvor | Inženjerska posljedica / provjera |
|---|---|---|---|---|
| C-01 | Ograničenje | Prijava putem Google računa (OAuth 2.0) jedini je dopušteni način prijave u sustav. | Odluka tima (zamjena za AAI@EduHr, vidi 2.5) | Nema vlastite registracije ni lozinki. Pri prvoj uspješnoj prijavi automatski se stvara račun s ulogom klijenta, a uloge se vode u aplikaciji. Odustajanje od prijave ili neuspjela prijava ostavlja radnje za prijavljene korisnike nedostupnima, a nakon odjave zaštićene stranice nisu dostupne. Provjeriti prijavu, odjavu i odbijanje neautoriziranih zahtjeva. |
| C-02 | Ograničenje | Sustav mora biti povezan s meteorološkim servisom. | Odobreni zadatak | Integraciju je potrebno implementirati i provjeriti ponašanje pri nedostupnosti servisa. |
| C-03 | Ograničenje | Sustav mora koristiti kartografski servis za prikaz položaja matične luke i mjesta preuzimanja. | Odobreni zadatak | Potrebno je osigurati prikaz lokacije i obradu pogrešaka vanjskog servisa. |
| C-04 | Ograničenje | Potvrda rezervacije dostavlja se elektroničkom poštom. | Odobreni zadatak | Potrebna je integracija sa servisom za slanje e-pošte; konkretan servis još nije odabran. |
| C-05 | Ograničenje | Izvještaji se moraju moći izvesti u najmanje jednom standardnom formatu. | Odobreni zadatak | Odabran je CSV format. |
| C-06 | Ograničenje | Aplikacija mora podržavati računala, tablete i mobilne uređaje. | Odobreni zadatak | Korisničko sučelje mora biti responzivno. |
| C-07 | Ograničenje | Projekt mora imati dokumentaciju propisanu uputama kolegija. | Upute kolegija | Pregledati potpunost i usklađenost dokumentacije sa stvarnom implementacijom. |
| C-08 | Ograničenje | Projekt mora imati plan implementacije koji omogućuje postavljanje i pokretanje aplikacije u novom okruženju. | Upute kolegija | Slijediti dokumentirane korake na čistom okruženju i provjeriti ispravnost pokretanja. |
| AS-01 | Pretpostavka | Zahtjeve za rezervaciju ručno potvrđuje administrator. | Odluka tima | Potvrda mijenja status rezervacije i pokreće slanje e-pošte. |
| AS-02 | Pretpostavka | Zahtjev za rezervaciju i potvrđena rezervacija zauzimaju termin, dok otkazana rezervacija oslobađa termin. Zahtjev ne istječe automatski; neobrađene zahtjeve rješava administrator. | Odluka tima | Pravilo se primjenjuje u pretrazi, kalendaru i provjeri novih rezervacija. Rizik: dugo neobrađen zahtjev blokira termin. |
| AS-03 | Pretpostavka | Razdoblje najma zadaje se datumom i vremenom preuzimanja i povrata te se tretira kao [preuzimanje, povrat). Vremena se tumače kao lokalno vrijeme (Europe/Zagreb), bez vremenske zone. Dan najma je započeto 24-satno razdoblje: broj dana najma = zaokruženo naviše (povrat − preuzimanje) / 24 sata, najmanje 1. Primjer: točno 7 × 24 sata je 7 dana, a 7 dana i 1 sat je 8 dana. | Odluka tima | Provjeriti rubne slučajeve preklapanja (nova rezervacija počinje u trenutku povrata prethodne) i izračun broja dana. |
| AS-04 | Pretpostavka | Online plaćanje nije dio opsega. Sustav prikazuje ukupni ugovoreni iznos, ali ne obrađuje transakcije ni evidenciju uplata. | Odluka tima | Nije potrebno implementirati platni sustav. |
| AS-05 | Pretpostavka | Cijena najma jedinstvena je po danu najma za plovilo (bez sezonskih cjenika i popusta). Dodatna oprema naplaćuje se po danu najma, a dodatna usluga jednokratno; klijent može odabrati količinu dodatne opreme. Ukupni iznos = dnevna cijena × broj dana najma + zbroj (cijena opreme × količina × broj dana najma) + zbroj cijena odabranih usluga. Ukupni iznos pohranjuje se u rezervaciji pri izradi, pa promjena cjenika ne mijenja postojeće rezervacije. | Odluka tima | Provjeriti izračun za opremu, usluge i granične slučajeve iz AS-03. |
| AS-06 | Pretpostavka | Jedna rezervacija odnosi se na jedno plovilo i jedno razdoblje najma te ima točno jednog klijenta. | Odluka tima | Model rezervacije vezan je uz jedno plovilo i jednog klijenta. |
| AS-07 | Pretpostavka | Klijent može mijenjati rezervaciju samo u statusu `ZAHTJEV`, a otkazati je do početka najma. Potvrđenu rezervaciju koju treba izmijeniti klijent otkazuje i izrađuje novu. Naknade za otkazivanje nisu dio opsega. | Odluka tima | Izmjena zahtijeva ponovnu provjeru raspoloživosti i izračun iznosa. |
| AS-08 | Pretpostavka | Dostupnost vremenske prognoze ovisi o mogućnostima i vremenskom rasponu odabranog meteorološkog servisa. | Odluka tima | Za nedostupne podatke sustav prikazuje obavijest. |
| AS-09 | Pretpostavka | Prihod se ne prikazuje kao stvarno naplaćen iznos jer sustav ne evidentira plaćanja. Statistika broji rezervacije u statusima `POTVRDENA` i `ZAVRSENA`; ugovoreni iznos je zbroj njihovih ukupnih iznosa, a iznosi završenih najmova prikazuju se zasebno. Zauzetost plovila je udio sati odabranog razdoblja u kojima plovilo ima takvu rezervaciju (razdoblja rezervacija odsijecaju se na odabrano razdoblje). Najtraženije kategorije i usluge rangiraju se prema broju takvih rezervacija. | Odluka tima | Provjeriti izračune na poznatom skupu testnih rezervacija. |
| AS-10 | Pretpostavka | Matična luka plovila ujedno je mjesto njegova preuzimanja i povrata i polazna lokacija pri pretrazi. | Odluka tima | Nije potrebno zasebno evidentirati alternativne lokacije. |
| AS-11 | Pretpostavka | Svi korisnici, uključujući djelatnike, voditelja i administratore, prijavljuju se putem Google računa. Prvog administratora određuje tim pri postavljanju sustava, svi novi korisnici dobivaju ulogu klijenta dok im administrator ne dodijeli drugu, a ulogu djelatnika i njegovu specijalnost (iz unaprijed definiranog popisa: skiper, mehaničar, kuhar, čistač i sl.) određuje administrator. | Odluka tima | Provjeriti da je moguće prijaviti sve potrebne testne korisnike i da je prvi administrator dostupan prije prve isporuke. |
| AS-12 | Pretpostavka | Vanjske usluge (hosting, baza podataka, Google prijava, servis za e-poštu, kartografski i meteorološki servis) koriste se unutar svojih besplatnih kvota i uvjeta. | Odluka tima | Provjeriti ograničenja odabranih servisa prije implementacije integracija. |
| AS-13 | Pretpostavka | Završetak najma je automatski: potvrđena rezervacija čije je vrijeme povrata proteklo vodi se kao „završeni najam". Sustav ne bilježi stvarna vremena preuzimanja i povrata niti štete. | Odluka tima | U prikazu i statistici istekla potvrđena rezervacija ima status `ZAVRSENA`, a promjena se povremeno trajno upisuje u bazu. Provjeriti testnom rezervacijom čije je razdoblje isteklo. |

## 2.5 Značajne promjene zahtjeva

Ovaj odjeljak služi za evidentiranje naknadnih promjena koje utječu na dogovoreni opseg projekta, prioritete ili kriterije prihvaćanja.

Promjene se evidentiraju tijekom razvoja projekta, uz datum, opis promjene, razlog i osobu ili kontrolnu točku na kojoj je promjena dogovorena.

| Datum | ID zahtjeva | Promjena i razlog | Dogovoreno s / dokaz |
|---|---|---|---|
| 11. 11. 2026. | C-01, NF-05, NF-06, AS-11, F-001 | Prijava putem AAI@EduHr zamijenjena je prijavom putem Google računa (OAuth 2.0). Razlog: registracija aplikacije kod AAI@EduHr i dobivanje testnih identiteta za sve uloge pokazali su se teško ostvarivima u roku projekta. Ostala pravila ostaju ista: nema lokalnih lozinki, račun se stvara pri prvoj prijavi s ulogom klijenta, a uloge vodi aplikacija. | Odluka tima G09.2 |

## 2.6 Sljedivost zahtjeva

Sljedivost povezuje zahtjeve s funkcionalnim cjelinama aplikacije, arhitekturnom realizacijom i načinima provjere. Moduli odgovaraju komponentama iz poglavlja 4.2. Stupac realizacije navodi i trenutačno stanje (sredina projekta): **implementirano**, **djelomično** ili **planirano**.

| ID zahtjeva | Obrazac uporabe / modul | Arhitekturna realizacija | Ispitivanje / provjera |
|---|---|---|---|
| F-001 | UC-008 / Korisnici i uloge | Uloga i oznaka aktivnosti u tablici `KORISNIK`; uloga se prenosi u JWT tokenu (djelomično: sučelje za dodjelu uloga planirano) |  |
| F-002 | UC-002, UC-003 / Katalog i pretraga | `GET /api/plovilo`; stranica s popisom plovila (djelomično: prikaz dodatnih usluga planiran) |  |
| F-003 | UC-002 / Katalog i pretraga | `POST /api/filter` i `GET /api/plovilo/search` s približnom (fuzzy) pretragom naziva (djelomično: cijena za razdoblje i sučelje filtra u izradi) |  |
| F-004 | UC-003 / Katalog i pretraga | `GET /api/plovilo/{id}`; stranica detalja plovila (djelomično: fotografije, oprema i kalendar planirani) |  |
| F-005 | UC-003 / Web-klijent | Karta s lukama (Leaflet, Thunderforest) i `GET /api/luka` (djelomično: oznaka matične luke na stranici plovila i obavijest pri nedostupnosti karte planirane) |  |
| F-006 | UC-003 / Vremenska prognoza | Dohvat prognoze na poslužitelju (planirano; servis nije odabran) |  |
| F-007 | UC-004 / Rezervacije | `RezervacijaService`, `KalkulatorIznosa` (slike 4.3 i 4.5; planirano) |  |
| F-008 | UC-004, UC-010 / Rezervacije, baza | Ograničenje `EXCLUDE` nad tablicom `TERMIN`, ADR-02 (implementirano u bazi) |  |
| F-009 | UC-006, UC-009 / Rezervacije | Status u `TERMIN.status` (implementirano u bazi); prijelazi prema slici 4.6 (planirano) |  |
| F-010 | UC-005 / Rezervacije | Pregled vlastitih rezervacija (planirano) |  |
| F-011 | UC-006 / Rezervacije | Izmjena i otkazivanje (planirano) |  |
| F-012 | UC-006, UC-009 / Obavijesti | Sučelje `IObavijestiService`, slanje nakon pohrane (planirano; servis nije odabran) |  |
| F-013 | UC-007 / Raspored | Raspored preuzimanja i povrata (planirano) |  |
| F-014 | UC-009 / Rezervacije | Vezna tablica `KORISNIK_REZERVACIJA`; okidač dopušta najviše jednog klijenta (implementirano u bazi); dodjela i upozorenje o preklapanju planirani |  |
| F-015 | UC-010 / Upravljanje flotom | Administracija plovila i luka (planirano) |  |
| F-016 | UC-010 / Upravljanje flotom | Cijene stavki pohranjuju se u rezervaciji (implementirano u bazi); upravljanje cjenikom planirano |  |
| F-017 | UC-009 / Rezervacije | Pregled, potvrda i odbijanje zahtjeva (planirano) |  |
| F-018 | UC-010 / Upravljanje flotom, baza | Tablica `NEDOSTUPNITERMIN` uz isto ograničenje `EXCLUDE` (implementirano u bazi); sučelje planirano |  |
| F-019 | UC-011 / Statistika i izvoz | Izračun prema AS-09 i izvoz CSV (planirano) |  |
| NF-01 | Svi / Web-klijent | Responzivni Tailwind CSS razredi (djelomično) |  |
| NF-02 | Svi / Autentifikacija | JWT s ulogom u HttpOnly kolačiću, provjera na poslužitelju (djelomično: zaštita ruta po ulogama planirana) |  |
| NF-03 | UC-004 / baza | Ograničenje `EXCLUDE` (implementirano u bazi) |  |
| NF-04 | UC-003, UC-006, UC-009 / Obavijesti, vremenska prognoza, web-klijent | Zamjenski prikaz pri kvaru servisa; e-pošta nakon pohrane (planirano) |  |
| NF-05 | UC-001 / Autentifikacija | Google OAuth 2.0, bez lozinki, HTTPS (implementirano) |  |
| NF-06 | UC-001, UC-005 / Korisnici | `KORISNIK` pohranjuje samo Google identifikator, ime, prezime, e-poštu, ulogu i aktivnost (implementirano) |  |

## 2.7 Pregled zahtjeva

Pregled zahtjeva provodi se tijekom važnih kontrolnih točaka projekta radi provjere usklađenosti implementacije s izvornim zadatkom i dogovorenim opsegom.

| Kontrolna točka | Povratna informacija ili nalaz | Odluka o zahtjevu ili opsegu |
|---|---|---|
| Iteracija 1 | — | — |
| Demo 2 | — | — |
| Završni pregled | — | — |
