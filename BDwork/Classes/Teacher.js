"use strict";

/** ****************CLASS*************************/

function Teacher (newId, newFirstName, newMidName, newLastName) {
    try {
        if (isFinite(newId) && Number(newId) > 0) {
            this.id = parseInt(newId, 10);
        } else {
            throw new CustomPropertyError("Constructor - Teacher newId is not valid", newId);
        }

        if (newFirstName !== "" && newFirstName.length <= 255 && newFirstName.length >= 3) {
            this.firstName = newFirstName;
        } else {
            throw new CustomPropertyError("Constructor - Teacher newFirstName is not valid", newFirstName);
        }

        if (newMidName !== "" && newMidName.length <= 255 && newMidName.length >= 3) {
            this.midName = newMidName;
        } else {
            throw new CustomPropertyError("Constructor - Teacher newMidName is not valid", newMidName);
        }

        if (newLastName !== "" && newLastName.length <= 255 && newLastName.length >= 3) {
            this.lastName = newLastName;
        } else {
            throw new CustomPropertyError("Constructor - Teacher newLastName is not valid", newLastName);
        }

    } catch (e) {
        // logMyErrors(e.message, e.name);
        throw e;
    }

    return this;
}

/** ****************METHODS*************************/

Teacher.prototype = {
    getID : function () {
        return this.id;
    },

    setID : function (newId) {
        try {
            if (isFinite(newId) && Number(newId) > 0) {
                this.id = parseInt(newId, 10);
            } else {
                throw new CustomPropertyError("Setter Teacher newId not valid", newId);
            }
        } catch (e) {
            // logMyErrors(e.message, e.name);
        }
    },

    getFirstName : function () {
        return this.firstName;
    },

    setFirstName : function (newFirstName) {
        try {
            if (newFirstName !== "" && newFirstName.length <= 255 && newFirstName.length >= 3) {
                this.firstName = newFirstName;
            } else {
                throw new CustomPropertyError("Setter - Teacher newFirstName is not valid", newFirstName);
            }
        } catch (e) {
            // logMyErrors(e.message, e.name)
        }
    },

    getMidName : function () {
        return this.midName;
    },

    setMidName : function (newMidName) {
        try {
            if (newMidName !== "" && newMidName.length <= 255 && newMidName.length >= 3) {
                this.midName = newMidName;
            } else {
                throw new CustomPropertyError("Setter - Teacher newMidName is not valid", newMidName);
            }
        } catch (e) {
            // logMyErrors(e.message, e.name)
        }
    },

    getLastName : function () {
        return this.lastName;
    },

    setLastName : function (newLastName) {
        try {
            if (newLastName !== "" && newLastName.length <= 255 && newLastName.length >= 3) {
                this.lastName = newLastName;
            } else {
                throw new CustomPropertyError("Setter - Teacher newLastName is not valid", newLastName);
            }
        } catch (e) {
            // logMyErrors(e.message, e.name)
        }
    }
};































