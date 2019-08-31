package com.springBootRestApi; 
 
import org.springframework.boot.SpringApplication; 
import org.springframework.boot.autoconfigure.EnableAutoConfiguration; 
import org.springframework.context.annotation.ComponentScan; 
import org.springframework.context.annotation.Configuration; 
import org.springframework.data.jpa.repository.config.EnableJpaRepositories; 

@EnableJpaRepositories 
@Configuration 
@EnableAutoConfiguration 
@ComponentScan(basePackages = "com.springBootRestApi.*") 
public class EmployeeApplication { 
	
	public static void main(String[] args) { 
		
		SpringApplication app = new SpringApplication(EmployeeApplication.class);  
		app.run(args);  
	}  
} 
  

