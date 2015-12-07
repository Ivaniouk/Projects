"use strict";

/** ****************CLASS*************************/

function LessonDay(newId, newLessonWeekId, newLessonWeekobject, newName, newLessonMAXcount) {
    try {
        this.LessonWeekExemplar = new LessonWeek(newLessonWeekobject.id, newLessonWeekobject.number, newLessonWeekobject.name);

        if (isFinite(newId) && Number(newId) > 0) {
            this.id = parseInt(newId, 10);
        } else {
            throw new CustomPropertyError("Constructor - LessonDay ID is not valid", newId);
        }

        if (isFinite(newLessonWeekId) && Number(newLessonWeekId) > 0) {
            this.lessonWeekId = parseInt(newLessonWeekId, 10);
        } else {
            throw new CustomPropertyError("Constructor - LessonDay newLessonWeekId is not valid", newLessonWeekId);
        }

        if (newName !== "" && newName.length <= 255 && newName.length >= 3) {
            this.name = newName;
        } else {
            throw new CustomPropertyError("Constructor - LessonDay newName is not valid", newName);
        }

        if (isFinite(newLessonMAXcount) && Number(newLessonMAXcount) > 0 && Number(newLessonMAXcount) < 4) {
            this.lessonMAXcount = parseInt(newLessonMAXcount, 10);
        } else {
            throw new CustomPropertyError("Constructor - LessonDay newLessonMAXcount is not valid", newLessonMAXcount);
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
                throw new CustomPropertyError("Setter - LessonDay newId is not valid", newId);
            }
        } catch (e) {
            // logMyErrors(e.message, e.name);
        }
    },

    getLessonWeekId : function () {
        return this.lessonWeekId;
    },

    setLessonWeekId : function (newLessonWeekId) {
        try {
            if (isFinite(newLessonWeekId) && Number(newLessonWeekId) > 0) {
                this.lessonWeekId = parseInt(newLessonWeekId, 10);
            } else {
                this.lessonWeekId = 0;
                throw new CustomPropertyError("Setter - LessonDay newLessonWeekId is not valid", newLessonWeekId);
            }
        } catch (e) {
            // logMyErrors(e.message, e.name);
        }

    },

    getLessonWeekExemplar : function () {
        return this.LessonWeekExemplar;
    },

    setLessonWeekExemplar : function (newLessonWeekobject) {
        try {
            this.LessonWeekExemplar = new LessonWeek(newLessonWeekobject.id, newLessonWeekobject.number, newLessonWeekobject.name);
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
                this.name = "unknown";
                throw new CustomPropertyError("Setter - LessonDay newName is not valid", newName);
            }
        } catch (e) {
            // logMyErrors(e.message, e.name);
        }
    },

    getLessonMAXcount : function () {
        return this.lessonMAXcount;
    },

    setLessonMAXcount : function (newLessonMAXcount) {
        try {
            if (isFinite(newLessonMAXcount) && Number(newLessonMAXcount) > 0 && Number(newLessonMAXcount) < 4) {
                this.lessonMAXcount = parseInt(newLessonMAXcount, 10);
            } else {
                this.lessonMAXcount = 0;
                throw new CustomPropertyError("Setter - LessonDay newLessonMAXcount is not valid", newLessonMAXcount);
            }
        } catch (e) {
            // logMyErrors(e.message, e.name);
        }
    }
};




























