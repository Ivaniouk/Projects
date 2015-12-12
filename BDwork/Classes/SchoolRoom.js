"use strict";
/** ****************ERRORS*************************/

function CustomPropertyError(message, property) {
    this.message = message + " " + property;
    this.name = "CustomPropertyError";
}

/** ****************CLASS*************************/

function SchoolRoom(creationTrigger, newId, newName) {
    try {
        if (creationTrigger) {
            if (isFinite(newId) && Number(newId) >= 100) {
                this.id = parseInt(newId, 10);
            } else {
                throw new CustomPropertyError("Constructor - SchoolRoom ID not valid", newId);
            }

            if (newName !== "" && newName.length <= 255 && newName.length >= 3) {
                this.name = newName;
            } else {
                throw new CustomPropertyError("Constructor - SchoolRoom name not valid", newName);
            }
        } else {
            var requestedRoom = LocalDB.SchoolRoom[newId]; // треба додати адекватний серч
            if (requestedRoom) {
                if (isFinite(requestedRoom.id) && Number(requestedRoom.id) >= 100) {
                    this.id = parseInt(requestedRoom.id, 10);
                } else {
                    throw new CustomPropertyError("Constructor - SchoolRoom ID in LocalDB is not valid", requestedRoom.id);
                }

                if (requestedRoom.name !== "" && requestedRoom.name.length <= 255 && requestedRoom.name.length >= 3) {
                    this.name = requestedRoom.name;
                } else {
                    throw new CustomPropertyError("Constructor - SchoolRoom name in LocalDB is not valid", requestedRoom.name);
                }
            } else {

                var xhr = new XMLHttpRequest();
                xhr.open('GET', 'api.php?controller=school_rooms&action=item&id=' + newId, false); // просто скопіював чужий запит, ще не знаю як формувати запит
                xhr.send();
                if (xhr.status !== 200) {
                    throw new CustomPropertyError("Constructor - SchoolRoom by " + newId + " ID does not exist", xhr.status);
                } else {
                    // фішка - якщо буду перевіряти перед тим як класти в локальну базу то можна не валідувати інфу з локальної Бази на коректність ? АЛЕ! локальна База ж глобальна ?
                    requestedRoom = JSON.parse(xhr.responseText);
                    if (isFinite(requestedRoom.id) && Number(requestedRoom.id) >= 100) {
                        this.id = parseInt(requestedRoom.id, 10);
                    } else {
                        throw new CustomPropertyError("Constructor - SchoolRoom ID in outer_lDB is not valid", requestedRoom.id);
                    }

                    if (requestedRoom.name !== "" && requestedRoom.name.length <= 255 && requestedRoom.name.length >= 3) {
                        this.name = requestedRoom.name;
                    } else {
                        throw new CustomPropertyError("Constructor - SchoolRoom name in outer_DB is not valid", requestedRoom.name);
                    }
                    LocalDB.SchoolRoom.push(requestedRoom);
                }
            }
        }

    } catch (e) {
        // logMyErrors(e.message, e.name);
        throw e;
    }
    return this;
}

/** ****************METHODS*************************/

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