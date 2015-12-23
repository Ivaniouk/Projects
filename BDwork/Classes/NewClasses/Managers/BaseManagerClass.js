"use strict";
function LogServerFailures(xhr) {
    //save response text + time
    return xhr.status; //return null?
}

/** ****************CLASS*************************/
function BaseManagerClass(url) {
    this._url = url;
    this._cashPool = {};
    return this;
}

/** ****************METHODS*************************/

BaseManagerClass.prototype = {
    /** Search Instance in the _cashPool -> looking on the server -> saves loaded Room to the _cashPool*/
    getInstance : function (object) { //only by ID? Or we need one more function GetRoom by name?
        var Instance = _cashPool(object.id);
        if (!Instance) {
            Instance = _loadInstanceById(object.id);
            if (Instance !== 400) { // add network errors status
                this._cashPool[object.id] = Instance;
            }
        }
        return Instance;
    },

    /** Returns promise to create a room with listeners */
    createInstance : function (name) {
        return _saveInstanceByName(name);
    },
    /** Returns promise to delete a room*/
    deleteInstance : function (object) {
        return _deleteFromServerBase(object.id);
    },
    /** Returns promise to load all rooms*/
    getAllInstances : function () {
        return _loadAllInstances();
    },
    /** Returns promise to change a room*/
    changeInstance : function (object) {
        return _changeObjectRequest(object);
    },
    /** rewrites room in the pool*/
    _changeObjectInPool : function (object) {
        this._cashPool[object.id] = object;
    },
    /**POST. Sends objest to server -> Server looks for instance with this ID -> server changes object in DB -> server sends back the object*/
    _changeObjectRequest : function (object) {
        var url = this._url;
        return new Promise(function (_changeObjectInPool, LogServerFailures) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url + "/request/change:" + object, false);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    _changeObjectInPool(JSON.parse(xhr.responseText));
                } else {
                    LogServerFailures(xhr.status);
                }
            };
            xhr.onerror = function () {
                LogServerFailures(xhr.status);
            };
            xhr.send(JSON.stringify(object));
        });
    },

    /** Kills instance in the pool*/
    _deleteFromPool : function (id) {
        delete this._cashPool[id]; // ≥ тут € забув €к ти по€снював про видаленн€ (дуже п≥ч€льний смайл)
    },
    /**POST. Sends ID to server -> Server looks for instance with this ID -> server returns result*/
    _deleteFromServerBase : function (id) {
        var url = this._url;
        return new Promise(function (_deleteFromPool, LogServerFailures) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url + "/request:" + id, false);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    _deleteFromPool(id);
                } else {
                    LogServerFailures(xhr.status);
                }
            };
            xhr.onerror = function () {
                LogServerFailures(xhr.status);
            };
            xhr.send(""); // Empty POST for deletion -> то ¬алентин так сказав € н≥ при чому! =)
        });
    },

    /** Creates new instance -> adds it to the _cashPool -> returns instance */
    _createInstance : function (object) {
        var instance = new C_SchoolRoom(object.id, object.name);
        this._cashPool[object.id] = instance;
        return instance;
    },
    /** copy all instances from server to _cashPool*/
    _fillPool : function (object) {
        for (var attr in object) {
            if (object.hasOwnProperty(attr)) {
                this._cashPool[attr] = object[attr]; //this._cashPool[object.id] = object[attr] ???
            }
        }
    },

    /**GET. Request all instance on the server -> server sends back all instances */
    _loadAllInstances : function () {
        var url = this._url;
        return new Promise(function (_fillPool, LogServerFailures) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url + "request", false);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    _fillPool(JSON.parse(xhr.responseText));
                } else {
                    LogServerFailures(xhr.status);
                }
            };
            xhr.onerror = function () {
                LogServerFailures(xhr.status);
            };
            xhr.send();
        });
    },

    /** POST. Sends name to server -> Server saves adding ID -> server returns instance object with ID*/
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
    /** GET. Sends ID to server -> Server looks for instance with this ID -> server returns result*/
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