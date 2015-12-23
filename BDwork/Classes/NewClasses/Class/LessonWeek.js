"use strict";

/** ****************CLASS*************************/

function LessonWeek(object) {
    _CreateClass(object.id, object.number, object.name);
    return this;
}

/** ****************METHODS*************************/

LessonWeek.prototype = {
    getID : function () {
        return this.id;
    },

    getNumber : function () {
        return this.number;
    },

    getName : function () {
        return this.name;
    },

    setID : function (newId) {
        if (_validateID(newId)) {
            this.id = parseInt(newId, 10);
        } else {
            logMyErrors("Setter " + this.constructor.name + " ID not valid", newId);
        }
    },

    setNumber : function (newNumber) {
        if (_validateNumber(newNumber)) {
            this.id = parseInt(newNumber, 10);
        } else {
            logMyErrors("Setter " + this.constructor.name + " week number not valid", newNumber);
        }
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

    _validateNumber : function (newNumber) {
        return (isFinite(newNumber) && newNumber >= 0 && newNumber < 4);
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

        if (_validateNumber(newNumber)) {
            this.id = parseInt(newNumber, 10);
        } else {
            logMyErrors("Constructor - " + this.constructor.name + " week number not valid", newNumber);
            return;
        }

        if (_validateName(newName)) {
            this.name = newName;
        } else {
            logMyErrors("Constructor - " + this.constructor.name + " name not valid", newName);
        }
    }
};