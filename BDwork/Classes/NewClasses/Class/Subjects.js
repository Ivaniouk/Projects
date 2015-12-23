"use strict";
/** ****************CLASS*************************/
function Subject(newId, newName) {
    BaseClass.apply(this, arguments);
}
/** ****************METHODS*************************/

Subject.prototype = Object.create(BaseClass.prototype);
Subject.prototype.constructor = Subject;