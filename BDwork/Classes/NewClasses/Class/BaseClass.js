"use strict";

/** ****************CLASS*************************/

function BaseClass(object) {
    _CreateClass(object.id, object.name);
    return this;
}

/** ****************METHODS*************************/

BaseClass.prototype = {
    getID : function () {
        return this.id;
    },

    setID : function (newId) {
        if (_validateID(newId)) {
            this.id = parseInt(newId, 10);
        } else {
            logMyErrors("Setter " + this.constructor.name + " ID not valid", newId);
        }
    },

    getName : function () {
        return this.name;
    },

    setName : function (newName) {
        if (_validateName(newName)) {
            this.name = newName;
        } else {
            logMyErrors("Setter " + this.constructor.name + " name not valid", newName);
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
            logMyErrors("Constructor - " + this.constructor.name + " ID not valid", newId);
            return;
        }

        if (_validateName(newName)) {
            this.name = newName;
        } else {
            logMyErrors("Constructor - " + this.constructor.name + " name not valid", newName);
        }
    }
};