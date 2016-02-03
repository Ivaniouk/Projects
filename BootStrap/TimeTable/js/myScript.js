
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

    var UnresOne = new LessonClass("Music", "H");
    var UnresTwo = new LessonClass("Singing", "S");
    var UnresThree = new LessonClass("PE", "G");
    var UnresFour = new LessonClass("PE", "G");
    var UnresFive = new LessonClass("PE", "G");

    Form.addUnresolved(UnresOne);
    Form.addUnresolved(UnresTwo);
    Form.addUnresolved(UnresThree);
    Form.addUnresolved(UnresFour);
    Form.addUnresolved(UnresFive);

    $scope.models = {
        selected: null,
        lists: {
            "A": Form.daysArray[0].lessonArray,
            "B": Form.daysArray[1].lessonArray,
            "unresolved" : Form.unusedLessons
        }
    };

    $scope.dropCallback = function(event, index, item, external, type, allowedType) {
       // $scope.logListEvent('dropped at', event, index, external, type);
        if (external) {
            if (allowedType === 'itemType' && !item.lessonName) return false;
            if (allowedType === 'containerType' && !angular.isArray(item)) return false;
        }

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






