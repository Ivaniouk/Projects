"use strict";

/** ****************CLASS*************************/
function C_SchoolRoomManager() {
    this._cashPool = {};
    return this;
}

/** ****************METHODS*************************/

C_SchoolRoomManager.prototype = {
    getOrCreateRoom : function (Object, trigger) {
        var roomInstance;
        if (trigger) {
            roomInstance = _createRoom(Object);
        } else {
            roomInstance = _cashPool(Object.id);
            if (!roomInstance) {
                roomInstance = _loadRoom(Object.id);
                if (roomInstance === 200) {
                    this._cashPool[Object.id] = instance;
                }
            }
        }
        return roomInstance;
    },

    _createRoom : function (Object) {
        return new C_SchoolRoom(Object.id, Object.name);
    },

    _requestRoom : function (id) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "valid/request:" + id, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            return xhr;
        };
    },

    _loadRoom : function (id) {
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
