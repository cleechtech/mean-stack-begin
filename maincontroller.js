//assigns controller to the application
app.controller('MainController', function($scope){
	$scope.understand = "I now understand how the scope works!";
	$scope.inputValue = "";
	$scope.selectedPerson = 0;
	$scope.selectedGenre = null;
	$scope.people = [
		{
			id: 0,
			name: 'Leon',
			music: [
				'Rock',
				'Metal',
				'Dubstep',
				'Electro'
			],
			live: true
		},
		{
			id: 1,
			name: 'Chris',
			music: [
				'Indie',
				'Drumstep',
				'Dubstep',
				'Electro'
			],
			live: false
		},
		{
			id: 2,
			name: 'Harry',
			music: [
				'Rock',
				'Metal',
				'Thrash Metal',
				'Heavy Metal'
			],
			live: true
		},
		{
			id: 3,
			name: 'Allyce',
			music: [
				'Pop',
				'RnB',
				'Hip Hop'
			],
			live: false
		}
	]; // /$scope.people

});
