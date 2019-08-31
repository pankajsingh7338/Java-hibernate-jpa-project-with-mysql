(function() {
	  angular.module("dateRangePicker", ['pasvaz.bindonce']);

	  angular.module("dateRangePicker").directive("dateRangePicker", [
	    "$compile", "$timeout", function($compile, $timeout) {
	      var CUSTOM, pickerTemplate;
	      pickerTemplate = "<div ng-show=\"visible\" class=\"angular-date-range-picker__picker\" ng-click=\"handlePickerClick($event)\" ng-class=\"{'angular-date-range-picker--ranged': showRanged }\">\n <div class=\"calendar_top\"> <div class=\"angular-date-range-picker__timesheet\">\n  <div bindonce ng-repeat=\"month in months\" class=\"angular-date-range-picker__month\">  <a ng-click=\"move(-1, $event)\" class=\"angular-date-range-picker__prev-month\">&#9664;</a>\n    <div>\n      <div class=\"angular-date-range-picker__month-name\" bo-text=\"month.name\"></div>\n      <table class=\"angular-date-range-picker__calendar\">\n        <tr>\n          <th bindonce ng-repeat=\"day in month.weeks[1]\" class=\"angular-date-range-picker__calendar-weekday\" bo-text=\"day.date.format('dd')\">\n          </th>\n        </tr>\n        <tr bindonce ng-repeat=\"week in month.weeks\">\n          <td\n    ng-repeat=\"day in week track by $index\" ng-click=\"select(day, $event)\">\n   <div  bo-class='{\n                \"angular-date-range-picker__calendar-day\": day,\n                \"angular-date-range-picker__calendar-day-selected\": day.selected,\n                \"angular-date-range-picker__calendar-day-disabled\": day.disabled,\n                \"angular-date-range-picker__calendar-day-start\": day.start\n              }' \n >      <div class=\"angular-date-range-picker__calendar-day-wrapper\" bo-text=\"day.date.date()\"></div>\n     </div>\n     </td>\n        </tr>\n      </table>\n    </div>\n    <a ng-click=\"move(+1, $event)\" class=\"angular-date-range-picker__next-month\" ng-class=\"{'angular-date-range-picker_next-month_disabled' : !nextMonthAvailable}\">&#9654;</a>\n  </div>\n </div>\n  <div class=\"angular-date-range-picker__panel\">\n    <div ng-show=\"showRanged\"> <ul ng-model=\"quick\"><li ng-repeat=\"e in quickList\"><a ng-class=\"{'active' : e.active}\" ng-click=\"prevent_select($event);changeQuick(e)\">{{e.label}}</a></li></ul>\n </div>\n </div>\n </div>\n <div class=\"calendar_bottom\"><div class=\"manual_date\"><div class=\"manual_date_start\"><span>Start : {{start_date}}</span>\n</div>\n<div class=\"manual_date_end\"><span>End : {{end_date}}</span>\n</div>\n</div>\n   <div class=\"angular-date-range-picker__buttons\">\n      <a ng-click=\"ok($event)\" class=\"angular-date-range-picker__apply\">Apply</a>\n      <a ng-click=\"hide($event)\" class=\"angular-date-range-picker__cancel\">cancel</a>\n    </div>\n  </div>\n </div>";
	      CUSTOM = "CUSTOM";
	      return {
	        restrict: "AE",
	        replace: true,
	        template: "<span tabindex=\"0\" ng-keydown=\"hide()\" class=\"angular-date-range-picker__input\">\n  <span ng-if=\"showRanged\">\n    <span ng-show=\"!!model\">{{ model.start.format(\"ll\") }} - {{ model.end.format(\"ll\") }}</span>\n    <span ng-hide=\"!!model\">Select date range</span>\n  </span>\n  <span ng-if=\"!showRanged\">\n    <span ng-show=\"!!model\">{{ model.format(\"ll\") }}</span>\n    <span ng-hide=\"!!model\">Select date</span>\n  </span>\n</span>",
	        scope: {
	          model: "=ngModel",
	          customSelectOptions: "=",
	          ranged: "=",
	          pastDates: "@",
	          callback: "&"
	        },
	        link: function($scope, element, attrs) {
	          var documentClickFn, domEl, _calculateRange, _checkQuickList, _makeQuickList, _prepare;
	          $scope.quickListDefinitions = $scope.customSelectOptions;
	          if ($scope.quickListDefinitions == null) {
	            $scope.quickListDefinitions = [
	              {
	                label: "This week",
	                range: moment().range(moment().startOf("week").startOf("day"), moment().endOf("week").startOf("day")),
	                active : true
	              }, {
	                label: "Next week",
	                range: moment().range(moment().startOf("week").add(1, "week").startOf("day"), moment().add(1, "week").endOf("week").startOf("day")),
	                active : false
	              }, {
	                label: "This fortnight",
	                range: moment().range(moment().startOf("week").startOf("day"), moment().add(1, "week").endOf("week").startOf("day")),
	                active : false
	              }, {
	                label: "This month",
	                range: moment().range(moment().startOf("month").startOf("day"), moment().endOf("month").startOf("day")),
	                active : false
	              }, {
	                label: "Next month",
	                range: moment().range(moment().startOf("month").add(1, "month").startOf("day"), moment().add(1, "month").endOf("month").startOf("day")),
	                active : false
	              }
	            ];
	          }
	          $scope.quick = null;
	          $scope.range = null;
	          $scope.selecting = false;
	          $scope.visible = false;
	          $scope.start = null;
	          $scope.showRanged = $scope.ranged === void 0 ? true : $scope.ranged;
	          _makeQuickList = function(includeCustom) {
	            var e, _i, _len, _ref, _results;
	            if (includeCustom == null) {
	              includeCustom = false;
	            }
	            if (!$scope.showRanged) {
	              return;
	            }
	            $scope.quickList = [];
	            _ref = $scope.quickListDefinitions;
	            _results = [];
	            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	              e = _ref[_i];
	              _results.push($scope.quickList.push(e));
	            }
	            return _results;
	          };
	          _calculateRange = function() {
	            var end, start;
	            if ($scope.showRanged) {
	            	var bool = $scope.lastMonth && $scope.lastMonth.isSame($scope.selection.end, 'month');
	            	if(bool){
	            		return $scope.range = $scope.selection ? (start = $scope.selection.start.clone().subtract(1, "month").startOf("month").startOf("day"), end = start.clone().add(1, "months").endOf("month").startOf("day"), moment().range(start, end)) : moment().range(moment().startOf("month").subtract(0, "month").startOf("day"), moment().endOf("month").add(1, "month").startOf("day"));
	            	}
	            	else{
	            		return $scope.range = $scope.selection ? (start = $scope.selection.start.clone().startOf("month").startOf("day"), end = start.clone().add(1, "months").endOf("month").startOf("day"), moment().range(start, end)) : moment().range(moment().startOf("month").subtract(0, "month").startOf("day"), moment().endOf("month").add(1, "month").startOf("day"));
	            	}
	            	} else {
	              $scope.selection = false;
	              $scope.selection = $scope.model || false;
	              $scope.date = moment($scope.model) || moment();
	              return $scope.range = moment().range(moment($scope.date).startOf("month"), moment($scope.date).endOf("month"));
	            }
	          };
	          _checkQuickList = function() {
	            var e, _i, _len, _ref;
	            if (!$scope.showRanged) {
	              return;
	            }
	            if (!$scope.selection) {
	              return;
	            }
	            _ref = $scope.quickList;
	            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	              e = _ref[_i];
	              if (e.range !== CUSTOM && $scope.selection.start.startOf("day").unix() === e.range.start.startOf("day").unix() && $scope.selection.end.startOf("day").unix() === e.range.end.startOf("day").unix()) {
	                $scope.quick = e.range;
	                _makeQuickList();
	                return;
	              }
	            }
	            $scope.quick = CUSTOM;
	            return _makeQuickList(true);
	          };
	          _prepare = function() {
	            var m, startDay, startIndex, _i, _len, _ref;
	            $scope.months = [];
	            startIndex = $scope.range.start.year() * 12 + $scope.range.start.month();
	            startDay = moment().startOf("week").day();
	            today = $scope.quickList[0].range.start._d;
	            $scope.range.by("days", function(date) {
	              var d, dis, m, sel, w, _base, _base1;
	              d = date.day() - startDay;
	              if (d < 0) {
	                d = 7 + d;
	              }
	              m = date.year() * 12 + date.month() - startIndex;
	              w = parseInt((7 + date.date() - d) / 7);
	              sel = false;
	              dis = false;
	              if ($scope.showRanged) {
	                if ($scope.start) {
	                  sel = date === $scope.start;
	                  dis = date < $scope.start || date > today;;
	                } else {
	                  sel = $scope.selection && $scope.selection.contains(date);
	                  dis = date > today;
	                }
	              } else {
	                sel = date.isSame($scope.selection);
	                if ($scope.pastDates) {
	                  dis = moment().diff(date, 'days') > 0;
	                }
	              }
	              (_base = $scope.months)[m] || (_base[m] = {
	                name: date.format("MMMM YYYY"),
	                weeks: []
	              });
	              (_base1 = $scope.months[m].weeks)[w] || (_base1[w] = []);
	              return $scope.months[m].weeks[w][d] = {
	                date: date,
	                selected: sel,
	                disabled: dis,
	                start: $scope.start && $scope.start.unix() === date.unix()
	              };
	            });
	            _ref = $scope.months;
	            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	              m = _ref[_i];
	              if (!m.weeks[0]) {
	                m.weeks.splice(0, 1);
	              }
	            }
	            $scope.nextMonthAvailable = !($scope.lastMonth && $scope.lastMonth.isSame($scope.range.end, 'month'));
	            return _checkQuickList();
	          };
	          $scope.show = function() {
	        	// _addActiveToQuickListDefination();
	        	  var anyActive = false;
	        	  for(_i = 0; _i < $scope.quickList.length; _i++){
	        		  start = $scope.model.start._d.getDayOfYear() == $scope.quickList[_i].range.start._d.getDayOfYear();
	        		  end = $scope.model.end._d.getDayOfYear() == $scope.quickList[_i].range.end._d.getDayOfYear();
	        		  if($scope.quickList[_i].label == 'Today')
	        			  $scope.lastMonth = $scope.quickList[_i].range.end;
	        		  if(start && end && !anyActive){
	        			  anyActive = true;
	        			  $scope.quickList[_i].active = true;
	        		  }
	        		  else $scope.quickList[_i].active = false;
	        	  }
	            $scope.selection = $scope.model;
	            _calculateRange();
	            _prepare();
	            $scope.nextMonthAvailable = !($scope.lastMonth && $scope.lastMonth.isSame($scope.range.end, 'month'));
	            return $scope.visible = true;
	          };
	          $scope.hide = function($event) {
	            if ($event != null) {
	              if (typeof $event.stopPropagation === "function") {
	                $event.stopPropagation();
	              }
	            }
	            $scope.visible = false;
	            return $scope.start = null;
	          };
	          $scope.prevent_select = function($event) {
	            return $event != null ? typeof $event.stopPropagation === "function" ? $event.stopPropagation() : void 0 : void 0;
	          };
	          $scope.ok = function($event) {
	            if ($event != null) {
	              if (typeof $event.stopPropagation === "function") {
	                $event.stopPropagation();
	              }
	            }
	            if($scope.start != null)
	            	$scope.selection = moment().range($scope.start, $scope.start);
	            $scope.model = $scope.selection;
	            $timeout(function() {
	              if ($scope.callback) {
	                return $scope.callback();
	              }
	            });
	            return $scope.hide();
	          };
	          _getDateString = function(day){
	        	  var dd = day.getDate();
	        	  var mm = day.getMonth()+1;
	        	  var yyyy = day.getFullYear();
	        	  if(dd<10){
	        	      dd='0'+dd;
	        	  } 
	        	  if(mm<10){
	        	      mm='0'+mm;
	        	  } 
	        	  return dd+'-'+mm+'-'+yyyy;
	          }
	          $scope.select = function(day, $event) {
	            if ($event != null) {
	              if (typeof $event.stopPropagation === "function") {
	                $event.stopPropagation();
	              }
	            }
	            if (day.disabled) {
	              return;
	            }
	            if($scope.start == null)
	            	$scope.start = day.date;
	            if ($scope.showRanged) {
	              $scope.selecting = !$scope.selecting;
	              if ($scope.selecting) {
	                $scope.start = day.date;
	            	$scope.start_date = _getDateString(day.date._d);
	            	$scope.end_date = void 0;
	            	_disableActiveQuick();
	              } else {
	                $scope.selection = moment().range($scope.start, day.date);
	                $scope.end_date = _getDateString(day.date._d);
	                $scope.start = null;
	              }
	            } else {
	              $scope.selection = moment(day.date);
	            }
	            return _prepare();
	          };
	          $scope.move = function(n, $event) {
	            if ($event != null) {
	              if (typeof $event.stopPropagation === "function") {
	                $event.stopPropagation();
	              }
	            }
	           if(n > 0 && !$scope.nextMonthAvailable){
	        	   return;
	           }
	            if ($scope.showRanged) {
	              $scope.range = moment().range($scope.range.start.add(n, 'months').startOf("month").startOf("day"), $scope.range.start.clone().add(1, "months").endOf("month").startOf("day"));
	            } else {
	              $scope.date.add(n, 'months');
	              $scope.range = moment().range(moment($scope.date).startOf("month"), moment($scope.date).endOf("month"));
	            }
	            return _prepare();
	          };
	          $scope.handlePickerClick = function($event) {
	            return $event != null ? typeof $event.stopPropagation === "function" ? $event.stopPropagation() : void 0 : void 0;
	          };
	          _addActiveToQuickListDefination = function(){
	        	  for(_i = 0; _i < $scope.quickList.length; _i++){
	        		  start = $scope.model.start._d.getDayOfYear() == $scope.quickList[_i].range.start._d.getDayOfYear();
	        		  end = $scope.model.end._d.getDayOfYear() == $scope.quickList[_i].range.end._d.getDayOfYear();
	        		  console.log($scope.model,start,end, "quicklist",$scope.quickList);
	        		  if(start && end)
	        			  $scope.quickList[_i].active = true;
	        		  else $scope.quickList[_i].active = false;
	        		  if($scope.quickList[_i].label == 'Today')
	        			  $scope.lastMonth = $scope.quickList[_i].range.end;
	        	  }
	          }
	          _disableActiveQuick = function(){
	        	  for(_i = 0; _i < $scope.quickList.length; _i++){
	        			  $scope.quickList[_i].active = false;
	        	  }
	          }
	          _changeActiveQuickList = function(quick){
	        	  for(_i = 0; _i < $scope.quickList.length; _i++){
	        		  if($scope.quickList[_i].label == quick.label)
	        			  $scope.quickList[_i].active = true;
	        		  else $scope.quickList[_i].active = false;
	        	  }
	          }
	          $scope.changeQuick = function(quick){
	        	  _changeActiveQuickList(quick);
	        	  $scope.quick = quick.range;
	          }
	          $scope.$watch("quick", function(q, o) {
	            if (!q || q === CUSTOM) {
	              return;
	            }
	            $scope.start_date = _getDateString($scope.quick.start._d);
	            $scope.end_date = _getDateString($scope.quick.end._d);
	            $scope.selection = $scope.quick;
	            $scope.selecting = false;
	            $scope.start = null;
	            _calculateRange();
	            return _prepare();
	          });
	          $scope.$watch("customSelectOptions", function(value) {
	            if (typeof customSelectOptions === "undefined" || customSelectOptions === null) {
	              return;
	            }
	            return $scope.quickListDefinitions = value;
	          });
	          domEl = $compile(angular.element(pickerTemplate))($scope);
	          element.append(domEl);
	          element.bind("click", function(e) {
	            if (e != null) {
	              if (typeof e.stopPropagation === "function") {
	                e.stopPropagation();
	              }
	            }
	            return $scope.$apply(function() {
	              if ($scope.visible) {
	                return $scope.hide();
	              } else {
	                return $scope.show();
	              }
	            });
	          });
	          documentClickFn = function(e) {
	            $scope.$apply(function() {
	              return $scope.hide();
	            });
	            return true;
	          };
	          angular.element(document).bind("click", documentClickFn);
	          $scope.$on('$destroy', function() {
	            return angular.element(document).unbind('click', documentClickFn);
	          });
	          _makeQuickList();
	          _calculateRange();
	          return _prepare();
	        }
	      };
	    }
	  ]);

	}).call(this);