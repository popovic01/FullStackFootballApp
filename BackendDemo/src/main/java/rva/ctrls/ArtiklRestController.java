package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Artikl;
import rva.repositories.ArtiklRepository;

//repository komunicira sa bazom, a controller sa repository-jem
@RestController
public class ArtiklRestController {

	//sve sto ima anotaciju predstavlja bean
	//depency injection se vrsi na 3 nacina:
	//1. nacin: get, set metode
	//2. nacin: konstruktor
	//3. nacin: anotacija auto wired - to sad koristimo
	
	@Autowired //koristimo repository interfejs pomocu depency injection
	private ArtiklRepository artiklRepository;
	
	@GetMapping("artikl")
	//metoda koja vraca sve artikle 
	public Collection<Artikl> getArtikli() {
		return artiklRepository.findAll();
	}
}
