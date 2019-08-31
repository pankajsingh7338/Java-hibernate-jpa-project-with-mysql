package com.springBootRestApi.model;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank; 
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity 
@Table(name = "Employees")
@EntityListeners(AuditingEntityListener.class)
public class Department {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotBlank
	private String deptName;
	
	@NotBlank
	private String hod;
	
	@NotBlank
	private String type;
	
	@NotBlank
	private String misCat;
	
	@NotBlank
	private String status;
	
	
}
