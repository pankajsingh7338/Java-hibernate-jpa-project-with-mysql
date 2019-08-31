package com.springBootRestApi.controller;
import java.io.IOException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.springBootRestApi.dao.EmployeeDao; 
import com.springBootRestApi.model.Employee; 

@RestController 
public class EmployeeController { 
	
	@Autowired 
	EmployeeDao employeeDao; 
	
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView showIndexPage(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		ModelAndView mav = new ModelAndView("home"); 
		
		return mav;
	} 
	 
	
	@RequestMapping(value = "/employee", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	public Employee createEmployee(@Valid @RequestBody Employee emp) { 
		return employeeDao.save(emp); 
	} 
	  
	@RequestMapping(value = "/employees", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
	@ResponseBody 
	public List<Employee> getAllEmployee() {
		return employeeDao.findAll();
	} 
	  
	  
	@GetMapping("/notes/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable(value = "id") Long empId) {
		Employee emp = employeeDao.getEmployeeById(empId);
		if (emp == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(emp); 
	} 
  
}
