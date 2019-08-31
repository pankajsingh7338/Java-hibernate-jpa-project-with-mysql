<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="formApp" ng-controller="formCtrl"> 
	<div id="preloader"> 
		<div class="loader"> 
			<svg class="circular" viewBox="25 25 50 50">
               <circle class="path" cx="50" cy="50" r="20" fill="none"
					stroke-width="3" stroke-miterlimit="10" />
            </svg> 
		</div> 
	</div> 
	<div id="main-wrapper"> 
		<div class="nav-header"> 
			<div class="brand-logo"> 
				<a href="${pageContext.request.contextPath}"> <b class="logo-abbr"><img 
						src="${pageContext.request.contextPath}/resources/images/swarYatraLogo.jpg"
						alt=""> </b> <span class="logo-compact"><img
						src="${pageContext.request.contextPath}/resources/images/swarYatraLogo.jpg"
						alt=""></span> <span class="brand-title"> <img
						src="${pageContext.request.contextPath}/resources/images/swarYatraLogo.jpg"
						alt="" style="width: 100%; margin-top: -17px;">
				</span>
				</a>
			</div>
		</div>
		<div class="nk-sidebar">
			<div class="nk-nav-scroll">
				<ul class="metismenu" id="menu">
					<li><a href="${pageContext.request.contextPath}"
						aria-expanded="false"> <i class="icon-speedometer menu-icon"></i><span
							class="nav-text">Dashboard</span>
					</a></li>
					<li><a href="#" aria-expanded="false"
						data-target="#exampleModalEmployee" data-toggle="modal">Employees</a>
					</li>
				</ul> 
			</div> 
		</div> 
		<div class="modal fade Mandatory" id="exampleModalCenter"
			ng-hide="isHideDept" tabindex="-1" role="dialog"
			aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalCenterTitle">Department
							Master</h5>
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body ">
						<form class="form-valide" name="myForm" method="post"
							ng-submit="createDepartment()" novalidate="novalidate">
							<div class="form-group row">
								<label class="col-lg-2 col-form-label">Department Name</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" ng-model="deptName"
										placeholder="Enter Dep Name">
								</div>
								<label class="col-lg-2 col-form-label">HOD</label>
								<div class="col-sm-4">
									<select class="form-control" id="sel1" ng-model="hod">
										<option ng-repeat="x in displayedCollection">{{x.name}}</option>
									</select>
								</div>
								<!-- <div class="global-relative pan-change col-sm-4"> 
								</div> -->
							</div>
							<div class="form-group row">
								<label class="col-lg-2 col-form-label">Type</label>
								<div class="col-sm-4">
									<select class="form-control" ng-model="type">
										<option ng-repeat="x in type">{{x.name}}</option>
									</select>
								</div>
								<label class="col-lg-2 col-form-label">MIS Cats</label>
								<div class="col-sm-4">
									<select class="form-control" ng-model="misCat">
										<option ng-repeat="x in misCat">{{x.name}}</option>
									</select>
								</div>
							</div>
							<div ng-show="isSuccess">
								<code class="alert alert-success ng-binding">{{responseMsg}}</code>
								<hr class="line-dashed line-full" />
							</div>
							<br> <br> <br>
							<div class="col-lg-12 text-center">
								<button type="submit" class="btn btn-primary valid-sub">Submit</button>
								<button type="submit" class="btn btn-primary valid-sub"
									data-dismiss="modal">Cancel</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade Mandatory" id="exampleModalEmployee"
			ng-hide="isHideEmp" tabindex="-1" role="dialog"
			aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered" role="document"
				ng-init="getEmployeeDetails()">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalCenterTitle">Employees
							Details</h5>
						<button type="button" class="close" data-dismiss="modal"
							aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body ">
						<form class="form-valide" name="myForm" method="post"
							ng-submit="createEmployee()" novalidate="novalidate">
							<div class="form-group row">
								<label class="col-lg-2 col-form-label">First Name</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" ng-model="firstName"
										placeholder="First Name">
								</div>
								<label class="col-lg-2 col-form-label">Last Name</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" ng-model="lastName"
										placeholder="Last Name">
								</div>
							</div>
							<div class="form-group row">
								<label class="col-lg-2 col-form-label">Phone Number</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" ng-model="mobile"
										placeholder="mobile number">
								</div>
								<label class="col-lg-2 col-form-label">Email</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" ng-model="email"
										placeholder="Enter Email">
								</div>
							</div>
							<div class="form-group row">
								<label class="col-lg-2 col-form-label">Department Name</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" ng-model="department"
										placeholder="Enter Department">
								</div>
							</div>
							<br>
							<div ng-show="isSuccess">
								<code class="alert alert-success ng-binding">{{responseMsg}}</code>
								<hr class="line-dashed line-full" />
							</div>
							<br> <br> <br>
							<div class="col-lg-12 text-center">
								<button type="submit" class="btn btn-primary valid-sub">Submit</button>
								<button type="submit" class="btn btn-primary valid-sub"
									data-dismiss="modal">Cancel</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<div class="content-body">
			<div class="row page-titles mx-0">
				<div class="col p-md-0">
					<ol class="breadcrumb">
						<li class="breadcrumb-item"><a href="javascript:void(0)">Dashboard</a></li>
						<li class="breadcrumb-item active"><a
							href="javascript:void(0)">Department Master</a></li>
					</ol>
				</div>
			</div>
			<!-- row -->
			<div class="container-fluid" ng-init="getDepartmentDetails()">
				<div class="row">
					<div class="col-12">
						<div class="card">
							<div class="card-body">
								<div class="row row-pad">
									<div class="col-12 col-sm-4 col-md-4 col-lg-4"></div>
									<div class="col-12 col-sm-4 col-md-4 col-lg-4">
										<h2>Department Master</h2>
									</div>
									<div class="col-12 col-sm-4 col-md-4 col-lg-4 text-right">
										<a href="#" class="btn mb-1 btn-outline-primary back ext"
											data-toggle="modal" data-target="#exampleModalCenter">Add
											New</a>
									</div>
								</div>
								<hr class="hor-line">
								<div class="table-responsive">
									<table class="table table-bordered tds-sum">
										<thead>
											<tr>
												<th class="text-center">Department Name</th>
												<th class="text-center">HOD</th>
												<th class="text-center" >Type</th>
												<th class="text-center" >MIS Cats</th>
												<th class="text-center" >Status</th>
											</tr>
										</thead>
										<tfoot>
											<tr ng-repeat="row in departCollection">
												<td class="text-center">{{row.deptName}}</td>
												<td class="text-center">{{row.hod}}</td>
												<td class="text-center">{{row.type}}</td>
												<td class="text-center">{{row.misCat}}</td>
												<td class="text-center">{{row.status}}</td>
											</tr>
										</tfoot>
									</table>
								</div> 
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

