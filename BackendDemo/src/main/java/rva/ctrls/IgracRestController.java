package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	//da bismo mogli da izvrsimo sql upit nad bazom podataka
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	//metoda koja vraca sve igrace
	@GetMapping("igrac")
	public Collection<Igrac> getIgrac() {
		return igracRepository.findAll();
	}
	
	//metoda koja vraca jednog igraca po id-ju
	//naziv od path variable mora da bude isti kao i uri parametar
	//ono sto prosledimo kao kao uri parametar, mapira se na parametar metode - integer id
	@GetMapping("igrac/{id}")
	public Igrac getIgrac(@PathVariable("id") Integer id) {
		return igracRepository.getById(id);
	}
	
	//getovanje igraca na osnovu imena
	@GetMapping("igracIme/{ime}")
	public Collection<Igrac> getIgracByIme(@PathVariable("ime") String ime) {
		return igracRepository.findByImeContainingIgnoreCase(ime);
	}
	
	//dodavanje igraca
	//iz zahteva preuzimamo vrednost igraca koji zelimo da insertujemo - @RequestBody
	@PostMapping("igrac")
	public ResponseEntity<Igrac> insertIgrac(@RequestBody Igrac igrac) {
		//provera da li ima postojeceg igraca u bazi
		if (!igracRepository.existsById(igrac.getId())) {
			//dodajemo igraca u bazu ako ne postoji
			igracRepository.save(igrac);
			return new ResponseEntity<Igrac>(HttpStatus.OK);
		}
		//ako igrac vec postoji u bazi
		return new ResponseEntity<Igrac>(HttpStatus.CONFLICT);
	}
	
	//update igraca
	//iz zahteva preuzimamo vrednost igraca koji zelimo da updateujemo - @RequestBody
	@PutMapping("igrac")
	public ResponseEntity<Igrac> updateIgrac(@RequestBody Igrac igrac) {
		//provera da li ima postojeceg igraca u bazi - jedino tad moze update
		//id je -100 jer uvek hocemo testni podatak da modifikujemo
		if (igracRepository.existsById(igrac.getId())) {
			//metoda save u ovom slucaju update-uje igraca
			igracRepository.save(igrac);
			return new ResponseEntity<Igrac>(HttpStatus.OK);
		}
		//ako igrac ne postoji u bazi - kod 204
		return new ResponseEntity<Igrac>(HttpStatus.NO_CONTENT);
	}
	
	//brisanje igraca po id-iju
	@DeleteMapping("igrac/{id}")
	public ResponseEntity<Igrac> deleteIgrac(@PathVariable("id") Integer id) {
		//provera da li ima postojeceg igraca u bazi - jedino tad moze brisanje
		if (igracRepository.existsById(id)) {
			igracRepository.deleteById(id);
			
			//ako obrisemo testni podatak, zelimo da se on ponovo doda u bazu
			if (id == -100) {
				jdbcTemplate.execute("INSERT INTO IGRAC (ID, IME, PREZIME, BROJ_REG, DATUM_RODJENJA, NACIONALNOST, TIM)"
						+ " VALUES(-100, 'Test', 'Test', '123456', to_date('10.10.1990.', 'dd.mm.yyyy.'), 1, 1)");
			}
			return new ResponseEntity<Igrac>(HttpStatus.OK);
		}
		return new ResponseEntity<Igrac>(HttpStatus.NO_CONTENT);
	}
	
}
