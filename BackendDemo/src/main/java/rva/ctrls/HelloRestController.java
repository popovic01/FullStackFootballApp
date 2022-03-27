package rva.ctrls;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloRestController {
	
	//ova anotacija mapira veb zahteve na odreðene metode
	@RequestMapping("/")
	public String helloWorld() {
		return "Hello world!";
	}

}
