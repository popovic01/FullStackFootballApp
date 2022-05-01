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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Igrac;
import rva.jpa.Liga;
import rva.repositories.LigaRepository;

@RestController
@Api(tags = {"Liga CRUD operacije"})
public class LigaRestController {
	
	@Autowired
	private LigaRepository ligaRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	//metoda koja vraca sve igrace
	@GetMapping("liga")
	@ApiOperation(value = "Vraća kolekciju svih liga iz baze podataka")
	public Collection<Liga> getLiga() {
		return ligaRepository.findAll();
	}
	
	@GetMapping("liga/{id}")
	@ApiOperation(value = "Vraća ligu iz baze podataka po prosleđenom id-ju")
	public Liga getLiga(@PathVariable("id") Integer id) {
		return ligaRepository.getById(id);
	}
	
	@GetMapping("ligaNaziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju liga iz baze podataka po prosleđenom nazivu")
	public Collection<Liga> getLigaByNaziv(@PathVariable("naziv") String naziv) {
		return ligaRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("liga")
	@ApiOperation(value = "Dodaje ligu u bazu podataka")
	public ResponseEntity<Liga> insertLiga(@RequestBody Liga liga) {
		if (!ligaRepository.existsById(liga.getId())) {
			ligaRepository.save(liga);
			return new ResponseEntity<Liga>(HttpStatus.OK);
		}
		return new ResponseEntity<Liga>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("liga")
	@ApiOperation(value = "Modifikuje postojeću ligu iz baze podataka")
	public ResponseEntity<Liga> updateLiga(@RequestBody Liga liga) {
		if (ligaRepository.existsById(liga.getId())) {
			ligaRepository.save(liga);
			return new ResponseEntity<Liga>(HttpStatus.OK);
		}
		return new ResponseEntity<Liga>(HttpStatus.NO_CONTENT);
	}
	
	@DeleteMapping("liga/{id}")
	@ApiOperation(value = "Briše ligu iz baze podataka po prosleđenom id-ju")
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
