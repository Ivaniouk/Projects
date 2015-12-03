"use strict";

/** ****************CLASS*************************/

function LessonWeek(newId, newNumber, newName) {
    try {
        if (isFinite(newId) && Number(newId) > 0) {
            this.id = parseInt(newId, 10);
        } else {
            this.id = 0;
            throw new CustomPropertyError("Constructor - LessonWeek ID is not valid", newId);
        }

        if (isFinite(newNumber) && Number(newNumber) > 0 && Number(newNumber) < 4) {
            this.number = parseInt(newNumber, 10);
        } else {
            this.number = 0;
            throw new CustomPropertyError("Constructor - LessonWeek number is not valid", newNumber);
        }

        if (newName !== "" && newName.length <= 255 && newName.length >= 3) {
            this.name = newName;
        } else {
            this.name = "unknown";
            throw new CustomPropertyError("Constructor - LessonWeek name is not valid", newName);
        }
    } catch (e) {
        // logMyErrors(e.message, e.name);
    }

    return this;
}

/** ****************METHODS*************************/