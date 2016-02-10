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
        addLesson : function (newLesson, index) {
            //this.lessonArray.push(newLesson);
            this.lessonArray.splice(index, 1, newLesson);
        },

        fillAll : function () {
            for (var i = 0; i < 8; i++) {
                this.lessonArray[i] = {};
            }
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
            //this.daysArray.splice(index, 0, newDay);
        },

        addUnresolved : function (newLesson) {
            this.unusedLessons.push(newLesson);
        }

    };

    return Form;
}
/*****************************************************/