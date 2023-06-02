package com.earthwatch.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.function.Function;

@SpringBootApplication
public class CdkSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CdkSpringApplication.class, args);
	}

	@Bean
	public Function<String, String> reverseString() {
		return new MyHandler();
	}

}
