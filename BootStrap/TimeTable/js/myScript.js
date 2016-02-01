
function SideBarsController($scope){
    $scope.daysArr = ["Monday", "Tuesday", "Wednesday"];
    $scope.daysNumberArr = ["0", "1", "2", "3", "4", "5", "6", "7"];
    $scope.classesSidebarArr = ["6 - a", "6 - б", "7 - a", "8 - a", "9 - a", "11 - a", "12 - a"];
}


function SimpleDemoController($scope, LessonClass, DayClass, schoolForm){
    var lMonOne = new LessonClass("Mathematics", "Abrams");
    var lMonTwo = new LessonClass("English", "Lester");
    var Monday = new DayClass("Monday");

    Monday.addLesson(lMonOne);
    Monday.addLesson(lMonTwo);

    var lTueOne = new LessonClass("Mathematics", "Abrams");
    var lTueTwo = new LessonClass("English", "Lester");
    var Tuesday = new DayClass("Tuesday");

    Tuesday.addLesson(lTueOne);
    Tuesday.addLesson(lTueTwo);

    var Form = new schoolForm("7 - B");

    Form.addDay(Monday);
    Form.addDay(Tuesday);

   // Form.daysArray.lessonArray;
    //і такі передаю норм обджекти
    $scope.models = {
        selected: null,
        lists: {
            "A": Form.daysArray[0].lessonArray,
            "B": Form.daysArray[1].lessonArray
        }
    };

    $scope.dropCallback = function(event, index, item, external, type, allowedType) {
       // $scope.logListEvent('dropped at', event, index, external, type);
        if (external) {
            if (allowedType === 'itemType' && !item.lessonName) return false;
            if (allowedType === 'containerType' && !angular.isArray(item)) return false;
        }

        //console.log(Form.daysArray[0]); // для дебага
        console.log("DROP"); // замість цього буде викликатися функція яка буде сейвить в базу зміни
        return item;
    };


    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
}



angular
    .module('demo', ["dndLists"])
    .factory('LessonClass', LessonClass)
    .factory('DayClass', DayClass)
    .factory('schoolForm', schoolForm)
    .controller('SideBarsController', SideBarsController)
    .controller('SimpleDemoController', SimpleDemoController, ['LessonClass', 'DayClass', 'schoolForm']);






