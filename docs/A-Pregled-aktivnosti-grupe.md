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
| Projektni tjedni 4 i 5 | Dovršetak inicijalnog frontenda. Dokumentacija obrazaca i arhitekture. Postavljanje baze, backenda i frontenda na server. Početne rute backenda. | IŽ, BL, JG (frontend). JS, TT (dokumentacija). JG (postavljanje na server). FR, IT (backend). | Zadatak #15 |
| Projektni tjedni 6 | Promjene na bazi i dodatni podaci u bazi. Početak implementacije prijave putem OAuth 2.0. Filter i fuzzy pretraga na frontendu. | FR, IT, TT (baza). FR (prijava). IŽ, BL, JG (frontend). JS i TT (dokumentacija). | Zadaci #13, #21, #22, #23 |


<!--
## A.3 Aktivnosti i doprinosi članova

**Cilj:** Prikazati koji su članovi radili na važnim projektnim aktivnostima i približan trud koji prijavljuju. Uz implementaciju uključite oblikovanje, dokumentaciju, integraciju, ispitivanje i postavljanje.

| Aktivnost ili rezultat | Član | Prijavljeni sati | Reprezentativni rezultat ili poveznica |
| --- | --- | --- | --- |
|  |  |  |  |

Koristite aktivnosti specifične za projekt umjesto obaveznog retka za svako poglavlje dokumentacije ili svaki UML dijagram. Tim treba dosljedno bilježiti sate i izbjegavati dvostruko brojanje zajedničkog rada; reprezentativni rezultat objašnjava što je prijavljeni trud proizveo. Sati su samoprijavljena procjena uloženog rada, a ne mjera kvalitete niti zamjena za pregled koda i artefakata.

<details>
<summary><strong>Primjer aktivnosti i rezultata rada</strong></summary>

**Primjer — CrisisMap:** Tablica razlikuje implementaciju, integraciju i dokumentaciju te svaku aktivnost povezuje s rezultatom.

| Aktivnost ili rezultat | Član | Prijavljeni sati | Reprezentativni rezultat ili poveznica |
| --- | --- | --- | --- |
| Ručni unos položaja na karti | AK | 8 | Zadatak #21; promjena klijentskog dijela. |
| Provjera valjanosti i trajna pohrana prijave | LM | 10 | Zadatak #23; promjena pozadinskog sustava i ispitivanje. |
| Integracija klijenta i API-ja te javno postavljanje | EP | 7 | Zadatak #25; konfiguracija u `render.yaml` i `dist/` |
| Obrazac uporabe za podnošenje prijave i provjera odbijenog dopuštenja | NK | 5 | Završene izmjene UC-002 i ispitivanje ST-03. |

**Trud i rezultat:** Završni stupac omogućuje raspravu o doprinosu bez tretiranja velikog broja sati kao dokaza isporuke. Tim može prijaviti stvarno dugotrajan, još neriješen problem integracije kao obavljen rad i iskreno opisati njegov ishod.

</details>

## A.4 Pregled promjena u repozitoriju

**Cilj:** Prikazati kada su promjene napravljene u repozitoriju i tko ih je napravio, uz napomenu da sam broj zapisa promjena ne mjeri kvalitetu doprinosa.

**Prikaz aktivnosti repozitorija:** [Ugradite ili povežite GitHubov prikaz `Contributors` i generirani graf za projektni repozitorij; navedite razdoblje koje obuhvaća.]

Graf može pokazati kada su zapisi promjena napravljeni i tko ih je napravio, ali ne prikazuje sav rad na oblikovanju, ispitivanju, integraciji, pregledu ili dokumentaciji. Ako postoji uočljiv nesklad s tablicom aktivnosti, kratko ga objasnite; nemojte iz grafa izvoditi broj sati. Generirani prikaz neka bude vezan uz stvarni repozitorij umjesto da se ručno crta drugi graf.
-->
<!--
## A.5 Ključni inženjerski izazovi i rješenja

**Cilj:** Dokumentirati stvarne tehničke i organizacijske prepreke s kojima se tim suočio, poduzete korektivne inženjerske korake te konačni ishod. Odaberite konkretne izazove umjesto općenite pohvale timskog rada.

| Izazov | Poduzeta radnja | Ishod ili preostalo ograničenje |
| --- | --- | --- |
|  |  |  |

<details>
<summary><strong>Rješavanje nesklada formata lokacije</strong></summary>

**Primjer — CrisisMap:**

| Izazov | Poduzeta radnja | Ishod ili preostalo ograničenje |
| --- | --- | --- |
| Odabrani položaj na karti prikazivao se u klijentu, ali podnesena prijava nije zadržavala koordinate. | AK i EP usporedile su zahtjev preglednika s poljima lokacije koje očekuje API; AK je uskladila format zahtjeva, a LM je dodao provjeru valjanosti lokacije. | Nova prijava u ovom se scenariju može dohvatiti sa spremljenim položajem; tim povezuje odgovarajuću promjenu integracije i provjeru. |

**Problem, odgovor i ishod:** Svaki se dio može provjeriti u projektu. Rečenica poput „imali smo poteškoće s integracijom i riješili ih timskim radom” ne bi čitatelju rekla što nije radilo ni kako je rješenje promijenjeno.

</details>

---

>**Završna provjera:** Sastanci navode smislene ishode i odgovorne osobe; plan odražava namjeravani rad; tablica uloženog rada i generirani prikaz repozitorija odnose na ovaj vidljivi projekt; konkretni izazovi povezani su s radnjama i njihovim rezultatima. 
-->

