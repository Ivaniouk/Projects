'use strict';

function ManagerService() {
    this.sayHello = function (name) {
        return 'Привет тебе ' + name;
    };


}

angular
    .service('ManagerService', ManagerService);








function SchoolRoomManager(ManagerService, $http, $q, $schoolRoom) {
    var thisClass = this;
    thisClass._url = $http;
    thisClass._cashPool = {};
    /** METHODS */
    /** Search Instance in the _cashPool -> looking on the server -> saves loaded Room to the _cashPool*/
    thisClass.getInstance = function (object) {
        var Instance = thisClass._cashPool(object.id);
        if (!Instance) {
            Instance = ManagerService._loadInstanceById(object.id);
            if (Instance !== 400) { // add network errors status
                thisClass._cashPool[object.id] = Instance;
            }
        }
        return Instance;
    };
    /** Returns promise to create a room with listeners */
    thisClass.createInstance = function (name) {
        return ManagerService._saveInstanceByName(name);
    };
    /** Returns promise to delete a room*/
    thisClass.deleteInstance = function (object) {
        return ManagerService._deleteFromServerBase(object.id);
    };
    /** Returns promise to load all rooms*/
    thisClass.getAllInstances = function () {
        return ManagerService._loadAllInstances();
    };
    /** Returns promise to change a room*/
    thisClass.changeInstance = function (object) {
        return ManagerService._changeObjectRequest(object);
    };
    /** Creates new instance -> adds it to the _cashPool -> returns instance */
    thisClass._createInstance = function (object) {
        var instance = new SchoolClass(object);
        thisClass._cashPool[object.id] = instance;
        return instance;
    };

    return thisClass;
}

angular
    .module('app', [ManagerService, $http, $q, $schoolRoom]) // do we need [] ?
    .factory('SchoolRoomManager', SchoolRoomManager);