"use strict";
/** ****************ERRORS*************************/

function CustomPropertyError(message, property) {
    this.message = message + " " + property;
    this.name = "CustomPropertyError";
}


/** ****************CLASSES*************************/

function SchoolRoom(newId, newName) {
    try {
        if (isFinite(newId) && +newId >= 100) {
            this.id = parseInt(newId, 10);
        } else {
            this.id = 0;
            throw new CustomPropertyError("ID not valid", newId);
        }

        if (newName.length <= 255) {
            this.name = newName;
        } else {
            this.name = "unknown";
            throw new CustomPropertyError("name not valid", newName);
        }
    } catch (e) {
        // logMyErrors(e.message, e.name)
    }
    return this;
}