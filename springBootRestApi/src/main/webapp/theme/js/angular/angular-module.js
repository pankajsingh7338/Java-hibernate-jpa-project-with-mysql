function AngularModule() {
	var self = this;
	var moduleName;
	var module = void 0;

	function args(b) {
		var i = b.indexOf("(");
		var j = b.indexOf(")");
		var arg = b.substring(i + 1, j);
		if (arg != void 0 && arg != "" && arg != null) {
			arg = arg.split(",");
			arg.forEach(function(v, k) {
				arg[k] = v.trim();
			})
			return arg;
		} else {
			return [];
		}
	}

	function serviceManager() {
		var allService = [];
		function service(func) {
			if (typeof func != "function")
				throw Error("Service is only accepted of type function");
			var sv = {
				args : args(func.toString()),

				angularService : void 0

			}
		}
	}

	this.setNewModule = function(name, include) {
		module = angular.module(moduleName = name, include);
		return self;
	}

	this.setFilter = function(name, func) {
		var defaultServices = args(func.toString());
		defaultServices.push(func);
		module.filter(name, defaultServices);
		return self;
	}

	this.setFactory = function(name, func) {
		var defaultServices = args(func.toString());
		defaultServices.push(func);
		module.factory(name, defaultServices);
		return self;
	}
	this.setService = function(name, func) {
		var defaultServices = args(func.toString());
		defaultServices.push(func);
		module.service(name, func);
		return self;
	}

	this.setController = function(name, func) {
		var defaultServices = args(func.toString());
		defaultServices.push(func);
		module.controller(name, defaultServices);
		return self;
	}

	this.bootstrap = function(id) {
		angular.bootstrap(document.getElementById(id), [ moduleName ]);
	}

	return self;

}