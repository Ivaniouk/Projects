"use strict";

/** ****************CLASS*************************/

function SchoolClass(newId, newName) {
    Subject.apply(this, arguments);
}

/** ****************METHODS*************************/

SchoolClass.prototype = Object.create(Subject.prototype);
SchoolClass.prototype.constructor = SchoolClass;