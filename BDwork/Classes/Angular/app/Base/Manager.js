'use strict';


function SchoolRoomManager($http, $q) {
    var thisClass = this;
    thisClass.$http = $http;
    thisClass._cashPool = {};
    /** METHODS */
    /** Search Instance in the _cashPool -> looking on the server -> saves loaded Room to the _cashPool*/
    thisClass.getInstance = function (object) {
        var Instance = thisClass._cashPool(object.id);
        if (!Instance) {
            Instance = _loadInstanceById(object.id);
            if (Instance !== 400) { // add network errors status
                thisClass._cashPool[object.id] = Instance;
            }
        }
        return Instance;
    };
    /** Returns promise to create a room with listeners */
    thisClass.createInstance = function (name) {
        return _saveInstanceByName(name);
    };
    /** Returns promise to delete a room*/
    thisClass.deleteInstance = function (object) {
        return _deleteFromServerBase(object.id);
    };
    /** Returns promise to load all rooms*/
    thisClass.getAllInstances = function () {
        return _loadAllInstances();
    };
    /** Returns promise to change a room*/
    thisClass.changeInstance = function (object) {
        return _changeObjectRequest(object);
    };
    /*
    // Creates new instance -> adds it to the _cashPool -> returns instance
    thisClass._createInstance = function (object) {
        var instance = new SchoolRoomClass(object);
        thisClass._cashPool[object.id] = instance;
        return instance;
    };*/

    /** POST. Sends name to server -> Server saves adding ID -> server returns instance object with ID*/
    thisClass._saveInstanceByName = function (name) {
        $http.post("'api.php?controller=school_rooms&action=item&name=" + name)
            .then(function (responce) {
                if (responce.status >= 200 && responce.status < 300) { //JSON.parse(responce)
                    var instance = new SchoolRoomClass(responce.data);
                    thisClass._cashPool[responce.data.id] = instance;
                    return instance;
                }

                return $q.reject(response.status); //response.status
            }); //do we nee new then?
    };

    return thisClass;
}

angular
    .module('app', [$http, $q, $schoolRoom]) // do we need [] ?
    .factory('SchoolRoomManager', SchoolRoomManager);