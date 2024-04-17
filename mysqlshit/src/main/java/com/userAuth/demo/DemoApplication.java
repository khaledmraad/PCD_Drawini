package com.userAuth.demo;

import com.userAuth.demo.model.User;
import com.userAuth.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Autowired
	private UserRepository userRepository;

	@Bean
	public CommandLineRunner commandLineRunner() {
		return args -> {
			List<User> userOptional = userRepository.findUserByEmail("test@gmail.com");
			for (User u : userOptional){
				System.out.println(u);
			}
		};
	}
}
