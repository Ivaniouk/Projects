"use strict";
/** ****************CLASS*************************/
function SubjectManager(url) {
    BaseManagerClass.apply(this, arguments);
}
/** ****************METHODS*************************/
SubjectManager.prototype = Object.create(BaseManagerClass.prototype);
SubjectManager.prototype.constructor = SubjectManager;

SubjectManager.prototype = {
    /** Creates new instance -> adds it to the _cashPool -> returns instance */
    _createInstance : function (object) {
        var instance = new Subject(object);
        this._cashPool[object.id] = instance;
        return instance;
    }
};