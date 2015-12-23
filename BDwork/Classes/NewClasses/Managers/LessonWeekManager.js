"use strict";
/** ****************CLASS*************************/
function LessonWeekManager(url) {
    BaseManagerClass.apply(this, arguments);
}

/** ****************METHODS*************************/
LessonWeekManager.prototype = Object.create(BaseManagerClass.prototype);
LessonWeekManager.prototype.constructor = LessonWeekManager;

LessonWeekManager.prototype = {
    /** Creates new instance -> adds it to the _cashPool -> returns instance */
    _createInstance : function (object) {
        var instance = new LessonWeek(object);
        this._cashPool[object.id] = instance;
        return instance;
    }
};