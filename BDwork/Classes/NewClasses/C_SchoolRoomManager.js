"use strict";

/** ****************CLASS*************************/
function C_SchoolRoomManager() {

    this._cashPool = {};

    return this;
}

/** ****************METHODS*************************/

C_SchoolRoomManager.prototype = {
    _getRoomInstance : function (roomId, roomName) {
        var instance = _cashPool(roomId);
        if (!instance) {
            instance = new C_SchoolRoom(roomId, roomName);
            this._cashPool[roomId] = instance;
        }
        return instance;
    },

    _searchCashPool : function () {

    },

    _getRoomFromOuterBase : function () {

    }
};
