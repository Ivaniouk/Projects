'use strict';
//TODO add GET/SET
function Lesson(object) {
    var thisClass = this;
    if (object) {
        _CreateClass(object);
    }

    Lesson.prototype = {
        getID : function () {
            return thisClass.id;
        },

        setID : function (newId) {
            thisClass.id = parseInt(newId, 10);
        },

        _CreateClass : function (object) {
            thisClass.id = parseInt(object.id, 10);
            thisClass.lessonDayID = parseInt(object.lessonDayID, 10);
            thisClass.lessonNumber = parseInt(object.lessonNumber, 10);
            thisClass.schoolClassID = parseInt(object.schoolClassID, 10);
            thisClass.subjectID = parseInt(object.subjectID, 10);
            thisClass.schoolRoomID = parseInt(object.schoolRoomID, 10);
            thisClass.teacherID = parseInt(object.teacherID, 10);
        }
    };

    return thisClass;
}

angular
    .factory('Lesson', Lesson);