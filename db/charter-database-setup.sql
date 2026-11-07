CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE TABLE KORISNIK
(
  idKorisnika INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) NOT NULL,
  ime VARCHAR(50) NOT NULL,
  prezime VARCHAR(50) NOT NULL,
  mail VARCHAR(100) NOT NULL,
  aktivan BOOLEAN NOT NULL,
  uloga VARCHAR(20) NOT NULL,
  PRIMARY KEY (idKorisnika),
  UNIQUE (username),
  UNIQUE (mail)
);

CREATE TABLE LUKA
(
  idLuke INT GENERATED ALWAYS AS IDENTITY,
  nazivLuke VARCHAR(100) NOT NULL,
  mjesto VARCHAR(100) NOT NULL,
  latituda NUMERIC(9,6) NOT NULL,
  longituda NUMERIC(9,6) NOT NULL,
  PRIMARY KEY (idLuke)
);

CREATE TABLE TIPPLOVILA
(
  idTipaPlovila INT GENERATED ALWAYS AS IDENTITY,
  nazivTipaPlovila VARCHAR(50) NOT NULL,
  PRIMARY KEY (idTipaPlovila)
);

CREATE TABLE PROIZVODAC
(
  idProizvodaca INT GENERATED ALWAYS AS IDENTITY,
  nazivProizvodaca VARCHAR(100) NOT NULL,
  PRIMARY KEY (idProizvodaca)
);

CREATE TABLE PLOVILO
(
  idPlovila INT GENERATED ALWAYS AS IDENTITY,
  nazivPlovila VARCHAR(100) NOT NULL,
  godinaProizvodnje INT NOT NULL,
  kapacitet INT NOT NULL,
  brojKabina INT NOT NULL,
  brojLezajeva INT NOT NULL,
  model VARCHAR(50) NOT NULL,
  dnevnaCijenaNajma NUMERIC(10,2) NOT NULL,
  idLuke INT NOT NULL,
  idTipaPlovila INT NOT NULL,
  idProizvodaca INT NOT NULL,
  PRIMARY KEY (idPlovila),
  FOREIGN KEY (idLuke) REFERENCES LUKA(idLuke),
  FOREIGN KEY (idTipaPlovila) REFERENCES TIPPLOVILA(idTipaPlovila),
  FOREIGN KEY (idProizvodaca) REFERENCES PROIZVODAC(idProizvodaca)
);

CREATE TABLE FOTOGRAFIJA
(
  idFotografije INT GENERATED ALWAYS AS IDENTITY,
  url VARCHAR(255) NOT NULL,
  glavnaSlika BOOLEAN NOT NULL,
  idPlovila INT NOT NULL,
  PRIMARY KEY (idFotografije),
  FOREIGN KEY (idPlovila) REFERENCES PLOVILO(idPlovila)
);

CREATE TABLE OPREMA
(
  idOpreme INT GENERATED ALWAYS AS IDENTITY,
  nazivOpreme VARCHAR(100) NOT NULL,
  cijenaNajma NUMERIC(10,2) NOT NULL,
  PRIMARY KEY (idOpreme)
);

CREATE TABLE USLUGA
(
  idUsluge INT GENERATED ALWAYS AS IDENTITY,
  nazivUsluge VARCHAR(100) NOT NULL,
  cijenaUsluge NUMERIC(10,2) NOT NULL,
  PRIMARY KEY (idUsluge)
);

CREATE TABLE TERMIN
(
  idTermina INT GENERATED ALWAYS AS IDENTITY,
  vrijemeOd TIMESTAMP NOT NULL,
  vrijemeDo TIMESTAMP NOT NULL,
  status VARCHAR(30) NOT NULL,
  idPlovila INT NOT NULL,
  PRIMARY KEY (idTermina),
  FOREIGN KEY (idPlovila) REFERENCES PLOVILO(idPlovila)
);

CREATE TABLE REZERVACIJA
(
  idTermina INT NOT NULL,
  iznos NUMERIC(10,2) NOT NULL,
  poslanaObavijest BOOLEAN NOT NULL,
  brojOsoba INT NOT NULL,
  datumKreiranja DATE NOT NULL,
  PRIMARY KEY (idTermina),
  FOREIGN KEY (idTermina) REFERENCES TERMIN(idTermina)
);

CREATE TABLE NEDOSTUPNITERMIN
(
  idTermina INT NOT NULL,
  opis VARCHAR(255) NOT NULL,
  PRIMARY KEY (idTermina),
  FOREIGN KEY (idTermina) REFERENCES TERMIN(idTermina)
);

CREATE TABLE KORISNIK_REZERVACIJA
(
  idTermina INT NOT NULL,
  idKorisnika INT NOT NULL,
  PRIMARY KEY(idTermina, idKorisnika),
  FOREIGN KEY (idTermina) REFERENCES REZERVACIJA(idTermina),
  FOREIGN KEY (idKorisnika) REFERENCES KORISNIK(idKorisnika)
);

CREATE TABLE IMAOPREMU
(
  idPlovila INT NOT NULL,
  idOpreme INT NOT NULL,
  PRIMARY KEY (idPlovila, idOpreme),
  FOREIGN KEY (idPlovila) REFERENCES PLOVILO(idPlovila),
  FOREIGN KEY (idOpreme) REFERENCES OPREMA(idOpreme)
);

CREATE TABLE IMADODATNEUSLUGE
(
  idUsluge INT NOT NULL,
  idTermina INT NOT NULL,
  cijenaDodatneUsluge NUMERIC(10,2) NOT NULL,
  PRIMARY KEY (idUsluge, idTermina),
  FOREIGN KEY (idUsluge) REFERENCES USLUGA(idUsluge),
  FOREIGN KEY (idTermina) REFERENCES REZERVACIJA(idTermina)
);

CREATE TABLE IMADODATNUOPREMU
(
  idOpreme INT NOT NULL,
  idTermina INT NOT NULL,
  kolicinaOpreme INT NOT NULL,
  cijenaDodatneOpreme NUMERIC(10,2) NOT NULL,
  PRIMARY KEY (idOpreme, idTermina),
  FOREIGN KEY (idOpreme) REFERENCES OPREMA(idOpreme),
  FOREIGN KEY (idTermina) REFERENCES REZERVACIJA(idTermina)
);

--CONSTRAINTS

ALTER TABLE KORISNIK
	ADD CONSTRAINT nepostojeca_uloga CHECK(
		uloga IN ('KORISNIK', 'SKIPER', 'MEHANIČAR', 'KUHAR', 'ČISTAČ', 'VODITELJ', 'ADMINISTRATOR')
	);

ALTER TABLE USLUGA 
	ADD CONSTRAINT pozitivna_cijena_usluge CHECK(
		cijenaUsluge >= 0
	);

ALTER TABLE IMADODATNEUSLUGE
	ADD CONSTRAINT pozitivna_cijena_dodUsluge CHECK(
		cijenaDodatneUsluge >=0
	);

ALTER TABLE OPREMA
	ADD CONSTRAINT pozitivna_cijena_opreme CHECK(
		cijenaNajma >= 0
	);

ALTER TABLE IMADODATNUOPREMU
	ADD CONSTRAINT pozitivne_vrijednosti_opreme CHECK(
		kolicinaOpreme >= 0 AND
		cijenaDodatneOpreme >= 0);

ALTER TABLE PLOVILO  
	ADD CONSTRAINT pozitivne_vrijednosti CHECK(
		godinaProizvodnje > 0 AND
		kapacitet > 0 AND
		brojKabina >= 0 AND
		brojLezajeva >= 0 AND
		dnevnaCijenaNajma > 0
	);

ALTER TABLE LUKA
	ADD CONSTRAINT ispravna_geo_kordinate CHECK(
		latituda >= -90 AND latituda <= 90 AND
		longituda >= -180 AND longituda <= 180
	);

ALTER TABLE REZERVACIJA
	ADD CONSTRAINT pozitivan_broj_osoba CHECK(
		brojOsoba > 0
	);

ALTER TABLE TERMIN
	ADD CONSTRAINT nepostojec_status CHECK(
		status IN ('ZAHTJEV', 'POTVRDENA', 'OTKAZANA', 'ZAVRSENA', 'NEDOSTUPAN TERMIN')
	);

ALTER TABLE TERMIN
	ADD CONSTRAINT ispravan_termin CHECK(
		vrijemeDo > vrijemeOd
	);

ALTER TABLE TERMIN
	ADD CONSTRAINT slobodan_termin EXCLUDE USING gist (
		idplovila WITH =, 
		TSRANGE(vrijemeOd, vrijemeDo) WITH &&
	) WHERE (status <> 'OTKAZANA');

--FUNCTIONS AND TRIGGERS
--ova funkcija i trigger sprječavaju da se više korisnika veže na istu rezervaciju
CREATE FUNCTION trg_check_UserReservation() RETURNS trigger AS
$$
	DECLARE
		counter INT;
	BEGIN
		counter := (SELECT COUNT(*) FROM korisnik_rezervacija NATURAL JOIN KORISNIK
						WHERE uloga = 'KORISNIK' AND idTermina = NEW.idTermina);
		IF(TG_OP='UPDATE' AND counter>1) THEN
			RAISE EXCEPTION 'Error: nije dozvoljeno vezati više korisnika na istu rezervaciju.';
			RETURN NULL;
		ELSIF (TG_OP = 'INSERT' AND counter > 0) THEN
			RAISE EXCEPTION 'Error: nije dozvoljeno vezati više korisnika na istu rezervaciju.';
			RETURN NULL;
		ELSE
			RETURN NEW;
		END IF;
	END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER chk_korisnik_rezervacija
	BEFORE INSERT OR UPDATE ON korisnik_rezervacija 
	FOR EACH ROW
	EXECUTE FUNCTION trg_check_UserReservation();

	
--ova funkcija i trigger sprječavaju da u tablici rezervacija postoji rezervacija s statusom nedostupnog termina
CREATE FUNCTION trg_check_ReservationStatus() RETURNS trigger AS
$$
	DECLARE 
		status termin.status%TYPE;
	BEGIN
		status := (SELECT status FROM termin WHERE termin.idtermina = NEW.idtermina);
		IF(status = 'NEDOSTUPAN TERMIN') THEN
			RAISE EXCEPTION 'Error: rezervacija ne smije imati status "NEDOSTUPAN TERMIN"';
			RETURN NULL;
		ELSE
			RETURN NEW;
		END IF;
	END
$$ LANGUAGE plpgsql;

CREATE TRIGGER chk_status_rezervacije
	BEFORE INSERT OR UPDATE ON rezervacija
	FOR EACH ROW
	EXECUTE FUNCTION trg_check_ReservationStatus();

	
--ova funkcija i trigger sprječavaju da u tablici nedostupanTermin postoji termin koji nema status nedostupnog termina
CREATE FUNCTION trg_check_UnavailableTerminStatus() RETURNS trigger AS
$$
	DECLARE 
		status termin.status%TYPE;
	BEGIN
		status := (SELECT status FROM termin WHERE termin.idtermina = NEW.idtermina);
		IF(status <> 'NEDOSTUPAN TERMIN') THEN
			RAISE EXCEPTION 'Error: nedostupan termin smije imati samo status "NEDOSTUPAN TERMIN"';
			RETURN NULL;
		ELSE
			RETURN NEW;
		END IF;
	END
$$ LANGUAGE plpgsql;

CREATE TRIGGER chk_status_nedostupnog_termina
	BEFORE INSERT OR UPDATE ON nedostupnitermin
	FOR EACH ROW
	EXECUTE FUNCTION trg_check_UnavailableTerminStatus();

--ova funkcija i trigger sprječavaju da se u tablici termin status nekog termina promijeni u nedostupan termin ako se nalazi
-- u tablici rezervacija i obrnuto
CREATE FUNCTION trg_check_terminStatus() RETURNS trigger AS
$$
	BEGIN
		IF(NEW.status = 'NEDOSTUPAN TERMIN' AND 
			EXISTS(SELECT 1 FROM rezervacija WHERE idTermina = NEW.idTermina))
			THEN
				RAISE EXCEPTION 'Error: nije dozvoljeno promijeniti status postojeće rezervacije u "NEDOSTUPAN TERMIN"';
				RETURN NULL;
		ELSIF(NEW.status <> 'NEDOSTUPAN TERMIN' AND
			EXISTS(SELECT 1 FROM nedostupantermin WHERE idTermina = NEW.idTermina))
			THEN
				RAISE EXCEPTION 'Error: nije dozvoljeno promijeniti status postojećeg nedostupnog termina';
				RETURN NULL;
		ELSE
			RETURN NEW;
		END IF;
	END;
$$LANGUAGE plpgsql;

CREATE TRIGGER chk_status_termin
	BEFORE UPDATE OF status ON termin
	FOR EACH ROW
	EXECUTE FUNCTION trg_check_terminStatus();
