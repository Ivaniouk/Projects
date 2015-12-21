"use strict";
function LogServerFailures(xhr) {
    //save response text + time
    return xhr.status; //return null?
}

/** ****************CLASS*************************/
function C_SchoolRoomManager(url) {
    this._url = url;
    this._cashPool = {};
    return this;
}

/** ****************METHODS*************************/

C_SchoolRoomManager.prototype = {

    createRoom : function (name) {
        return _loadInstanceByName(name).then(_createInsctance, LogServerFailures);
    },

    _createInsctance : function (object) {
        return new C_SchoolRoom(object.id, object.name);
    },
    /** RETURNS ROOM WITH ID*/
    _loadInstanceByName : function (name) {
        var url = this._url;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + "/request:" + name, false);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.status);
                }
            };
            xhr.onerror = function () {
                reject(xhr.status);
            };
            xhr.send();
        });
    }
};