package rva.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.jpa.Igrac;

//<ime klase na koju se odnosi repozitorijum, tip podatka za kljuc>
public interface IgracRepository extends JpaRepository<Igrac, Integer> {

}
