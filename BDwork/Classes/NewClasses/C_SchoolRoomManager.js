"use strict";

/** ****************CLASS*************************/
function C_SchoolRoomManager() {

    this._cashPool = {};

    return this;
}

/** ****************METHODS*************************/

C_SchoolRoomManager.prototype = {
    getRoom : function (roomObject, trigger) {
        var roomInstance;
        if (trigger) {
            roomInstance = _createRoom(roomObject);
        } else {
            roomInstance = _cashPool(roomObject.roomId);
            if (!roomInstance) {
                roomInstance = _loadRoom(roomObject.roomId);
            }
        }
        return roomInstance;
    },

    _createRoom : function (roomObject) {
        return new C_SchoolRoom(roomObject.roomId, roomObject.roomName);
    },

    _request : function (roomId, loadAll) {
        var url = "valid/request:" + roomId;
        if (loadAll) {
            url = "valid/request:ALL";
        }
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            return xhr;
        };
    },

    _loadRoom : function (roomId) {
        return new Promise(function(_createRoom) {
            var xhr = _request(roomId);
            if (xhr.status === 200) {
                _createRoom(JSON.parse(xhr.responseText));
            }
            return xhr.status + " " + xhr.responseText;
        });
    },

    _loadAllRooms : function () {
        var xhr = _request("", true);
        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText);
        }
        return xhr.status + " " + xhr.responseText;
    }
};
