# Charterly

Web-aplikacija za podršku poslovanju charter tvrtke koja iznajmljuje plovila, od pretrage i rezervacije plovila do upravljanja flotom i praćenja poslovanja.

**Projekt na kolegiju:** Ovu je aplikaciju razvio studentski tim u sklopu kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu (FER).

## Opis aplikacije


Kada se ponuda, raspoloživost plovila i rezervacije vode u odvojenim evidencijama, teško je imati pregled poslovanja i lako dolazi do dvostrukog rezerviranja. Aplikacija klijentima omogućuje da pronađu slobodno plovilo za željeni termin, vide ukupnu cijenu najma i pošalju zahtjev za rezervaciju, a djelatnicima, voditelju i administratoru tvrtke daje jedno mjesto za upravljanje flotom, rezervacijama i rasporedom preuzimanja i povrata. Aplikacija je u razvoju, pa funkcionalnosti u nastavku čine planirani opseg.

**Ključne funkcionalnosti (planirani opseg)**

- Pretraživanje plovila prema terminu, matičnoj luci, vrsti plovila i kapacitetu, uz prikaz cijene najma za odabrano razdoblje.
- Detalji plovila s fotografijama, opremom, kalendarom raspoloživosti, položajem matične luke na karti i vremenskom prognozom.
- Rezervacija plovila s dodatnim uslugama i opremom, uz izračun ukupnog iznosa, sprječavanje preklapanja termina i potvrdu e-poštom.
- Upravljanje flotom, cijenama, uslugama, nedostupnošću plovila i rezervacijama te raspored preuzimanja i povrata za djelatnike.
- Statistika poslovanja s izvozom izvještaja u CSV.
- Prijava putem Google računa s ulogama klijenta, djelatnika, voditelja i administratora.

Za potpuni opseg, zahtjeve i oblikovanje pogledajte [docs](docs/Home.md).

<a id="deployment"></a>
## Postavljanje (engl. deployment)

**Javno dostupna aplikacija:** [https://charterly.site](https://charterly.site)

**Isprobajte:** Na početnoj stranici odaberite „Otvori kartu” i kliknite oznaku luke: prikazuju se plovila s matičnom lukom u toj luci. Na stranici [popisa plovila](https://charterly.site/details) upišite dio naziva plovila (npr. „Morska”) i otvorite detalje plovila.

**Demonstracija:** Za pregled kataloga i karte korisnički račun nije potreban. Za prijavu je potreban Google račun; prijava se pokreće iz izbornika korisnika u zaglavlju, a novi korisnik pri prvoj prijavi dobiva ulogu klijenta.

**Ograničenja:** Ovo je inačica s polovice projekta. Rezervacije, administracija, raspored, statistika, obavijesti e-poštom i vremenska prognoza još nisu implementirani, a fotografije plovila zasad su zamjenske slike. Poznati tehnički dug i rizici navedeni su u [arhitekturi, odjeljak 4.7](docs/4-Arhitektura-i-oblikovanje.md#47-arhitekturni-rizici-i-tehnički-dug).

Aplikacija se kao Docker kontejner automatski postavlja na virtualni poslužitelj Amazon EC2 pri svakoj promjeni na grani `main` (GitHub Actions, `.github/workflows/cd.yml`). Postavljanje je opisano u [arhitekturi, odjeljak 4.2](docs/4-Arhitektura-i-oblikovanje.md#42-gradivni-blokovi-i-uml-dijagram-komponenata).

<a id="quick-start"></a>
## Brzi početak / instalacija

**Preduvjeti:** .NET 10 SDK, Node.js (inačica 22 ili novija) s npm-om, Docker (za bazu podataka) te OAuth klijent u Google Cloud konzoli (Client ID i Client Secret) s povratnom adresom `https://localhost:5201/signin-google`.

```bash
git clone https://github.com/jsinkovic1/programsko-inzenjerstvo.git
cd programsko-inzenjerstvo

# 1. Baza podataka: PostgreSQL 18 sa shemom i testnim podacima iz direktorija db/
docker build -t charter-db db/
docker run -d --name charter-db -e POSTGRES_PASSWORD=<lozinka> -p 5432:5432 charter-db

# 2. Poslužiteljska aplikacija (API na https://localhost:5201)
export HOST_ADDRESS=localhost HOST_PORT=5432 DATABASE_NAME=testdb DATABASE_USER=postgres DATABASE_PASSWORD=<lozinka>
export GOOGLE_CLIENT_ID=<client-id> GOOGLE_CLIENT_SECRET=<client-secret> Jwt__Secret=<nasumičan niz od najmanje 32 znaka>
dotnet dev-certs https --trust
dotnet run --project backend/CharterBackend.csproj

# 3. Web-klijent (u drugom terminalu)
cd frontend
npm install
npm run dev
```

**Adresa:** Web-klijent je dostupan na `https://localhost:5173`, a API na `https://localhost:5201`. Razvojni poslužitelj koristi samopotpisani certifikat, pa preglednik pri prvom otvaranju traži potvrdu.

**Konfiguracija:** Poslužiteljska aplikacija čita postavke iz varijabli okruženja: `HOST_ADDRESS`, `HOST_PORT`, `DATABASE_NAME`, `DATABASE_USER` i `DATABASE_PASSWORD` za bazu, `GOOGLE_CLIENT_ID` i `GOOGLE_CLIENT_SECRET` za Google prijavu te `Jwt__Secret` za potpis tokena. Bez postavki za Google prijavu poslužitelj ne može obraditi zahtjeve. Vrijednosti za postavljenu aplikaciju čuvaju se u GitHub Secrets; lokalno ih svaki član postavlja sam i nikad ih ne zapisuje u repozitorij. Web-klijent u razvojnom načinu prosljeđuje zahtjeve na `/api` prema adresi zadanoj u `frontend/vite.config.js` (`server.proxy`); za rad s lokalnim API-jem ta adresa treba biti `https://localhost:5201`.

Za provjeru otvorite `https://localhost:5173/map`: na karti se prikazuju oznake luka s brojem plovila. Za detaljno postavljanje pogledajte [projektnu dokumentaciju](docs/Home.md).

## Tehnologije
 
| Tehnologija ili alat | Uloga u ovom projektu | Razlog uporabe |
| --- | --- | --- |
| React (Vite, Tailwind CSS) | Korisničko sučelje: katalog, pretraga, karta, rezervacije te sučelja za djelatnike, voditelja i administratora. | Komponente olakšavaju izradu responzivnog sučelja za računala, tablete i mobitele; Vite omogućuje brz razvoj i izradu produkcijske inačice. |
| C# (ASP.NET Core) | Poslužiteljska strana: poslovna pravila, prijava, slanje e-pošte i pozivi vanjskih servisa. | Zreo okvir za izradu REST API-ja s ugrađenom podrškom za autentifikaciju i autorizaciju; uz Entity Framework Core olakšava rad s bazom. |
| PostgreSQL | Pohranjuje korisnike, plovila, rezervacije, usluge i termine zauzetosti. | Pouzdana relacijska baza čije ograničenje `EXCLUDE` (proširenje `btree_gist`) sprječava preklapanje rezervacija i pri istodobnim zahtjevima. |
| Google prijava (OAuth 2.0) | Prijava korisnika; poslužitelj nakon prijave izdaje vlastiti JWT u HttpOnly kolačiću. | Zamjena za AAI@EduHr, kojem tim nije pravodobno dobio pristup. Aplikacija ne pohranjuje lozinke, a uloge i specijalnosti djelatnika vodi sama. |
| Servis za e-poštu (još nije odabran) | Slat će klijentu potvrdu rezervacije i obavijest o otkazivanju. | Servis se odabire prije implementacije obrade rezervacija. |
| Thunderforest (uz biblioteku Leaflet) | Kartografske pločice za kartu s položajem matičnih luka i plovilima u svakoj luci. | Zadatak traži prikaz lokacije luke; Leaflet omogućuje interaktivnu kartu u pregledniku bez opterećenja poslužitelja. |
| Meteorološki servis (još nije odabran) | Dohvaćat će vremensku prognozu za matičnu luku i razdoblje najma. | Zadatak traži prikaz prognoze; servis se odabire u drugoj polovici projekta. |
| AWS EC2, Docker i GitHub Actions | Pokreću aplikaciju na adresi charterly.site; svaka promjena na grani `main` automatski se izgrađuje i postavlja. | Potpuna kontrola nad poslužiteljem i domenom (Google prijava zahtijeva HTTPS i domenu); isti postupak postavljanja pri svakoj promjeni. |

<a id="team-members"></a>
## Članovi tima

| Član | Glavna uloga ili doprinos |
| --- | --- |
| [Jakov Gregurić](https://github.com/jgreguric) | DevOps, Frontend |
| [Borna Lončar](https://github.com/SuperWahara) | Frontend |
| [Fabijan Radat](https://github.com/Fabijan9999) | Backend, baza podataka |
| [Josip Sinković](https://github.com/jsinkovic1) | Voditelj, testiranje, dokumentacija |
| [Ivan Tačković](https://github.com/IvanTackovic) | Backend, baza podataka, testiranje |
| [Toni Travica](https://github.com/ttravica) | Baza podataka, dokumentacija |
| [Ivana Žukina](https://github.com/Ivana-Zukina) | Frontend |


## Doprinos projektu

Cijeli tim sastaje se jednom tjedno radi dogovora o prioritetima i pregleda napretka, a članovi koji rade na srodnim funkcionalnostima češće se međusobno usklađuju. Zadaci i nedostaci vode se u [GitHub Issues](https://github.com/jsinkovic1/programsko-inzenjerstvo/issues).
 
Izravni `push` na granu `main` nije dopušten. Sve promjene izrađuju se na zasebnim granama i predaju kao pull requestovi. Prije spajanja na `main` svaki pull request mora imati odobrenje (engl. approval) barem jednog drugog člana tima koji je pregledao kod.

<a id="license"></a>
## Licenca
 
**Status licence:** Projekt je licenciran licencom [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/). Puni tekst nalazi se u datoteci [LICENSE](LICENSE).
 

<a id="ai-usage"></a>
## Uporaba umjetne inteligencije [![AI Usage: Disclosed](https://img.shields.io/badge/AI%20Usage-Disclosed-blue.svg)](https://www.fer.unizg.hr/_download/repository/Policy%20on%20the%20appropriate%20use%20of%20artificial%20intelligence%20at%20the%20faculty%20of%20electrical%20engineering%20and%20computing%5B1%5D.pdf)

Ovaj projekt slijedi FER-ova [pravila o primjerenoj uporabi umjetne inteligencije](https://www.fer.unizg.hr/_download/repository/Policy%20on%20the%20appropriate%20use%20of%20artificial%20intelligence%20at%20the%20faculty%20of%20electrical%20engineering%20and%20computing%5B1%5D.pdf).

**Izjava:** Tim je koristio alate generativne umjetne inteligencije (Claude, ChatGPT) u ograničenoj mjeri. Kod aplikacije (web-klijent, poslužiteljska aplikacija i baza podataka) pisali su članovi tima, a alate su koristili ponajprije za objašnjenje novih koncepata (npr. OAuth 2.0 i JWT, Entity Framework Core, React). U dokumentaciji su alati pomogli pri provjeri dosljednosti poglavlja, preoblikovanju teksta i nacrtima PlantUML dijagrama. Tim je svaki prihvaćeni prijedlog provjerio prema kodu i zahtjevima i može objasniti sav objavljeni sadržaj. U alate nisu unošeni pristupni podaci ni osobni podaci.

Detaljan zapis uporabe nalazi se u [projektnoj dokumentaciji](docs/Home.md#izjava-o-uporabi-umjetne-inteligencije).

<a id="code-of-conduct-and-support"></a>
## Kodeks ponašanja i podrška [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

Od članova tima očekuje se pridržavanje **Kodeksa ponašanja studenata** Fakulteta elektrotehnike i računarstva Sveučilišta u Zagrebu, pravila timskog rada na kolegiju i [Etičkog kodeksa IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html). Pravila ponašanja u projektu opisana su u datoteci [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

---

Struktura dokumentacije prilagođena je predlošku kolegija Programsko inženjerstvo FER-a autora [Vlade Sruka](https://www.fer.unizg.hr/vlado.sruk), licenciranom pod [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Aplikaciju i njezin sadržaj izradio je gore navedeni studentski tim.
