package rva.ctrls;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = {"Hello Controller"})
public class HelloRestController {
	
	//ova anotacija mapira veb zahteve na odre�ene metode
	@RequestMapping("/")
	@ApiOperation(value = "Ispisuje poruku na ekranu")
	public String helloWorld() {
		return "Hello world!";
	}

}
