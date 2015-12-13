"use strict";
/** ****************ERRORS*************************/

function CustomPropertyError(message, property) {
    this.message = message + " " + property;
    this.name = "CustomPropertyError";
}

function logMyErrors( msg, text) {
    //error log
}

/** ****************CLASS*************************/

function SchoolRoom(creationTrigger, newId, newName) {
    if (creationTrigger) {
        _CreateClassByUser( newId, newName);
    } else {
        var requestedRoom = SearchArray(newId); //need Object not array
        if (requestedRoom) {
            _CreateClassByLocalDB(requestedRoom);
        } else {
            //not asynchronous request
            requestedRoom = _requestFromOuterBaseByID(newId);
            if(requestedRoom) {
                _CreateClassByOuterDB(requestedRoom);
            }
        }
    }
    return this;
}

/** ****************METHODS*************************/

SchoolRoom.prototype = {
    getID : function () {
        return this.id;
    },

    setID : function (newId) {
        if (_validateID) {
            this.id = parseInt(newId, 10);
        } else {
            logMyErrors("Setter SchoolRoom ID not valid", newId);
        }
    },

    getName : function () {
        return this.name;
    },

    setName : function (newName) {
        if (_validateName) {
            this.name = newName;
        } else {
            logMyErrors("Setter SchoolRoom name not valid", newName);
        }
    },

    _validateID : function (newId) {
        return (isFinite(newId) && Number(newId) >= 100);
    },

    _validateName : function (newName) {
        return (newName !== "" && newName.length <= 255 && newName.length >= 3);
    },

    _CreateClassByUser : function (newId, newName) {
        if (_validateID(newId)) {
            this.id = parseInt(newId, 10);
        } else {
            logMyErrors("Constructor - SchoolRoom ID not valid", newId);
            return;
        }

        if (_validateName(newName)) {
            this.name = newName;
        } else {
            logMyErrors("Constructor - SchoolRoom name not valid", newName);
        }
    },

    _CreateClassByLocalDB : function (requestedRoom) {
        if (requestedRoom) {
            if (_validateID(requestedRoom.id)) {
                this.id = parseInt(requestedRoom.id, 10);
            } else {
                logMyErrors("Constructor - SchoolRoom ID in LocalDB is not valid", requestedRoom.id);
                return;
            }

            if (_validateName(requestedRoom.name)) {
                this.name = requestedRoom.name;
            } else {
                logMyErrors("Constructor - SchoolRoom name in LocalDB is not valid", requestedRoom.name);
            }
        }
    },
    //TODO need asynchronous request
    _requestFromOuterBaseByID : function (id) { //url ???
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'api.php?controller=school_rooms&action=item&id=' + newId, false); // not sure its valid request
        xhr.send();
        if (xhr.status !== 200) {
            logMyErrors("Constructor - SchoolRoom by " + newId + " ID does not exist", xhr.status);
            return null;
        }
        return JSON.parse(xhr.responseText);
    },

    _CreateClassByOuterDB : function (requestedRoom) {
        if (_validateID(requestedRoom.id)) {
            this.id = parseInt(requestedRoom.id, 10);
        } else {
            logMyErrors("Constructor - SchoolRoom ID in outer_lDB is not valid", requestedRoom.id);
        }

        if (_validateName(requestedRoom.name)) {
            this.name = requestedRoom.name;
        } else {
            logMyErrors("Constructor - SchoolRoom name in outer_DB is not valid", requestedRoom.name);
        }
        //TODO change to object
        LocalDB.SchoolRoom.push(requestedRoom);
    },
    //TODO check LocalDB.SchoolRooms (array) functionality
    SearchArray : function (searchId) {
        for (var i = 0; i < LocalDB.SchoolRooms.length; i++) {
            if (arr[i].id === searchId) {
                return arr[i];
            }
        }
        return false;
    }
};