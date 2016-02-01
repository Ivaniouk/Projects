function LessonClass() {
    var Lesson = function (newName, newTeacher) {
        this.lessonName = newName;
        this.Teacher = newTeacher;
    };
    return Lesson;
}
/*****************************************************/
function DayClass() {
    //var self = this;
    var lessonDay = function (newName) {
        this.name = newName;
        this.lessonArray = [];
    };

    lessonDay.prototype = {
        addLesson : function (newLesson) {
            this.lessonArray.push(newLesson);
        },

        removeLesson : function (number) {
            this.lessonArray.splice(number, 1);
        },

        printAllLessons : function () {
            for (var i = 0; i < this.lessonArray.length; i++){
                console.log(this.lessonArray[i].lessonName);
            }
        }
    };

    return lessonDay;
}
/*****************************************************/

function schoolForm() {
    var Form = function (newName) {
        this.name = newName;
        this.daysArray = [];
        this.unusedLessons = [];
    };

    Form.prototype = {
        addDay : function (newDay) {
            this.daysArray.push(newDay);
        }
    };

    return Form;
}
/*****************************************************/