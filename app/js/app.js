'use strict';

var rmRestModule = angular.module('RMRestClient', [
	'ngRoute',
	'ngResource',
	'myApp.version'
]);

/* Services */

// the GET methods for resources and the collection are defined as get(), and query() in the $resource class definition
// The save/POST method has been defined for the coming nodejs implementation
rmRestModule.factory('Person', ['$resource',
	function($resource){
	    return $resource('data/person/:id.json', {}, {
			save: {
				method:'POST', 
					params:{
						firstname : '@firstName',
						lastname : '@lastName',
						description : '@description'
				    }, isArray : false
			},
			query: {
				method:'GET', 
				params:{
					id : 'people'
				}, isArray:true
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
	$scope.pForm = {
		firstname : '',
		lastname : '',
	};

	$scope.people = Person.query();

}]);

rmRestModule.controller('PersonCtrl', ['$scope', '$routeParams', 'Person', function($scope, $routeParams, Person) {
	$scope.person = Person.get({id : $routeParams.id});

}]);


