package rva.repositories;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Igrac;
import rva.jpa.Tim;

//<ime klase na koju se odnosi repozitorijum, tip podatka za kljuc>
public interface IgracRepository extends JpaRepository<Igrac, Integer> {
	
	//sve metode su apstraktne i javne u interfejsu
	//paziti na naziv metode
	Collection<Igrac> findByTim(Tim tim);

}
