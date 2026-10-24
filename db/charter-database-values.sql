INSERT INTO LUKA(nazivluke, mjesto, latituda, longituda) VALUES('ACI marina Split', 'Split', 43.502501, 16.431667);
INSERT INTO LUKA(nazivluke, mjesto, latituda, longituda) VALUES('Marina Zadar', 'Zadar', 44.119271, 15.228667);
INSERT INTO LUKA(nazivluke, mjesto, latituda, longituda) VALUES('ACI marina Pula', 'Pula', 44.873358, 13.845584);
INSERT INTO LUKA(nazivluke, mjesto, latituda, longituda) VALUES('D-Marin Mandalina', 'Šibenik', 43.719829, 15.901428);
INSERT INTO LUKA(nazivluke, mjesto, latituda, longituda) VALUES('ACI marina Trogir', 'Trogir', 43.513547, 16.249246);
INSERT INTO LUKA(nazivluke, mjesto, latituda, longituda) VALUES('ACI marina Rovinj', 'Rovinj', 45.075640, 13.637026);
INSERT INTO LUKA(nazivluke, mjesto, latituda, longituda) VALUES('Marina Kornati', 'Biograd na Moru', 43.940968, 15.442710);

INSERT INTO TIPPLOVILA(nazivTipaPlovila) VALUES('Jedrilica');
INSERT INTO TIPPLOVILA(nazivTipaPlovila) VALUES('Motorna jahta');
INSERT INTO TIPPLOVILA(nazivTipaPlovila) VALUES('Katamaran');
INSERT INTO TIPPLOVILA(nazivTipaPlovila) VALUES('Gliser');
INSERT INTO TIPPLOVILA(nazivTipaPlovila) VALUES('Gulet');

INSERT INTO PROIZVODAC (nazivproizvodaca)
VALUES
    ('Beneteau'),
    ('Jeanneau'),
    ('Bavaria Yachts'),
    ('Lagoon'),
    ('Sea Ray'),
    ('Bali Catamarans'),
    ('Dufour Yachts'),
    ('Axopar');

INSERT INTO OPREMA (nazivopreme, cijenanajma)
VALUES
    ('SUP daska', 25.00),
    ('Oprema za ronjenje', 15.00),
    ('Pomoćni čamac', 50.00),
    ('Vanjski motor za pomoćni čamac', 20.00),
    ('Roštilj', 30.00),
    ('Wi-Fi router', 10.00),
    ('Skije za vodu', 40.00),
    ('Wakeboard', 35.00),
    ('Vodootporna torba', 5.00),
    ('Ribolovna oprema', 20.00);

INSERT INTO USLUGA (nazivusluge, cijenausluge)
VALUES
    ('Najam skipera', 200.00),
    ('Završno čišćenje', 100.00),
    ('Catering na plovilu', 150.00),
    ('Transfer do marine', 50.00),
    ('Instruktor jedrenja', 180.00);

INSERT INTO PLOVILO
    (nazivplovila, godinaproizvodnje, kapacitet, brojkabina,
     brojlezajeva, model, dnevnaCijenaNajma,
     idluke, idtipaplovila, idproizvodaca)
VALUES
    ('Morska Vila', 2022, 8, 3, 6, 'Oceanis 40.1', 1200.00, 1, 2, 1),
    ('Jadranski San', 2021, 10, 4, 8, 'Sun Odyssey 440', 3800.00, 2, 2, 2),
    ('Blue Horizon', 2023, 5, 2, 3, 'Bavaria C42', 350.00, 3, 1, 3),
    ('Adriatic Pearl', 2022, 12, 4, 10, 'Lagoon 42', 5500.00, 4, 3, 4),
    ('Sea Breeze', 2020, 6, 2, 4, 'Sea Ray Sundancer 320', 2500.00, 5, 2, 5),
    ('Dalmatian Dream', 2024, 10, 5, 10, 'Bali 4.2', 600.00, 6, 3, 6),
    ('Sunset', 2019, 8, 3, 6, 'Dufour 390', 2900.00, 7, 1, 7),
    ('Fast Wave', 2023, 6, 0, 0, 'Axopar 28', 280.00, 1, 4, 8),
    ('Golden Wind', 2021, 8, 3, 6, 'Oceanis 38.1', 300.00, 2, 1, 1),
    ('Blue Lagoon', 2024, 9, 4, 9, 'Lagoon 40', 3000.00, 4, 5, 4);

INSERT INTO IMAOPREMU(idPlovila, idOpreme)
VALUES
	(19, 2), (19, 3), (19, 4), (19, 9),
	(20, 5), (20, 6),
	(21, 1),
	(22, 2), (22, 5), (22, 10),
	(23, 3), (23, 4), (23, 5), (23, 7), (23, 8),
	(24, 1), (24, 9),
	(26, 9),
	(28, 10);