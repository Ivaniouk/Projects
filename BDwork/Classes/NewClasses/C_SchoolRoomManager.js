"use strict";

/** ****************CLASS*************************/
function C_SchoolRoomManager() {
    this._cashPool = {};
    return this;
}

/** ****************METHODS*************************/

C_SchoolRoomManager.prototype = {
    getOrCreateRoom : function (roomObject, trigger) {
        var roomInstance;
        if (trigger) {
            roomInstance = _createRoom(roomObject);
            this._cashPool[roomObject.roomId] = instance;
        } else {
            roomInstance = _cashPool(roomObject.roomId);
            if (!roomInstance) {
                roomInstance = _loadRoom(roomObject.roomId);
                if (roomInstance === 400) {
                    this._cashPool[roomObject.roomId] = instance;
                }
            }
        }
        return roomInstance;
    },

    _createRoom : function (roomObject) {
        return new C_SchoolRoom(roomObject.roomId, roomObject.roomName);
    },

    _requestRoom : function (roomId) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "valid/request:" + roomId, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            return xhr;
        };
    },

    _loadRoom : function (roomId) {
        return new Promise(function (_createRoom) {
            var xhr = _requestRoom(roomId);
            if (xhr.status === 200) {
                _createRoom(JSON.parse(xhr.responseText));
            }
            return xhr.status;
        });
    },

    _requestAllRooms : function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "valid/request:ALL", true);
        xhr.send();
        xhr.onreadystatechange = function () {
            return xhr;
        };
    },

    _loadAllRooms : function () {
        var xhr = _requestAllRooms();
        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText);
        }
        return xhr.status;
    }
};
