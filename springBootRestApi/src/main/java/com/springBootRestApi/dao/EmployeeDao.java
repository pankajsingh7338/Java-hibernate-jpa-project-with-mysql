package com.springBootRestApi.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.springBootRestApi.model.Employee;
import com.springBootRestApi.repository.EmployeeRepository;


@Service
public class EmployeeDao {

	@Autowired
	EmployeeRepository employeeRepository; 
	
	public Employee save(Employee emp) {
		return employeeRepository.save(emp); 
	}
	  
	public List<Employee> findAll() { 
		return employeeRepository.findAll(); 
	} 
	  
	public Employee getEmployeeById(Long empId) { 
		return employeeRepository.getOne(empId); 
	} 
	  
	/*public EmployeeDao() { 
		System.out.print("model class test"); 
	} */
  
} 
  
  