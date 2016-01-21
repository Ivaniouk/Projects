
function SideBarsController($scope){
    $scope.daysArr = ["Monday", "Tuesday", "Wednesday"];
    $scope.daysNumberArr = ["0", "1", "2", "3", "4", "5", "6", "7"];
    $scope.classesSidebarArr = ["6 - a", "6 - б", "7 - a", "8 - a", "9 - a", "11 - a", "12 - a"];
}

function SimpleDemoController($scope){
    $scope.models = {
        selected: null,
        lists: {"A": [
            {
                "label": "Item A1"
            },
            {
                "label": "Item A2"
            },
            {
                "label": "Item A3"
            },
            {
                "label": "Item A4"
            }
        ], "B": [
            {
                "label": "Item B1"
            },
            {
                "label": "Item B2"
            },
            {
                "label": "Item B3"
            },
            {
                "label": "Item B4"
            }
        ]}
    };

    // Generate initial model
    /*
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: "Item A" + i});
        $scope.models.lists.B.push({label: "Item B" + i});
    }*/

    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
}



angular
    .module('demo', ["dndLists"])
    .controller('SideBarsController', SideBarsController)
    .controller('SimpleDemoController', SimpleDemoController);



