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
        } else {
            roomInstance = _cashPool(roomObject.roomId);
            if (!roomInstance) {
                roomInstance = _loadRoom(roomObject.roomId);
                if (roomInstance === 200) {
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
        return new Promise(function (_createRoom) {
            var xhr = _requestAllRooms();
            if (xhr.status === 200) {
               return JSON.parse(xhr.responseText);
            }
            return xhr.status;
        });
    },

    _saveToOuterBase : function (roomObject) {
        this._cashPool[roomObject.roomId] = _createRoom(roomObject);
        var jsonRoom = JSON.stringify(roomObject);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'valid/POST', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (this.readyState !== 200) {
                return xhr.status;
            }
        };
        xhr.send(jsonRoom);
    }
};
