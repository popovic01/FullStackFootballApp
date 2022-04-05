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
import rva.jpa.Liga;
import rva.repositories.LigaRepository;

@RestController
public class LigaRestController {
	
	@Autowired
	private LigaRepository ligaRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	//metoda koja vraca sve igrace
	@GetMapping("liga")
	public Collection<Liga> getLiga() {
		return ligaRepository.findAll();
	}
	
	@GetMapping("liga/{id}")
	public Liga getLiga(@PathVariable("id") Integer id) {
		return ligaRepository.getById(id);
	}
	
	@GetMapping("ligaNaziv/{naziv}")
	public Collection<Liga> getLigaByNaziv(@PathVariable("naziv") String naziv) {
		return ligaRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("liga")
	public ResponseEntity<Liga> insertLiga(@RequestBody Liga liga) {
		if (!ligaRepository.existsById(liga.getId())) {
			ligaRepository.save(liga);
			return new ResponseEntity<Liga>(HttpStatus.OK);
		}
		return new ResponseEntity<Liga>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("liga")
	public ResponseEntity<Liga> updateLiga(@RequestBody Liga liga) {
		if (ligaRepository.existsById(liga.getId())) {
			ligaRepository.save(liga);
			return new ResponseEntity<Liga>(HttpStatus.OK);
		}
		return new ResponseEntity<Liga>(HttpStatus.NO_CONTENT);
	}
	
	@DeleteMapping("liga/{id}")
	public ResponseEntity<Liga> deleteLiga(@PathVariable("id") Integer id) {
		if (ligaRepository.existsById(id)) {
			ligaRepository.deleteById(id);
			
			if (id == -100) {
				jdbcTemplate.execute("INSERT INTO LIGA (ID, NAZIV, OZNAKA)"
						+ " VALUES(-100, 'Test', 'T')");
			}
			return new ResponseEntity<Liga>(HttpStatus.OK);
		}
		return new ResponseEntity<Liga>(HttpStatus.CONFLICT);
	}

}
