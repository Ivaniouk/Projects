"use strict";
/** ****************ERRORS*************************/

function CustomPropertyError(message, property) {
    this.message = message + " " + property;
    this.name = "CustomPropertyError";
}

/** ****************CLASSES*************************/

function SchoolRoom(newId, newName) {
    try {
        if (isFinite(newId) && Number(newId) >= 100) { // Number(newId) ?
            this.id = parseInt(newId, 10);
        } else {
            this.id = 0;
            throw new CustomPropertyError("Constructor - SchoolRoom ID not valid", newId);
        }

        if (newName !== "" && newName.length <= 255 && newName.length >= 3) {
            this.name = newName;
        } else {
            this.name = "unknown";
            throw new CustomPropertyError("Constructor - SchoolRoom name not valid", newName);
        }
    } catch (e) {
        // logMyErrors(e.message, e.name);
    }
    return this;
}

SchoolRoom.prototype = {
    getID : function () {
        return this.id;
    },

    setID : function (newId) {
       try {
           if (isFinite(newId) && Number(newId) >= 100) {
               this.id = parseInt(newId, 10);
           } else {
               throw new CustomPropertyError("Setter SchoolRoom ID not valid", newId);
           }
       } catch (e) {
           // logMyErrors(e.message, e.name);
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
                throw new CustomPropertyError("Setter SchoolRoom name not valid", newName);
            }
        } catch (e) {
            // logMyErrors(e.message, e.name)
        }
    }
};