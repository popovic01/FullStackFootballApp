package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import rva.jpa.Igrac;
import rva.repositories.IgracRepository;

//repository komunicira sa bazom, a controller sa repository-jem
//ova anotacija koristi se samo na nivou klase i koristi se za definisanje RESTful veb servisa
@RestController
public class IgracRestController {
	
	//depency injection se vrsi na 3 nacina:
	//1. nacin: get, set metode
	//2. nacin: konstruktor
	//3. nacin: anotacija auto wired - to sad koristimo
	
	@Autowired //korisitmo repository interfejs pomocu dependency injection jer ne mozemo da instanciramo interfejs
	private IgracRepository igracRepository;
	
	//metoda koja vraca sve igrace
	@GetMapping("igrac")
	public Collection<Igrac> getIgraci() {
		return igracRepository.findAll();
	}
	
}
