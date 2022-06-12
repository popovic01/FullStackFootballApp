package rva;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//ova anotacija se uvek postavlja za klasu koja je zaduzena za pokretanje projekta
@SpringBootApplication
public class BackendDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendDemoApplication.class, args);
	}

}
