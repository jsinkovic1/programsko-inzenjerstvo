# 3. Obrasci uporabe

**Cilj:** Prikazati glavne interakcije između aktera aplikacije i sustava. Opisujemo kako akter ostvaruje cilj i što se događa kada važan korak ne uspije. Interakcije temeljimo na odobrenim zahtjevima i ažuriramo ih kako se aplikacija razvija.

## 3.1 Dijagram obrazaca uporabe

**Cilj:** Prikazati granicu sustava, relevantne aktere i njihove glavne ciljeve u preglednom UML dijagramu obrazaca uporabe.

![Dijagram obrazaca uporabe sustava za charter poslovanje](./assets/diagrams/3-1-charter-system-UC.svg)

**Slika 3.1. Dijagram obrazaca uporabe sustava za charter poslovanje**

**PlantUML izvor:** [izvor](./puml/3-1-charter-system-UC.puml)

**Provjera dijagrama:** Dijagram prikazuje primarne ljudske aktere (posjetitelj, klijent, djelatnik, voditelj charter tvrtke i administrator sustava) te sekundarne vanjske sustave (AAI@EduHr, meteorološki servis, kartografski servis i servis za slanje e-pošte). Svaki akter ima izravno povezane obrasce uporabe u skladu sa svojim ovlastima, pri čemu postupak prijave (UC-001) pokreće posjetitelj kako bi pristupio sustavu, dok je pregled detalja plovila, karte i vremenske prognoze (UC-003) omogućen svim akterima. Odabir dodatnih usluga i dodatne opreme čini sastavni korak obrasca izrade rezervacije, pa je izbjegnuto nepotrebno usložnjavanje dijagrama relacijama `<<extend>>` i `<<include>>`.

## 3.2 Specifikacije obrazaca uporabe

**Cilj:** Za svaki obrazac uporabe iz dijagrama objasniti cilj aktera, uobičajenu interakciju s aplikacijom i važne alternative.

**Napomena o oznakama statusa:** Statusi rezervacije u specifikacijama zapisani su šiframa: `ZAHTJEV` = „zahtjev za rezervaciju", `POTVRDENA` = „potvrđena", `OTKAZANA` = „otkazana", `ZAVRSENA` = „završeni najam".

### UC-001: Prijava u sustav putem AAI@EduHr

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Posjetitelj (A-01) |
| **Sekundarni akter** | AAI@EduHr pružatelj identiteta (A-06) |
| **Povezani zahtjevi** | C-01, NF-02, NF-05, NF-06, AS-11 |
| **Preduvjeti** | Korisnik posjeduje važeći AAI@EduHr elektronički identitet. |
| **Glavni uspješni tok** | 1. Posjetitelj odabire prijavu putem AAI@EduHr sustava.<br>2. Aplikacija preusmjerava korisnika na središnje sučelje pružatelja identiteta.<br>3. Korisnik unosi pristupne podatke i potvrđuje prijenos identifikatora, imena, prezimena i adrese e-pošte.<br>4. Pružatelj identiteta autentificira korisnika i vraća ga u aplikaciju s OAuth 2.0 autorizacijskim kodom.<br>5. Sustav provjerava postojanje računa prema AAI@EduHr identifikatoru i e-pošti:<br>&nbsp;&nbsp;&nbsp;a) ako račun postoji i aktivan je (`aktivan = TRUE`), dohvaća se dodijeljena uloga (i specijalnost ako je djelatnik);<br>&nbsp;&nbsp;&nbsp;b) ako korisnik pristupa prvi put, sustav stvara novi račun s ulogom klijenta i postavlja ga u aktivno stanje.<br>6. Sustav uspostavlja zaštićenu sesiju i prilagođava korisničko sučelje pripadajućoj ulozi (klijent, djelatnik, voditelj ili administrator). |
| **Alternativni tokovi / Iznimke** | **3a — Neuspjela autentifikacija ili odustajanje:** Pružatelj identiteta odbija vjerodajnice ili korisnik prekida postupak; sesija se ne stvara, a korisnik ostaje neautentificirani posjetitelj.<br>**5a — Deaktiviran račun:** Ako račun u bazi ima status `aktivan = FALSE`, sustav prekida prijavu, odbacuje tokene i prikazuje poruku o deaktivaciji računa. |
| **Posljedice (ishod)** | Korisnik je autentificiran bez pohrane lokalnih lozinki; aplikacija mu dodjeljuje radno okruženje ovisno o ulozi. |

### UC-002: Pretraživanje i filtriranje plovila

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Posjetitelj (A-01) / Klijent (A-02) |
| **Povezani zahtjevi** | F-002, F-003, F-008, AS-02, AS-03, AS-10 |
| **Preduvjeti** | U bazi postoje aktivna plovila i definirane matične luke. |
| **Glavni uspješni tok** | 1. Korisnik otvara katalog plovila te zadaje kriterije: naziv, razdoblje najma (datum i vrijeme preuzimanja i povrata), matičnu luku, vrstu plovila i potreban kapacitet osoba.<br>2. Sustav provjerava valjanost unesenog razdoblja.<br>3. Sustav izračunava broj dana najma prema pravilu AS-03 (zaokruživanje na 24-satna razdoblja naviše).<br>4. Sustav pronalazi plovila koja zadovoljavaju kriterije i koja u tablici zauzetosti nemaju preklapanja u traženom intervalu.<br>5. Za svako dostupno plovilo sustav prikazuje osnovne podatke i izračunatu cijenu najma za zadano razdoblje.<br>6. Prikazuje se filtrirani popis plovila. |
| **Alternativni tokovi / Iznimke** | **2a — Neispravno razdoblje:** Vrijeme preuzimanja je u prošlosti ili je povrat prije preuzimanja; sustav odbija pretragu uz poruku upozorenja.<br>**4a — Nema rezultata:** Niti jedno plovilo ne zadovoljava zadane uvjete; sustav prikazuje obavijest o nepostojanju slobodnih plovila i predlaže izmjenu parametara. |
| **Posljedice (ishod)** | Korisnik ima uvid u slobodna plovila i točan izračun cijene osnovnog najma za odabrani termin. |

### UC-003: Pregled detalja plovila, lokacije i vremenske prognoze

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Posjetitelj (A-01) / Klijent (A-02) / Djelatnik (A-03) / Voditelj (A-04) / Administrator (A-05) |
| **Sekundarni akteri** | Meteorološki servis (A-07), Kartografski servis (A-08) |
| **Povezani zahtjevi** | F-002, F-004, F-005, F-006, C-02, C-03, NF-04, NF-06, AS-08 |
| **Preduvjeti** | Plovilo je evidentirano i aktivno u katalogu. |
| **Glavni uspješni tok** | 1. Korisnik odabire plovilo iz kataloga ili rezultata pretrage.<br>2. Sustav prikazuje tehničke detalje plovila, osnovnu opremu, galeriju fotografija (s označenom glavnom slikom) i cijenu po danu najma.<br>3. Sustav generira i prikazuje kalendar zauzetosti plovila (prikaz zauzetih i servisnih termina bez otkrivanja identiteta klijenata).<br>4. Sustav šalje koordinate matične luke kartografskom servisu i prikazuje interaktivnu kartu mjesta preuzimanja.<br>5. Sustav šalje upit meteorološkom servisu za odabrano razdoblje i lokaciju te prikazuje podatke o temperaturi, vjetru i vremenskim uvjetima. |
| **Alternativni tokovi / Iznimke** | **4a — Kartografski servis nedostupan:** Prikazuje se tekstualna obavijest o nedostupnosti karte; ostali podaci ostaju dostupni.<br>**5a — Meteorološki servis nedostupan ili izvan dometa:** Prikazuje se obavijest o nedostupnosti prognoze za traženi termin, a stranica nastavlja s radom. |
| **Posljedice (ishod)** | Korisnik raspolaže potpunim informacijama o plovilu, lokaciji matične baze i meteorološkim uvjetima. |

### UC-004: Izrada zahtjeva za rezervaciju

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Klijent (A-02) |
| **Povezani zahtjevi** | F-007, F-008, F-009, NF-03, AS-01, AS-02, AS-03, AS-05, AS-06 |
| **Preduvjeti** | Korisnik je prijavljen s ulogom klijenta i odabrao je raspoloživo plovilo. |
| **Glavni uspješni tok** | 1. Klijent unosi datum i vrijeme preuzimanja i povrata te broj osoba.<br>2. Sustav provjerava ispravnost intervala i provjerava da broj osoba ne premašuje kapacitet plovila.<br>3. Klijent po želji odabire dodatne usluge (jednokratna naknada) i dodatnu opremu uz odabir količine (naplata po danu najma).<br>4. Sustav izračunava i prikazuje specifikaciju ukupnog iznosa.<br>5. Klijent potvrđuje slanje zahtjeva.<br>6. Sustav unutar bazične transakcije ponovno provjerava raspoloživost termina kako bi spriječio preklapanje.<br>7. Sustav zauzima termin u tablici `TERMIN` sa statusom `ZAHTJEV`, sprema rezervaciju u tablicu `REZERVACIJA` te pohranjuje ugovorene cijene stavki.<br>8. Klijentu se prikazuje potvrda o zaprimljenom zahtjevu. |
| **Alternativni tokovi / Iznimke** | **2a — Prekoračen kapacitet plovila ili neispravno vrijeme:** Sustav onemogućuje slanje zahtjeva i označava neispravna polja.<br>**6a — Istodobno zauzeće termina:** U međuvremenu je drugi korisnik poslao zahtjev ili potvrdio rezervaciju za isti termin, ili je administrator unio preklapajuće razdoblje nedostupnosti; transakcija se prekida, a klijent dobiva obavijest da je plovilo u međuvremenu zauzeto. |
| **Posljedice (ishod)** | Zahtjev za rezervaciju je evidentiran u bazi, termin je označen kao zauzet, a status rezervacije čeka administratorsku obradu. |

### UC-005: Pregled vlastitih rezervacija

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Klijent (A-02) |
| **Povezani zahtjevi** | F-010, NF-02, NF-06 |
| **Preduvjeti** | Klijent je prijavljen u sustav. |
| **Glavni uspješni tok** | 1. Klijent otvara modul vlastitih rezervacija.<br>2. Sustav prikazuje sve njegove rezervacije s podacima: naziv plovila, razdoblje najma, status (`ZAHTJEV`, `POTVRDENA`, `OTKAZANA`, `ZAVRSENA`), popis odabranih usluga i opreme te ukupni iznos.<br>3. Ako je rezervacija u statusu `POTVRDENA`, a vrijeme povrata je proteklo, sustav je prikazuje kao `ZAVRSENA` (AS-13).<br>4. Klijent može odabrati pojedinu rezervaciju radi izmjene ili otkazivanja (UC-006). |
| **Alternativni tokovi / Iznimke** | **2a — Nema evidentiranih rezervacija:** Sustav prikazuje prazan popis uz poruku da klijent nema aktivnih rezervacija.<br>**2b — Pokušaj pristupa tuđoj rezervaciji:** Sustav odbija neovlašteni pristup i bilježi sigurnosno upozorenje. |
| **Posljedice (ishod)** | Klijent ima cjelovit i zaštićen uvid u status i troškove svih svojih rezervacija. |

### UC-006: Izmjena i otkazivanje vlastite rezervacije

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Klijent (A-02) |
| **Sekundarni akter** | Servis za slanje e-pošte (A-09) |
| **Povezani zahtjevi** | F-009, F-011, F-012, NF-04, AS-07 |
| **Preduvjeti** | Klijent je prijavljen i posjeduje rezervaciju koja još nije započela. |
| **Glavni uspješni tok (Izmjena)** | 1. Klijent odabire rezervaciju koja je u statusu `ZAHTJEV` i pokreće izmjenu.<br>2. Klijent mijenja razdoblje najma, broj osoba ili odabrane dodatne usluge/opremu.<br>3. Sustav provjerava raspoloživost novog termina i kapacitet te ponovno izračunava ukupni iznos.<br>4. Klijent potvrđuje izmjenu; sustav ažurira rezervaciju u bazi. |
| **Glavni uspješni tok (Otkazivanje)** | 1. Klijent odabire rezervaciju u statusu `ZAHTJEV` ili `POTVRDENA` i pokreće otkazivanje.<br>2. Klijent potvrđuje namjeru otkazivanja.<br>3. Sustav postavlja status rezervacije na `OTKAZANA` i oslobađa pripadajući termin plovila.<br>4. Sustav putem servisa e-pošte klijentu šalje obavijest o otkazivanju (F-012). |
| **Alternativni tokovi / Iznimke** | **1a — Pokušaj izmjene potvrđene rezervacije:** Sustav obavještava klijenta da se potvrđena rezervacija ne može izravno mijenjati te ga upućuje na otkazivanje i izradu novog zahtjeva (AS-07).<br>**1b — Pokušaj otkazivanja nakon početka najma:** Datum i vrijeme preuzimanja su nastupili; sustav odbija otkazivanje.<br>**4a — Neuspjelo slanje e-pošte:** Otkazivanje ostaje evidentirano u bazi, a neuspjeh slanja poruke se bilježi bez prekida toka (NF-04). |
| **Posljedice (ishod)** | Zahtjev je izmijenjen ili je rezervacija otkazana, pri čemu se termin plovila oslobađa za druge korisnike bez naplate naknade. |

### UC-007: Pregled rasporeda preuzimanja i povrata plovila

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Djelatnik charter tvrtke (A-03) |
| **Povezani zahtjevi** | F-013, NF-06, AS-13 |
| **Preduvjeti** | Djelatnik je prijavljen u sustav sa svojom ulogom. |
| **Glavni uspješni tok** | 1. Djelatnik otvara operativni raspored preuzimanja i povrata plovila.<br>2. Djelatnik filtrira prikaz po odabranom danu ili razdoblju.<br>3. Sustav prikazuje popis rezervacija u statusu `POTVRDENA` ili `ZAVRSENA` s podacima o plovilu, klijentu (ime, prezime, kontakt e-pošta), točnom vremenu preuzimanja i povrata, matičnoj luci te odabranim uslugama i opremi.<br>4. Djelatnik koristi podatke za pripremu plovila i operativnu koordinaciju u marini. |
| **Alternativni tokovi / Iznimke** | **3a — Nema planiranih primopredaja:** Za odabrani dan nema takvih rezervacija; sustav prikazuje informaciju o praznom rasporedu. |
| **Posljedice (ishod)** | Djelatnik ima pravodoban uvid u operativne zadatke i raspored kretanja plovila u bazi. |

### UC-008: Upravljanje korisničkim računima i specijalnostima

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Administrator sustava (A-05) |
| **Povezani zahtjevi** | F-001, NF-02, AS-11 |
| **Preduvjeti** | Administrator je prijavljen u sustav. |
| **Glavni uspješni tok** | 1. Administrator otvara modul za upravljanje korisničkim računima.<br>2. Sustav prikazuje popis korisnika (ime, prezime, e-pošta, uloga, specijalnost, status aktivnosti).<br>3. Administrator odabire korisnika i mijenja mu ulogu (klijent, djelatnik, voditelj, administrator).<br>4. Ako je odabrana uloga „djelatnik”, administrator obavezno odabire njegovu specijalnost (skiper, mehaničar, kuhar, čistač i sl.).<br>5. Za uloge koje nisu djelatnik, sustav onemogućuje odabir specijalnosti.<br>6. Administrator može aktivirati ili deaktivirati račun korisnika.<br>7. Administrator potvrđuje izmjene; sustav ažurira podatke u bazi. |
| **Alternativni tokovi / Iznimke** | **4a — Djelatniku nije dodijeljena specijalnost:** Sustav odbija spremanje promjene uz poruku da je specijalnost obavezna za djelatnike.<br>**6a — Deaktivacija zadnjeg aktivnog administratora:** Sustav provjerava ukupan broj aktivnih administratora i odbija deaktivaciju ili promjenu uloge ako se radi o jedinom preostalom administratoru. |
| **Posljedice (ishod)** | Korisnički račun ima ažurirana prava i ulogu, što izravno određuje njegove mogućnosti pri sljedećem zahtjevu prema poslužitelju. |

### UC-009: Obrada rezervacija i dodjela djelatnika

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Administrator sustava (A-05) |
| **Sekundarni akter** | Servis za slanje e-pošte (A-09) |
| **Povezani zahtjevi** | F-009, F-012, F-014, F-017, C-04, NF-04, AS-01, AS-14 |
| **Preduvjeti** | Administrator je prijavljen; u sustavu postoje rezervacije za obradu. |
| **Glavni uspješni tok** | 1. Administrator otvara pregled rezervacija, primjenjuje filtre i odabire zahtjev za rezervaciju.<br>2. Administrator rezervaciji (u statusu `ZAHTJEV` ili `POTVRDENA`) dodjeljuje djelatnike (odabir aktivnih korisnika s ulogom djelatnika). Sustav pri dodjeli provjerava preklapanje djelatnika s drugim rezervacijama i prikazuje informativno upozorenje s popisom tih rezervacija.<br>3. Administrator odabire akciju `POTVRDENA`. Sustav pri potvrdi provjerava je li specijalnost koju zahtijeva neka odabrana usluga pokrivena dodijeljenim djelatnicima i, ako nije, prikazuje informativno upozorenje; potvrda ostaje moguća.<br>4. Sustav mijenja status rezervacije u `POTVRDENA`.<br>5. Sustav putem servisa e-pošte klijentu šalje potvrdu rezervacije s podacima o plovilu, razdoblju, uslugama i opremom, iznosu i mjestu preuzimanja.<br>6. Sustav bilježi slanje obavijesti. |
| **Alternativni tokovi / Iznimke** | **2a — Dodjela na već potvrđenoj rezervaciji:** Administrator može dodavati i uklanjati djelatnike i nakon potvrde (F-014).<br>**3a — Administrator odbija zahtjev:** Administrator odabire odbijanje; sustav postavlja status na `OTKAZANA`, oslobađa termin plovila i šalje klijentu obavijest o odbijanju.<br>**3b — Otkazivanje ranije potvrđene rezervacije:** Administrator otkazuje potvrđenu rezervaciju prije početka najma; status prelazi u `OTKAZANA`, a termin se oslobađa.<br>**5a — Neuspjelo slanje potvrdne e-pošte:** Status rezervacije ostaje `POTVRDENA`, u bazi se bilježi neuspjeh slanja, a administrator dobiva upozorenje o potrebi provjere servisa (NF-04). |
| **Posljedice (ishod)** | Rezervacija je potvrđena (ili otkazana), djelatnici su pridruženi najmu, a klijentu je isporučena obavijest e-poštom. |

### UC-010: Upravljanje flotom, cjenicima i razdobljima nedostupnosti

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Administrator sustava (A-05) |
| **Povezani zahtjevi** | F-008, F-015, F-016, F-018, AS-05 |
| **Preduvjeti** | Administrator je prijavljen u sustav. |
| **Glavni uspješni tok** | 1. Administrator odabire operaciju nad resursima: plovila, matične luke, vrste plovila, oprema, fotografije, cijene ili razdoblja nedostupnosti.<br>2. Pri unosu/uređivanju plovila zadaju se karakteristike, matična luka, dnevna cijena, osnovna oprema i fotografije (određuje se najviše jedna glavna slika).<br>3. Pri unosu usluga i dodatne opreme definiraju se nazivi i cijene (usluge jednokratno, oprema po danu najma).<br>4. Pri evidenciji nedostupnosti plovila administrator unosi razdoblje i razlog (servis, održavanje, drugo).<br>5. Sustav provjerava preklapa li se razdoblje nedostupnosti s postojećim rezervacijama u statusu `ZAHTJEV` ili `POTVRDENA`.<br>6. Sustav sprema promjene; podaci postaju vidljivi u katalogu, a plovilo u servisu nedostupno za rezervacije. |
| **Alternativni tokovi / Iznimke** | **2a — Pokušaj trajnog brisanja plovila s rezervacijama:** Sustav odbija brisanje i omogućuje isključivo deaktivaciju plovila (F-015).<br>**5a — Preklapanje nedostupnosti s postojećom rezervacijom:** Sustav odbija unos nedostupnosti uz obavijest o konfliktu dok se rezervacija ne otkaže (F-018). |
| **Posljedice (ishod)** | Flota, cjenici i termini servisa ažurirani su u bazi podataka bez utjecaja na iznose već sklopljenih rezervacija. |

### UC-011: Pregled statistike poslovanja i izvoz izvještaja

| Element specifikacije | Opis |
| :--- | :--- |
| **Primarni akter** | Voditelj charter tvrtke (A-04) / Administrator (A-05) |
| **Povezani zahtjevi** | F-019, C-05, AS-09 |
| **Preduvjeti** | Korisnik je prijavljen s ulogom voditelja ili administratora. |
| **Glavni uspješni tok** | 1. Korisnik odabire željeno razdoblje za analizu poslovanja.<br>2. Sustav dohvaća sve rezervacije u statusima `POTVRDENA` ili `ZAVRSENA`.<br>3. Sustav izračunava statističke pokazatelje prema AS-09: ukupan broj rezervacija, stopu zauzetosti plovila (udio sati), zbroj ugovorenih iznosa (uz zaseban prikaz iznosa završenih najmova) te rang-listu najtraženijih vrsta plovila i dodatnih usluga.<br>4. Aplikacija prikazuje izvještaj na zaslonu u tabličnom i grafičkom obliku.<br>5. Korisnik pokreće akciju izvoza u CSV.<br>6. Sustav generira standardnu CSV datoteku i započinje preuzimanje. |
| **Alternativni tokovi / Iznimke** | **2a — Nema evidentiranih rezervacija za zadano razdoblje:** Sustav prikazuje nulte vrijednosti u izvještaju te omogućuje izvoz pripremljene CSV datoteke sa zaglavljima. |
| **Posljedice (ishod)** | Korisnik ima uvid u ključne poslovne pokazatelje i raspolaže lokalnom CSV datotekom pogodnom za daljnju analizu. |

## 3.3 Provjera dosljednosti obrazaca uporabe

**Cilj:** Provjeriti međusobnu usklađenost obrazaca uporabe, aktera, zahtjeva i ispitnih slučajeva. Cjelovito mapiranje održava se isključivo u matrici sljedivosti zahtjeva.

| Provjera | Pitanje za tim | Nalaz i usklađenost |
| :--- | :--- | :--- |
| **Zahtjev** | Je li svaki važan obrazac uporabe povezan s postojećim zahtjevom? | Svih 19 funkcijskih zahtjeva (F-001 do F-019) izravno je pokriveno kroz 11 cjelovitih specifikacija obrazaca uporabe. Pretpostavka AS-13 (automatski završetak najma) primijenjena je u UC-005, UC-007 i UC-011. |
| **Akter** | Odgovara li akter naveden ovdje prethodno utvrđenoj ulozi i dopuštenoj interakciji? | Akteri u potpunosti odgovaraju dionicima iz odjeljka 2.3. Djelatnik posjeduje specijalnost, prijava se provodi isključivo kroz AAI@EduHr (C-01), a vanjski servisi djeluju kao sekundarni akteri. |
| **Aplikacija** | Može li tim demonstrirati opisani glavni rezultat i važnu alternativu ili je opis jasno označen kao trenutačno oblikovanje? | Svi tokovi i alternative (npr. sprječavanje preklapanja, prekid slanja e-pošte bez rušenja transakcije, kontrola zadnjeg administratora) provjerljivi su testnim slučajevima koji će se navesti u matrici sljedivosti (2.6). |