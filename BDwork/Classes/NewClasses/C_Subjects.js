"use strict";
/** ****************CLASS*************************/
function C_Subject(newId, newName) {
    _CreateClass(newId, newName);
    return this;
}
/** ****************METHODS*************************/

C_Subject.prototype = {
    getID : function () {
        return this.id;
    },

    setID : function (newId) {
        if (_validateID) {
            this.id = parseInt(newId, 10);
        } else {
            logMyErrors("Setter Subject ID not valid", newId);
        }
    },

    getName : function () {
        return this.name;
    },

    setName : function (newName) {
        if (_validateName) {
            this.name = newName;
        } else {
            logMyErrors("Setter Subject name not valid", newName);
        }
    },

    _validateID : function (newId) {
        return (isFinite(newId));
    },

    _validateName : function (newName) {
        return (newName !== "" && newName.length <= 255 && newName.length >= 3);
    },

    _CreateClass : function (newId, newName) {
        if (_validateID(newId)) {
            this.id = parseInt(newId, 10);
        } else {
            logMyErrors("Constructor - Subject ID not valid", newId);
            return;
        }

        if (_validateName(newName)) {
            this.name = newName;
        } else {
            logMyErrors("Constructor - Subject name not valid", newName);
        }
    }
};