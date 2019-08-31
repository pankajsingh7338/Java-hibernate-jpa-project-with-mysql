function formCtrl($scope, $http, $location, $window, $timeout, $interval,
		$rootScope) {

	$scope.rowCollection = [];

	$scope.misCat = [ {
		name : 'Engineering',
		value : 'Engineering'
	}, {
		name : 'Office Management',
		value : 'Office Management'
	}, {
		name : 'Office Management',
		value : 'Operations'
	}, {
		name : 'Supporting',
		value : 'Supporting'
	} ];

	$scope.type = [ {
		name : 'Billable',
		value : 'Billable'
	}, {
		name : 'Non-Billable',
		value : 'Non-Billable'
	} ];

	$scope.createEmployee = function() {
		data = {
			firstName : $scope.firstName,
			lastName : $scope.lastName,
			mobile : $scope.mobile,
			email : $scope.email,
			department : $scope.department,

		}
		var responsePromise = $http.post(contextPath
				+ '/ajx/employee/detail/save', data);
		responsePromise.success(function(data) {
			if (data.status == 'SUCCESS') {
				$scope.loading = false;
				$scope.isSuccess = true;
				$scope.responseMsg = data.successMsg; 
				$scope.firstName = "";
				$scope.lastName = "";
				$scope.mobile = "";
				$scope.email = "";
				$scope.department = "";
				$scope.isHideEmp = true;
				$timeout(function() {
					$scope.isSuccess = false;
				}, 500);
			} else {
				$scope.errorMsg = data.errorDetails;
				$scope.loading = false;
			}
		})

	}

	$scope.displayedCollection = [];
	$scope.getEmployeeDetails = function() {
		$scope.loading = true;
		var responsePromise = $http.get(contextPath + '/employee/detail/info');
		responsePromise.success(function(data) {
			if (data.status == 'SUCCESS') {
				$scope.rowCollection = data.response;
				if ($scope.rowCollection.length != 0) {
					for (var i = 0; i < $scope.rowCollection.length; i++) {
						var empData = {
							name : $scope.rowCollection[i].firstName,

						}
						$scope.displayedCollection.push(empData);
					}
				}
			} else if (data.status == 'FAILED') {
				$scope.responseError = data.errorDetails;
			}
		})
	}

	$scope.createDepartment = function() {
		data = {
			deptName : $scope.deptName,
			hod : $scope.hod,
			type : $scope.type,
			misCat : $scope.misCat
		}
		var responsePromise = $http.post(contextPath
				+ '/ajx/create/department/detail', data);
		responsePromise.success(function(data) {
			if (data.status == 'SUCCESS') {
				$scope.loading = false;
				$scope.isSuccess = true;
				$scope.responseMsg = data.successMsg;
				$scope.deptName = "";
				$scope.hod = "";
				$scope.type = "";
				$scope.misCat = "";
				$timeout(function() {
					$scope.isSuccess = false;
				}, 500);
				$scope.isHideDept = true;
			} else {
				$scope.errorMsg = data.errorDetails;
				$scope.loading = false;
			}
		})

	}

	$scope.departCollection = [];
	$scope.getDepartmentDetails = function() {
		$scope.loading = true;
		var responsePromise = $http.get(contextPath
				+ '/get/department/detail/info');
		responsePromise.success(function(data) {
			if (data.status == 'SUCCESS') {
				$scope.rowCollection = data.response;
				if ($scope.rowCollection.length != 0) {
					for (var i = 0; i < $scope.rowCollection.length; i++) {
						$scope.departCollection.push($scope.rowCollection[i]);
					}
				}
			} else if (data.status == 'FAILED') {
				$scope.responseError = data.errorDetails;
			}
		})
	}

}