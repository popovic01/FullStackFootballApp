package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Tim;
import rva.repositories.TimRepository;

//da bi sa frontenda mogli da "gadjamo" endpointe koje smo definisali
@CrossOrigin
@RestController
@Api(tags = {"Tim CRUD operacije"})
public class TimRestController {
	
	@Autowired
	private TimRepository timRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("tim")
	@ApiOperation(value = "Vraća kolekciju svih timova iz baze podataka")
	public Collection<Tim> getTim() {
		return timRepository.findAll();
	}
	
	@GetMapping("tim/{id}")
	@ApiOperation(value = "Vraća tim iz baze podataka po prosleđenom id-ju")
	public Tim getTim(@PathVariable("id") Integer id) {
		return timRepository.getById(id);
	}
	
	@GetMapping("timNaziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju timova iz baze podataka po prosleđenom nazivu")
	public Collection<Tim> getTimByNaziv(@PathVariable("naziv") String naziv) {
		return timRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("tim")
	@ApiOperation(value = "Dodaje tim u bazu podataka")
	public ResponseEntity<Tim> insertTim(@RequestBody Tim tim) {
		if (!timRepository.existsById(tim.getId())) {
			timRepository.save(tim);
			return new ResponseEntity<Tim>(HttpStatus.OK);
		}
		return new ResponseEntity<Tim>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("tim")
	@ApiOperation(value = "Modifikuje postojeći tim iz baze podataka")
	public ResponseEntity<Tim> updateTim(@RequestBody Tim tim) {
		if (timRepository.existsById(tim.getId())) {
			timRepository.save(tim);
			return new ResponseEntity<Tim>(HttpStatus.OK);
		}
		return new ResponseEntity<Tim>(HttpStatus.NO_CONTENT);
	}
	
	@DeleteMapping("tim/{id}")
	@ApiOperation(value = "Briše tim iz baze podataka po prosleđenom id-ju")
	public ResponseEntity<Tim> deleteTim(@PathVariable("id") Integer id) {
		if (timRepository.existsById(id)) {
			timRepository.deleteById(id);
			
			if (id == -100) {
				jdbcTemplate.execute("INSERT INTO TIM (ID, NAZIV, OSNOVAN, SEDISTE, LIGA)"
						+ " VALUES(-100, 'Test', to_date('01.01.1999.', 'dd.mm.yyyy.'), 'Test', 1)");
			}
			return new ResponseEntity<Tim>(HttpStatus.OK);
		}
		return new ResponseEntity<Tim>(HttpStatus.NO_CONTENT);
	}

}
