'use strict';

var rmRestModule = angular.module('RMRestClient', [
	'ngRoute',
	'ngResource',
	'myApp.version'
]);

/* Services */
//all methods but update(put) are default
rmRestModule.factory('Person', ['$resource',
	function($resource){
	    return $resource('http://localhost:8000/api/person/:id',
	    	{
				id : '@id',
				firstname : '@firstname',
				lastname : '@lastname',
				description : '@description'
	    	}, 
	    	{
				update: {
					method:'PUT', params:{}, isArray : false
				}
			});
}]);


/* Config */

rmRestModule.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise(
		{redirectTo: '/'}
	).
		when('/', {
		templateUrl: 'view/personList.html',
		controller: 'PersonListControl'
	}).
	when('/:id', {
		templateUrl: 'view/person.html',
		controller: 'PersonCtrl'
	});
}]);


/* Controllers */

rmRestModule.controller('PersonListControl', ['$scope', 'Person', function($scope, Person) {
	$scope.newPerson = new Person();

	$scope.people = Person.query();

	$scope.save = function () {
		$scope.newPerson.$save();
	};

}]);

rmRestModule.controller('PersonCtrl', ['$scope', '$routeParams', 'Person', function($scope, $routeParams, Person) {
	$scope.person = Person.get({id : $routeParams.id});

	$scope.update = function () {
		$scope.person.$update();
	};

}]);


