"use strict";
function LogServerFailures(xhr) {
    //save response text + time
    return xhr.status;
}

/** ****************CLASS*************************/
function C_SchoolRoomManager(url) {
    this._url = url;
    this._cashPool = {};
    return this;
}

/** ****************METHODS*************************/
C_SchoolRoomManager.prototype = {

    getInstance : function (Object) {
        var Instance = _cashPool(Object.id);
        if (!Instance) {
            Instance = _loadInstanceById(Object.id);
            if (Instance !== 400) {
                this._cashPool[Object.id] = Instance;
            }
        }
        return Instance;
    },

    getAll : function () {
        _loadAllInstances();
    },

    createInstance : function (name) {
        var obj = _loadInstanceByName(name);
        if (obj.id) {
            return obj;
        }

    },

    _createLoadedInstance: function (Object) {
        return new C_SchoolRoom(Object.id, Object.name);
    },
    //TODO we need a timer for a request
    removeInstance : function (id) {
        var url = this._url;
        return new Promise(function (_removeFromPool, LogServerFailures) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url + "valid/DELETE:" + id, false);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            if (xhr.status === 200) {
                _removeFromPool(id);
            } else {
                LogServerFailures(xhr);
            }
            xhr.send("");
        });
    },

    //TODO we need a timer for a request
    _loadInstanceById : function (id) {
        var url = this._url;
        return new Promise(function (_createLoadedInstance, LogServerFailures) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + "request" + id, false);
            xhr.send();
            if (xhr.status === 200) {
                _createLoadedInstance(JSON.parse(xhr.responseText));
            } else {
                LogServerFailures(xhr);
            }
        });
    },

    _loadInstanceByName : function (name) {
        var url = this._url;
        return new Promise(function (_createLoadedInstance, LogServerFailures) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + "request" + name, false);
            xhr.send();
            if (xhr.status === 200) {
                _createLoadedInstance(JSON.parse(xhr.responseText));
            } else {
                LogServerFailures(xhr);
            }
        });
    },

    _loadAllInstances : function () {
        var url = this._url;
        return new Promise(function (_createLoadedInstance, LogServerFailures) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + "request:ALL", false);
            xhr.send();
            if (xhr.status === 200) {
                //return JSON.parse(xhr.responseText);
            } else {
                LogServerFailures(xhr);
            }
        });

    },
    //TODO Wrong method
    _saveToOuterBase : function (Object) {
        this._cashPool[Object.id] = _createLoadedInstance(Object);
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
    //TODO Remove object from pool
    _removeFromPool : function (id) {

    }
};
