"use strict";

/** ****************CLASS*************************/

function Teacher (newId, newFirstName, newMidName, newLastName) {
    try {
        if (isFinite(newId) && Number(newId) > 0) {
            this.id = parseInt(newId, 10);
        } else {
            this.id = 0;
            throw new CustomPropertyError("Constructor - Teacher newId is not valid", newId);
        }

        if (newFirstName !== "" && newFirstName.length <= 255 && newFirstName.length >= 3) {
            this.firstName = newFirstName;
        } else {
            this.firstName = "unknown";
            throw new CustomPropertyError("Constructor - Teacher newFirstName is not valid", newFirstName);
        }

        if (newMidName !== "" && newMidName.length <= 255 && newMidName.length >= 3) {
            this.midName = newMidName;
        } else {
            this.midName = "unknown";
            throw new CustomPropertyError("Constructor - Teacher newMidName is not valid", newMidName);
        }

        if (newLastName !== "" && newLastName.length <= 255 && newLastName.length >= 3) {
            this.lastName = newLastName;
        } else {
            this.lastName = "unknown";
            throw new CustomPropertyError("Constructor - Teacher newLastName is not valid", newLastName);
        }

    } catch (e) {
        // logMyErrors(e.message, e.name);
    }

    return this;
}