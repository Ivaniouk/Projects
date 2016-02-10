
function SideBarsController($scope){
    $scope.daysArr = ["Monday", "Tuesday", "Wednesday"];
    $scope.daysNumberArr = ["0", "1", "2", "3", "4", "5", "6", "7"];
    $scope.classesSidebarArr = ["6 - a", "6 - б", "7 - a", "8 - a", "9 - a", "11 - a", "12 - a"];
}

function SimpleDemoController($scope, LessonClass, DayClass, schoolForm){
    var lMonOne = new LessonClass("1.1", "Abrams");
    var lMonTwo = new LessonClass("1.2", "Lester");
    var Monday = new DayClass("Monday");

    Monday.fillAll();
    Monday.addLesson(lMonOne, 0);
    Monday.addLesson(lMonTwo, 2);

    var lTueOne = new LessonClass("2.1", "Abrams");
    var lTueTwo = new LessonClass("2.2", "Lester");
    var Tuesday = new DayClass("Tuesday");

    Tuesday.fillAll();
    Tuesday.addLesson(lTueOne, 0);
    Tuesday.addLesson(lTueTwo, 3);

    var Form = new schoolForm("7 - B");

    Form.addDay(Monday, 0);
    Form.addDay(Tuesday, 1);

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
            "A": {},
            "B": {},
            "unresolved" : {}
        }
    };

    function FillLessonView (LessonArray, Day) {
        for (i in LessonArray)
        {
            if(Object.keys(LessonArray[i]).length == 0) {
                Day[i] = [];
            } else {
                Day[i] = [LessonArray[i]];
            }
        }
    }

    FillLessonView(Form.daysArray[0].lessonArray, $scope.models.lists.A);
    FillLessonView(Form.daysArray[1].lessonArray, $scope.models.lists.B);
    FillLessonView(Form.unusedLessons, $scope.models.lists.unresolved);

    /** for file save*/
    $scope.dropCallback = function(event, index, item, external, type, allowedType) {
        if (external) {
            if (allowedType === 'itemType' && !item.lessonName) return false;
            if (allowedType === 'containerType' && !angular.isArray(item)) return false;
        }

        return item;
    };
}

angular
    .module('demo', ["dndLists"])
    .factory('LessonClass', LessonClass)
    .factory('DayClass', DayClass)
    .factory('schoolForm', schoolForm)
    .controller('SideBarsController', SideBarsController)
    .controller('SimpleDemoController', SimpleDemoController, ['LessonClass', 'DayClass', 'schoolForm']);






