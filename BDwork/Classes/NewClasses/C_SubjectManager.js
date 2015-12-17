"use strict";
/** ****************CLASS*************************/
function C_SubjectManager() {
    this._cashPool = {};
    return this;
}
/** ****************METHODS*************************/
C_SubjectManager.prototype = {
    getOrCreateRoom : function (Object, trigger) {
        var subjectInstance;
        if (trigger) {
            subjectInstance = _createInstance(Object);
        } else {
            subjectInstance = _cashPool(Object.Id);
            if (!subjectInstance) {
                subjectInstance = _loadSubject(Object.Id);
                if (subjectInstance === 200) {
                    this._cashPool[Object.Id] = subjectInstance;
                }
            }
        }
        return subjectInstance;
    },

    _createInstance : function (Object) {
        return new C_Subject(Object.id, Object.name);
    },

    _requestSubject : function (id) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "valid/request:" + id, true);
        xhr.send();
        xhr.onreadystatechange = function () {
            return xhr;
        };
    },

    _loadSubject : function (id) {
        return new Promise(function (_createInstance) {
            var xhr = _requestSubject(id);
            if (xhr.status === 200) {
                _createInstance(JSON.parse(xhr.responseText));
            }
            return xhr.status;
        });
    },

    _requestAllSubjects : function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "valid/request:ALL", true);
        xhr.send();
        xhr.onreadystatechange = function () {
            return xhr;
        };
    },

    _loadAllSubjects : function () {
        return new Promise(function () {
            var xhr = _requestAllSubjects();
            if (xhr.status === 200) {
                return JSON.parse(xhr.responseText);
            }
            return xhr.status;
        });
    },

    _saveToOuterBase : function (Object) {
        this._cashPool[Object.id] = _createInstance(Object);
        var jsonSubject = JSON.stringify(Object);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'valid/POST', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (this.readyState !== 200) {
                return xhr.status;
            }
        };
        xhr.send(jsonSubject);
    }
};