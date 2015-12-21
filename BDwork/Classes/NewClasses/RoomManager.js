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
    /** Search Instance in the _cashPool -> looking in the server -> saves loaded Room to the _cashPool*/
    getRoom : function (object) { //only by ID? Or we need one more function GetRoom by name?
        var Instance = _cashPool(object.id);
        if (!Instance) {
            Instance = _loadInstanceById(object.id);
            if (Instance !== 400) {
                this._cashPool[object.id] = Instance;
            }
        }
        return Instance;
    },

    /** Returns promise to create a room with listeners */
    createRoom : function (name) {
        return _saveInstanceByName(name);
    },
    /** Creates new room -> adds it to the _cashPool -> returns Room instance */
    _createInstance : function (object) {
        var instance = new C_SchoolRoom(object.id, object.name);
        this._cashPool[object.id] = instance;
        return instance;
    },
    /** POST. Sends name to server -> Server saves adding ID -> server returns Room object with ID*/
    _saveInstanceByName : function (name) {
        var url = this._url;
        return new Promise(function (_createInstance, LogServerFailures) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url + "/request:" + name, false);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    _createInstance(JSON.parse(xhr.responseText));
                } else {
                    LogServerFailures(xhr.status);
                }
            };
            xhr.onerror = function () {
                LogServerFailures(xhr.status);
            };
            xhr.send(JSON.stringify(name));
        });
    },
    /** GET. Sends ID to server -> Server looks for instance with this ID -> server returns result*/ //попередити хлопців шоб слали 400 якшо не нашли в базі ID
    _loadInstanceById : function (id) {
        var url = this._url;
        return new Promise(function (_createInstance, LogServerFailures) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + "request" + id, false);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    _createInstance(JSON.parse(xhr.responseText));
                } else {
                    LogServerFailures(xhr.status);
                }
            };
            xhr.onerror = function () {
                LogServerFailures(xhr.status);
            };
            xhr.send();
        });
    }
};