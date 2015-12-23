"use strict";
/** ****************CLASS*************************/
function SchoolClass(newId, newName) {
    BaseClass.apply(this, arguments);
}
/** ****************METHODS*************************/

SchoolClass.prototype = Object.create(BaseClass.prototype);
SchoolClass.prototype.constructor = SchoolClass;