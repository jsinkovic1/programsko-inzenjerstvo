# Charterly — Projektna dokumentacija

**Kolegij:** [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz), Fakultet elektrotehnike i računarstva Sveučilišta u Zagrebu  
**Akademska godina:** 2026./2027.  
**Tim:** G09.2 - GitHappens  
**Nastavnik:** Vlado Sruk  
**Asistent:** Miljenko Krhen  
**Demonstrator:** Ivo Gabud  

## Pregled projekta

Charterly je web-aplikacija za upravljanje poslovanjem charter tvrtke koja iznajmljuje plovila (projektni zadatak: Charter poslovanje). Klijenti pretražuju plovila prema terminu, matičnoj luci, vrsti i kapacitetu, vide ukupnu cijenu najma i šalju zahtjev za rezervaciju, dok djelatnici, voditelj i administrator tvrtke na jednom mjestu upravljaju flotom, rezervacijama, dodatnim uslugama, nedostupnošću plovila i rasporedom preuzimanja i povrata. Korisnici se prijavljuju putem Google računa, a aplikacija uz plovila prikazuje kartu matične luke i vremensku prognozu.

**Aplikacija i osnovno postavljanje:** [README repozitorija](../README.md#quick-start)  
**Javno dostupna aplikacija:** [charterly.site](https://charterly.site); pogledajte i [README – Postavljanje](../README.md#deployment)

## Članovi tima i uloge

Ažurirani popis članova, njihovih GitHub profila i glavnih uloga ili doprinosa nalazi se u [README-u repozitoriju](../README.md#team-members).

## Kazalo dokumentacije

| Stranica | Svrha |
| --- | --- |
| [1. Opseg projekta](1-Projekt.md) | Problem, cilj i granice projekta |
| [2. Analiza zahtjeva](2-Analiza-zahtjeva.md) | Zahtjevi, ograničenja i sljedivost |
| [3. Obrasci uporabe](3-Obrasci-uporabe.md) | Akteri i reprezentativne interakcije korisnika |
| [4. Arhitektura i oblikovanje](4-Arhitektura-i-oblikovanje.md) | Glavne odluke oblikovanja, struktura, podaci i ponašanje |
| [A. Pregled aktivnosti grupe](A-Pregled-aktivnosti-grupe.md) | Aktivnosti tima, doprinosi i izazovi |
<!--
| [5. Ispitivanje](5-Ispitivanje.md) | Pristup ispitivanju, stvarni rezultati i poznati nedostaci |
| [6. Postavljanje, instalacija i konfiguracija](6-Postavljanje-instalacija-i-konfiguracija.md) | Lokalna instalacija, konfiguracija, javno postavljanje i administracija |
| [7. Zaključak i budući rad](7-Zakljucak-i-buduci-rad.md) | Zaključak i moguća daljnja poboljšanja |
-->

## Ključne točke projekta

| Kontrolna točka | Demonstracija | Video |
| --- | --- | --- |
| Iteracija 1 (polovica projekta) | [charterly.site](https://charterly.site): katalog i pretraga plovila, karta luka, prijava putem Google računa | — |
| Završni pregled | U izradi | — |

Dokumentacija se kontinuirano ažurira kako se aplikacija razvija.

## Organizacija projekta i razvojni proces

**Način rada:** cijeli tim (7 članova) sastaje se jednom tjedno radi dogovora o prioritetima i pregleda napretka, a članovi na srodnim funkcionalnostima i zadacima dodatno se međusobno usklađuju češće, prema potrebi.  
**Praćenje trenutačnih zadataka i nedostataka:** zadaci se prate u [GitHub Issues](https://github.com/jsinkovic1/programsko-inzenjerstvo/issues)


## Pravila dokumentacije

Dokumentacija se sastoji od međusobno povezanih Markdown stranica. Obavezni UML dijagrami izrađuju se u PlantUML-u (izvori u direktoriju `docs/puml/`), a čitljive SVG slike iz njih automatski izrađuje GitHub Actions pri svakom zahtjevu za uključivanje promjena (PR).


## Akademski integritet, ponašanje i licenciranje

README repozitorija sadrži projektnu [izjavu o uporabi umjetne inteligencije](../README.md#ai-usage), [informacije o kodeksu ponašanja i podršci](../README.md#code-of-conduct-and-support) te [status licence ili ponovne uporabe](../README.md#license). Pristupni podaci i druge tajne nikada se ne objavljuju u dokumentaciji niti dijele u običnim porukama.

## Izjava o uporabi umjetne inteligencije

Kratak sažetak: [README – Uporaba umjetne inteligencije](../README.md#ai-usage). Ovaj odjeljak bilježi koji su alati korišteni, za koju dokumentaciju ili kod te kako je tim provjerio rezultat. Slijedi FER-ova [pravila o primjerenoj uporabi umjetne inteligencije](https://www.fer.unizg.hr/_download/repository/Policy%20on%20the%20appropriate%20use%20of%20artificial%20intelligence%20at%20the%20faculty%20of%20electrical%20engineering%20and%20computing%5B1%5D.pdf).

Kod aplikacije (web-klijent, poslužiteljska aplikacija i baza) pisali su članovi tima. Alate umjetne inteligencije tim je koristio ponajprije za razumijevanje novih koncepata te za pregled i doradu dokumentacije.

### Korišteni alati

| Alat | Inačica ili model | Koristio/la | Glavna svrha |
| --- | --- | --- | --- |
| Claude (Claude Code) | Claude Opus | JS | Pregled dosljednosti dokumentacije sa zahtjevima i kodom, preoblikovanje teksta, nacrti PlantUML dijagrama, pomoć pri pronalasku pogrešaka u okidačima baze |
| Asistenti za razgovor (npr. ChatGPT, Claude) | Besplatne inačice | Članovi razvojnog tima | Objašnjenja koncepata: OAuth 2.0 i JWT, Entity Framework Core, React hookovi, Tailwind CSS, ograničenja u PostgreSQL-u |

### Opseg doprinosa umjetne inteligencije

| Stranica, datoteka ili artefakt | Vrsta pomoći | Što je alat proizveo | Što je tim zadao i promijenio | Lokacija |
| --- | --- | --- | --- | --- |
| 2. Analiza zahtjeva, 3. Obrasci uporabe | Pregled dosljednosti, preoblikovanje | Popis nedosljednosti između poglavlja i prijedlozi formulacija | Tim je napisao zahtjeve i obrasce; prihvaćene su samo izmjene koje odgovaraju odlukama tima | `docs/2-Analiza-zahtjeva.md`, `docs/3-Obrasci-uporabe.md` |
| 4. Arhitektura i oblikovanje | Izrada nacrta, sažimanje | Nacrt tablica odluka i ADR-ova te sažetija inačica poglavlja | Tim je zadao arhitekturne odluke, uklonio pretjerano tehničke dijelove i uskladio opis s implementacijom | `docs/4-Arhitektura-i-oblikovanje.md` |
| UML dijagrami | Izvor dijagrama | Nacrti PlantUML izvora | Tim je uskladio sudionike i korake s kodom i zahtjevima te ručno doradio dijagrame | `docs/puml/` |
| Okidači u bazi podataka | Objašnjenje pogreške | Objašnjenje zašto okidač odbija dodjelu djelatnika i zašto PL/pgSQL javlja dvosmislen naziv | FR i JS su ispravili okidače i provjerili ih na ispitnoj bazi | `db/1-charter-database-setup.sql` |
| Web-klijent i poslužiteljska aplikacija | Objašnjenje koncepata | Objašnjenja tijeka prijave, rada s bazom i React komponenti | Kod su napisali i pregledali članovi tima | `frontend/`, `backend/` |

Stranice i artefakti koji nisu navedeni iznad izrađeni su bez pomoći generativne umjetne inteligencije.

### Provjera generiranog sadržaja

| Provjera | Kako je provedena | Dokaz |
| --- | --- | --- |
| Činjenična točnost | Tvrdnje o funkcionalnostima, rutama API-ja i modelu podataka uspoređene su s kodom u repozitoriju i postavljenom aplikacijom. | Pregled zahtjeva za uključivanje promjena (PR) |
| Nema tvrdnji o neostvarenim funkcionalnostima | Arhitektura i sljedivost zahtjeva izričito označavaju što je implementirano, a što planirano. | Odjeljci 2.6 i 4.2 |
| Dosljednost s drugim stranicama | Nazivi, ID-ovi zahtjeva i dijagrami provjereni su između poglavlja 1–4. | Odjeljak 3.3 |
| Izvori dijagrama | PlantUML izvori iscrtavaju se automatski u GitHub Actionsu, a tim pregledava sliku prije spajanja. | `docs/puml/`, `docs/assets/diagrams/` |
| Povjerljivi sadržaj | U alate nisu unošeni pristupni podaci, tajne iz GitHub Secrets ni osobni podaci korisnika. | Pravilo tima |

### Pogreške pronađene u izlazu umjetne inteligencije

| Problem | Kako je pronađen | Rješenje |
| --- | --- | --- |
|  |  |  |
