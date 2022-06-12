/*truncate table nacionalnost;
truncate table liga;
truncate table tim;
truncate table igrac;*/
-- truncate komanda brise podatke unutar tabele, a ne samu tabelu

/*select * from igrac;
select * from nacionalnost;
select * from tim;
select * from liga;*/

/*testni podaci, bitno da je id -100*/
insert into "nacionalnost"
values (-100, 'Test', 'T');

insert into "liga"
values (-100, 'Test', 'T');

insert into "tim"
values (-100, 'Test', to_date('01.01.1999.', 'dd.mm.yyyy.'), 'Test, Test', -100);

insert into "igrac"
values (-100, 'Test', 'Testic', '000001', to_date('01.01.1999.', 'dd.mm.yyyy.'), -100, -100);

insert into "nacionalnost"
values (nextval('nacionalnost_seq'), 'Serbia', 'SER'),
	(nextval('nacionalnost_seq'), 'Spain', 'ESP'),
	(nextval('nacionalnost_seq'), 'Croatia', 'CRO'),
	(nextval('nacionalnost_seq'), 'Italy', 'ITA'),
	(nextval('nacionalnost_seq'), 'Hungary', 'HUN'),
	(nextval('nacionalnost_seq'), 'France', 'FRA'),
	(nextval('nacionalnost_seq'), 'Great Britain', 'GBR');

insert into "liga"
values (nextval('liga_seq'), 'Prva Liga Srbije', 'PLS'),
	(nextval('liga_seq'), 'Super Liga Srbije', 'SLS'),
	(nextval('liga_seq'), 'Premier League', 'PL'),
	(nextval('liga_seq'), 'Europa League', 'EL'),
	(nextval('liga_seq'), 'Champions League', 'CL'),
	(nextval('liga_seq'), 'Bundesliga', 'BL');

insert into "tim"
values (nextval('tim_seq'), 'Ajax', to_date('01.06.1955.', 'dd.mm.yyyy.'), 'Amsterdam, Netherland', 5),
	(nextval('tim_seq'), 'Liverpool', to_date('14.08.1934.', 'dd.mm.yyyy.'), 'Liverpool, England', 1),
	(nextval('tim_seq'), 'Barcelona', to_date('10.12.1963.', 'dd.mm.yyyy.'), 'Barcelona, Spain', 2),
	(nextval('tim_seq'), 'Juventus', to_date('03.09.1952.', 'dd.mm.yyyy.'), 'Torino, Italy', 4),
	(nextval('tim_seq'), 'Real Madrid', to_date('11.10.1902.', 'dd.mm.yyyy.'), 'Madrid, Spain', 3),
	(nextval('tim_seq'), 'Bayern', to_date('14.05.1900.', 'dd.mm.yyyy.'), 'Munich, Germany', 5);

insert into "igrac"
values (nextval('igrac_seq'), 'Dusan', 'Tadic', '604572', to_date('10.03.1989.', 'dd.mm.yyyy.'), 1, 3),
	(nextval('igrac_seq'), 'Sergej', 'Milinkovic-Savic', '558632', to_date('24.11.1994.', 'dd.mm.yyyy.'), 1, 3),
	(nextval('igrac_seq'), 'Cristiano', 'Ronaldo', '002536', to_date('13.04.1986.', 'dd.mm.yyyy.'), 3, 4),
	(nextval('igrac_seq'), 'David', 'Beckham', '00221', to_date('14.02.1982.', 'dd.mm.yyyy.'), 7, 1),
	(nextval('igrac_seq'), 'Kylian', 'Mbappe', '42421', to_date('04.05.1997.', 'dd.mm.yyyy.'), 6, 2),
	(nextval('igrac_seq'), 'Harry', 'Kane', '367734', to_date('25.08.1981.', 'dd.mm.yyyy.'), 3, 5),
	(nextval('igrac_seq'), 'Luis', 'Suarez', '690531', to_date('17.06.1986.', 'dd.mm.yyyy.'), 2, 5);