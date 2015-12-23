"use strict";
/** ****************CLASS*************************/
function TeacherManager(url) {
    BaseManagerClass.apply(this, arguments);
}
/** ****************METHODS*************************/
TeacherManager.prototype = Object.create(BaseManagerClass.prototype);
TeacherManager.prototype.constructor = TeacherManager;

TeacherManager.prototype = {
    /** Creates new instance -> adds it to the _cashPool -> returns instance */
    _createInstance : function (object) {
        var instance = new Teacher(object);
        this._cashPool[object.id] = instance;
        return instance;
    }
};