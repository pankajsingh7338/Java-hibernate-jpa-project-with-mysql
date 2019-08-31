package com.springBootRestApi.repository;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Component;

import com.springBootRestApi.model.Employee;

@Configuration
@Component
@EnableJpaRepositories(basePackages = "com.springBootRestApi.repository")
public interface EmployeeRepository extends JpaRepository<Employee, Long> { 
  	
  	
	
}   
   
 
   
  