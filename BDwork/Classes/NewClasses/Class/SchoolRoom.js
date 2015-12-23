"use strict";

/** ****************CLASS*************************/

function SchoolRoom(newId, newName) {
    BaseClass.apply(this, arguments);
}

/** ****************METHODS*************************/

SchoolRoom.prototype = Object.create(BaseClass.prototype);
SchoolRoom.prototype.constructor = SchoolRoom;