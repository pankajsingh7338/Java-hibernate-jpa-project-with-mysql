function EventQueuer(obj) {
	'use strict';
	var self = this;
	var queue = {};
	var afterEventLoadFunctions = [];
	function event(q) {
		var qu = {};
		var et = {
			"name" : "string",
			"callback" : "function"
		};
		for ( var n in et) {
			if (!(n in q && typeof q[n] == et[n])) {
				throw Error("EventQueuer : required data not founded");
			}
		}
		
		qu = q;

		this.getName = function() {
			return qu.name;
		}

		this.update = function(data) {
			if (qu.name && typeof data == et["callback"])
				qu.callback = data;
			else
				throw Error("EventQueuer : failed to update event data, something wroung in data");
		}

		this.run = function(arg) {
			if (typeof qu.callback == "function") {
				qu.callback(arg);
			} else
				throw Error("EventQueuer : failed to update event data, something wroung in data")
		}
	}

	function handleQueue() {
		var allEventCalled = true;
		for ( var q in queue) {
			if (!queue[q].called) {
				allEventCalled = false;
				break;
			}
		}
		if (allEventCalled) {
			console.log("EventQueuer : final call back of this Event Queuer");
			for ( var cb in afterEventLoadFunctions) {
				afterEventLoadFunctions[cb]();
			}

		}
	}

	this.setEvent = function(name, func) {
		if (name in queue)
			throw Error("EventQueuer : '" + name + "' event name is already present please rename");
		var ev = new event({
			"name" : name,
			"callback" : func
		});
		queue[ev.getName()] = {
			event : ev,
			called : false
		};
	}

	this.run = function(name, arg) {
		if (name) {
			var obj = queue[name];
			if (obj && obj.event) {
				obj.event.run(arg);
				obj.called = true;
				if (afterEventLoadFunctions.length)
					handleQueue();
			} else
				throw Error("EventQueuer : Failed to run event(not found) " + name);
		} else
			throw Error("EventQueuer : event name is required to run");
	}

	this.isAllrun = function() {
		for ( var name in queue) {
			if (!queue[name].called)
				return false;
		}
		return true;
	}

	this.afterAllEventLoad = function(func) {
		if (typeof func == "function")
			afterEventLoadFunctions.push(func);
		else
			throw Error("EventQueuer : only function is excepted");
	}

	this.deleteEveryThing = function() {
		queue = {};
		afterEventLoadFunctions = [];
	}

	this.cancleFinalCall = function() {
		afterEventLoadFunctions = [];
	}

	if (obj && obj.timeout) {
		setTimeout(function() {
			if (afterEventLoadFunctions.length)
				if (!self.isAllrun())
					obj.timeoutFunc();
		}, obj.timeout)
	}
}