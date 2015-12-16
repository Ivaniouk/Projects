"use strict";

/** ****************CLASS*************************/

function LessonWeek(newId, newNumber, newName) {
    try {
        if (isFinite(newId) && Number(newId) > 0) {
            this.id = parseInt(newId, 10);
        } else {
            throw new CustomPropertyError("Constructor - LessonWeek ID is not valid", newId);
        }

        if (isFinite(newNumber) && Number(newNumber) > 0 && Number(newNumber) < 4) {
            this.number = parseInt(newNumber, 10);
        } else {
            throw new CustomPropertyError("Constructor - LessonWeek number is not valid", newNumber);
        }

        if (newName !== "" && newName.length <= 255 && newName.length >= 3) {
            this.name = newName;
        } else {
            throw new CustomPropertyError("Constructor - LessonWeek name is not valid", newName);
        }
    } catch (e) {
        // logMyErrors(e.message, e.name);
        throw e;
    }

    return this;
}

/** ****************METHODS*************************/

LessonWeek.prototype = {
    getID : function () {
        return this.id;
    },

    setID : function (newId) {
        try {
            if (isFinite(newId) && Number(newId) > 0) {
                this.id = parseInt(newId, 10);
            } else {
                throw new CustomPropertyError("Setter LessonWeek ID is not valid", newId);
            }
        } catch (e) {
            // logMyErrors(e.message, e.name);
        }
    },

    getNumber : function () {
        return this.number;
    },

    setNumber : function (newNumber) {
        if (isFinite(newNumber) && Number(newNumber) > 0 && Number(newNumber) < 4) {
            this.number = parseInt(newNumber, 10);
        } else {
            throw new CustomPropertyError("Constructor - LessonWeek number is not valid", newNumber);
        }
    },

    getName : function () {
        return this.name;
    },

    setName : function (newName) {
        try {
            if (newName !== "" && newName.length <= 255 && newName.length >= 3) {
                this.name = newName;
            } else {
                throw new CustomPropertyError("Setter LessonWeek name is not valid", newName);
            }
        } catch (e) {
            // logMyErrors(e.message, e.name)
        }
    }
};