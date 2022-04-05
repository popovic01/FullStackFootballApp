drop table if exists nacionalnost cascade;
drop table if exists liga cascade;
drop table if exists tim cascade;
drop table if exists igrac cascade;
/*cascade koristimo da bi se obrisali podaci koji se nalaze u drugim tabelama, 
zbog stranog kljuca*/

drop sequence if exists nacionalnost_seq cascade;
drop sequence if exists liga_seq cascade;
drop sequence if exists tim_seq cascade;
drop sequence if exists igrac_seq cascade;
-- DROP je naredba za brisanje
/*brisanje sekvenci ako postoje, da bismo bili sigurni da ID svaki put pocinje sa jedinicom*/

-- kreiranje tabela
create table liga (
id integer not null,
naziv varchar(100),
oznaka varchar(50)
);

create table nacionalnost (
id integer not null,
naziv varchar(100),
skracenica varchar(50)
);

create table tim (
id integer not null,
naziv varchar(100),
osnovan date,
sediste varchar(100),
liga integer not null
);

create table igrac(
id integer not null,
ime varchar(50),
prezime varchar(50),
broj_reg varchar(50),
datum_rodjenja date,
nacionalnost integer not null,
tim integer not null
);

-- alter je naredba za update
alter table nacionalnost add constraint pk_nacionalnost primary key(id);
alter table liga add constraint pk_liga primary key(id);
alter table igrac add constraint pk_igrac primary key(id);
alter table tim add constraint pk_tim primary key(id);
/*ogranicenja primarnog kljuca*/

alter table tim add constraint fk_tim_liga foreign key(liga) references liga(id);
alter table igrac add constraint fk_igrac_nacionalnost foreign key(nacionalnost) references nacionalnost(id);
alter table igrac add constraint fk_igrac_tim foreign key(tim) references tim(id);
/*ogranicenja stranog kljuca*/

create index idxpk_nacionalnost on nacionalnost(id);
create index idxpk_igrac on igrac(id);
create index idxpk_tim on tim(id);
create index idxpk_liga on liga(id);
/*indexi za primarne kljuceve - kreiramo indekse zbog brze pretrage*/

create index idxfk_tim_liga on tim(liga);
create index idxfk_igrac_nacionalnost on igrac(nacionalnost);
create index idxfk_igrac_tim on igrac(tim);
/*indexi za strane kljuceve*/

create sequence if not exists nacionalnost_seq increment 1 start with 1;
create sequence if not exists liga_seq increment 1 start with 1;
create sequence if not exists igrac_seq increment 1 start with 1;
create sequence if not exists tim_seq increment 1 start with 1;
-- kreiranje sekvenci za svaku tabelu, koje ce se koristiti za automatsko povecavanje id-ja svake tabele

-- da vise ne moramo da prosledjujemo id vrednost pri insertu, jer postavljamo default-nu vrednost
alter table nacionalnost alter column id
set default nextval('nacionalnost_seq');

alter table igrac alter column id
set default nextval('igrac_seq');

alter table tim alter column id
set default nextval('tim_seq');

alter table liga alter column id
set default nextval('liga_seq');