"use strict";

/** ****************CLASS*************************/
function C_SchoolRoomManager(OuterArray) {

    this._cashPool = {};

    return this;
}

/** ****************METHODS*************************/

C_SchoolRoomManager.prototype = {
    _getRoomInstance : function (roomId, roomName) {
        var instance = _searchCashPool(roomId);
        if (!instance) {
            instance = new C_SchoolRoom(roomId, roomName);
            this._cashPool[roomId] = instance;
        }
        return instance;
    },

    _searchCashPool : function () {
        return this._cashPool(roomId);
    },

    _getRoomFromOuterBase : function () {

    }
};
