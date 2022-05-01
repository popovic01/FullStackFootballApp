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
import rva.jpa.Nacionalnost;
import rva.repositories.NacionalnostRepository;

@RestController
@Api(tags = {"Nacionalnost CRUD operacije"})
public class NacionalnostRestController {
	
	@Autowired 
	NacionalnostRepository nacionalnostRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("nacionalnost")
	@ApiOperation(value = "Vraća kolekciju svih nacionalnosti iz baze podataka")
	public Collection<Nacionalnost> getNacionalnost() {
		return nacionalnostRepository.findAll();
	}
	
	@GetMapping("nacionalnost/{id}")
	@ApiOperation(value = "Vraća nacionalnost iz baze podataka po prosleđenom id-ju")
	public Nacionalnost getNacionalnost(@PathVariable("id") Integer id) {
		return nacionalnostRepository.getById(id);
	}
	
	@GetMapping("nacionalnostNaziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju nacionalnosti iz baze podataka po prosleđenom nazivu")
	public Collection<Nacionalnost> getNacionalnostByNaziv(@PathVariable("naziv") String naziv) {
		return nacionalnostRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("nacionalnost")
	@ApiOperation(value = "Dodaje nacionalnost u bazu podataka")
	public ResponseEntity<Nacionalnost> insertNacionalnost(@RequestBody Nacionalnost nacionalnost) {
		if (!nacionalnostRepository.existsById(nacionalnost.getId())) {
			nacionalnostRepository.save(nacionalnost);
			return new ResponseEntity<Nacionalnost>(HttpStatus.OK);
		}
		return new ResponseEntity<Nacionalnost>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("nacionalnost")
	@ApiOperation(value = "Modifikuje postojeću nacionalnost iz baze podataka")
	public ResponseEntity<Nacionalnost> updateNacionalnost(@RequestBody Nacionalnost nacionalnost) {
		if (nacionalnostRepository.existsById(nacionalnost.getId())) {
			nacionalnostRepository.save(nacionalnost);
			return new ResponseEntity<Nacionalnost>(HttpStatus.OK);
		}
		return new ResponseEntity<Nacionalnost>(HttpStatus.NO_CONTENT);
	}
	
	@DeleteMapping("nacionalnost/{id}")
	@ApiOperation(value = "Briše nacionalnost iz baze podataka po prosleđenom id-ju")
	public ResponseEntity<Nacionalnost> deleteNacionalnost(@PathVariable("id") Integer id) {
		if (nacionalnostRepository.existsById(id)) {
			nacionalnostRepository.deleteById(id);
			
			if (id == -100) {
				jdbcTemplate.execute("INSERT INTO NACIONALNOST (ID, NAZIV, SKRACENICA)"
						+ " VALUES(-100, 'Test', 'T')");
			}
			return new ResponseEntity<Nacionalnost>(HttpStatus.OK);
		}
		return new ResponseEntity<Nacionalnost>(HttpStatus.NO_CONTENT);
	}

}
