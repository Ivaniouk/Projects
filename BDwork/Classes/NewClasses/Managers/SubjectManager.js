"use strict";
/** ****************CLASS*************************/
function SubjectManager(url) {
    BaseManagerClass.apply(this, arguments);
}
/** ****************METHODS*************************/
SubjectManager.prototype = Object.create(BaseManagerClass.prototype);
SubjectManager.prototype.constructor = SubjectManager;