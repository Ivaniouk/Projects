"use strict";

/** ****************CLASS*************************/

function Teacher(newId, newName, newMidName, newLastName) {
    _CreateClass(newId, newName, newMidName, newLastName);
    return this;
}

/** ****************METHODS*************************/

Teacher.prototype = {
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

    getMidName : function () {
        return this.midName;
    },

    getLastName : function () {
        return this.LastName;
    },

    setName : function (newName) {
        if (_validateName(newName)) {
            this.name = newName;
        } else {
            logMyErrors("Setter " + this.constructor.name + " name not valid", newName);
        }
    },

    setMidName : function (newMidName) {
        if (_validateName(newMidName)) {
            this.name = newMidName;
        } else {
            logMyErrors("Setter " + this.constructor.name + " MidName not valid", newMidName);
        }
    },

    setLastName : function (newLastName) {
        if (_validateName(newLastName)) {
            this.name = newLastName;
        } else {
            logMyErrors("Setter " + this.constructor.name + " LastName not valid", newLastName);
        }
    },

    _validateID : function (newId) {
        return (isFinite(newId));
    },

    _validateName : function (newName) {
        return (newName !== "" && newName.length <= 255 && newName.length >= 3);
    },

    _CreateClass : function (newId, newName, newMidName, newLastName) {
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

        if (_validateName(newMidName)) {
            this.midName = newMidName;
        } else {
            logMyErrors("Constructor - " + this.constructor.name + " MidName not valid", newMidName);
        }

        if (_validateName(newLastName)) {
            this.LastName = newLastName;
        } else {
            logMyErrors("Constructor - " + this.constructor.name + " LastName not valid", newLastName);
        }
    }
};