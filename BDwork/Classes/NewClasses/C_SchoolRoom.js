"use strict";

/** ****************CLASS*************************/

function C_SchoolRoom(newId, newName) {
    _CreateClass(newId, newName);
    return this;
}

/** ****************METHODS*************************/

C_SchoolRoom.prototype = {
    getID : function () {
        return this.id;
    },

    setID : function (newId) {
        if (_validateID) {
            this.id = parseInt(newId, 10);
        } else {
            logMyErrors("Setter SchoolRoom ID not valid", newId);
        }
    },

    getName : function () {
        return this.name;
    },

    setName : function (newName) {
        if (_validateName) {
            this.name = newName;
        } else {
            logMyErrors("Setter SchoolRoom name not valid", newName);
        }
    },

    _validateID : function (newId) {
        return (isFinite(newId) && Number(newId) >= 100);
    },

    _validateName : function (newName) {
        return (newName !== "" && newName.length <= 255 && newName.length >= 3);
    },

    _CreateClass : function (newId, newName) {
        if (_validateID(newId)) {
            this.id = parseInt(newId, 10);
        } else {
            logMyErrors("Constructor - SchoolRoom ID not valid", newId);
            return;
        }

        if (_validateName(newName)) {
            this.name = newName;
        } else {
            logMyErrors("Constructor - SchoolRoom name not valid", newName);
        }
    }
};