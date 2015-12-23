"use strict";
/** ****************CLASS*************************/
function SchoolClassesManager(url) {
    BaseManagerClass.apply(this, arguments);
}
/** ****************METHODS*************************/
SchoolClassesManager.prototype = Object.create(BaseManagerClass.prototype);
SchoolClassesManager.prototype.constructor = SchoolClassesManager;

SchoolClassesManager.prototype = {
    /** Creates new instance -> adds it to the _cashPool -> returns instance */
    _createInstance : function (object) {
        var instance = new SchoolClass(object);
        this._cashPool[object.id] = instance;
        return instance;
    }
};