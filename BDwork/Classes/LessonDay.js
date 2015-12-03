"use strict";

/** ****************CLASS*************************/

function LessonDay(newId, newLessonWeekId, newLessonWeekExemplar, newName, newLessonMAXcount) {
   //  // ??
    try {
        this.LessonWeekExemplar = JSON.parse(newLessonWeekExemplar); //?

        if (isFinite(newId) && Number(newId) > 0) {
            this.id = parseInt(newId, 10);
        } else {
            this.id = 0;
            throw new CustomPropertyError("Constructor - LessonDay ID is not valid", newId);
        }

        if (isFinite(newLessonWeekId) && Number(newLessonWeekId) > 0) {
            this.id = parseInt(newId, 10);
        } else {
            this.id = 0;
            throw new CustomPropertyError("Constructor - LessonDay newLessonWeekId is not valid", newLessonWeekId);
        }

        if (newName !== "" && newName.length <= 255 && newName.length >= 3) {
            this.name = newName;
        } else {
            this.name = "unknown";
            throw new CustomPropertyError("Constructor - LessonDay newName is not valid", newName);
        }

        if (isFinite(newLessonMAXcount) && Number(newLessonMAXcount) > 0 && Number(newLessonMAXcount) < 4) {
            this.lessonMAXcount = parseInt(newLessonMAXcount, 10);
        } else {
            this.lessonMAXcount = 0;
            throw new CustomPropertyError("Constructor - LessonDay newLessonMAXcount is not valid", newLessonMAXcount);
        }
    } catch (e) {
        // logMyErrors(e.message, e.name);
    }

    return this;
}