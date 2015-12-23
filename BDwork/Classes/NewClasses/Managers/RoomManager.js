"use strict";
/** ****************CLASS*************************/
function SchoolRoomManager(url) {
    BaseManagerClass.apply(this, arguments);
}

/** ****************METHODS*************************/
SchoolRoomManager.prototype = Object.create(BaseManagerClass.prototype);
SchoolRoomManager.prototype.constructor = SchoolRoomManager;

SchoolRoomManager.prototype = {
    /** Creates new instance -> adds it to the _cashPool -> returns instance */
    _createInstance : function (object) {
        var instance = new SchoolRoom(object);
        this._cashPool[object.id] = instance;
        return instance;
    }
};