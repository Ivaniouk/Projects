"use strict";
function LogServerFailures(xhr) {
    //save response text + time
    return xhr.status;
}

//TODO how to kill an instance?
//TODO wrong Promises
/** ****************CLASS*************************/
function C_SchoolRoomManager(url) {
    this._url = url;
    this._cashPool = {};
    return this;
}

/** ****************METHODS*************************/
C_SchoolRoomManager.prototype = {
    getInstance: function (Object) {
        var Instance = _cashPool(Object.id);
        if (!Instance) {
            Instance = _loadInstanceById(Object.id);
            if (Instance !== 400) {
                this._cashPool[Object.id] = Instance;
            }
        }
        return Instance;
    },

    createInstance: function (Object) {
        return new C_SchoolRoom(Object.id, Object.name);
    },
    /** WRONG METHOD*/
    removeInstance : function (id) {
        var url = this._url;
        return new Promise(function (_removeFromPool, LogServerFailures) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url + "valid/POST", false);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            if (xhr.status === 200) {
                _removeFromPool(id);
            } else {
                LogServerFailures(xhr);
            }
        });
    },

    //TODO we need a timer for a request
    _loadInstanceById : function (id) {
        var url = this._url;
        return new Promise(function (createInstance, LogServerFailures) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + "request" + id, false);
            xhr.send();
            if (xhr.status === 200) {
                createInstance(JSON.parse(xhr.responseText));
            } else {
                LogServerFailures(xhr);
            }
        });
    },

    _loadAllInstances : function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this._url + "request:ALL", true);
        xhr.send();
        xhr.onreadystatechange = function () {
            return JSON.parse(xhr.responseText);
        };
        return xhr.status;
    },

    _saveToOuterBase : function (Object) {
        this._cashPool[Object.id] = createInstance(Object);
        var jsonObj = JSON.stringify(Object);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", this._url + "valid/POST", true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (this.readyState !== 200) {
                return xhr.status;
            }
        };
        xhr.send(jsonObj);
    },
    //TODO Remove object from pool??
    _removeFromPool : function (id) {

    }
};
