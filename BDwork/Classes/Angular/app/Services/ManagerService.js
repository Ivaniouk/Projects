'use strict';

function ManagerService() {
    /** POST. Sends name to server -> Server saves adding ID -> server returns instance object with ID*/
    this.createInstanceByName = function (name, $http, cashPool) {
        $http.post("'api.php?controller=school_rooms&action=item&name=" + name) //wrong address
            .then(function (responce) {
                if (responce.status >= 200 && responce.status < 300) { //JSON.parse(responce)
                    var instance = new SchoolRoomClass(responce.data);
                    cashPool[responce.data.id] = instance;
                    return instance;
                }

                return response.status; //$q.reject(response.status) ??
            }); //do we nee new then?
    };
    /**DELETE. Sends ID to server -> Server looks for instance with this ID -> server returns result*/
    this.deleteFromServerBase = function (id, $http, cashPool) {
        $http.delete("'api.php?controller=school_rooms&action=item&name=" + id) //wrong address
            .then(function (responce) {
                if (responce.status >= 200 && responce.status < 300) { //JSON.parse(responce)
                    delete cashPool[id];
                }

                return response.status; //$q.reject(response.status) ??
            }); //do we nee new then?
    };
    /** copy all instances from server to cashPool*/
    this.fillPool = function (object, cashPool) {
        for (var attr in object) {
            if (object.hasOwnProperty(attr)) {
                cashPool[object.id] = object[attr];
            }
        }
    };
    /**GET. Request all instance on the server -> server sends back all instances */
    this.loadAllInstances = function ($http, cashPool) {
        $http.get("'api.php?controller=school_rooms&action=item&name=") //wrong address
            .then(function (responce) {
                if (responce.status >= 200 && responce.status < 300) { //JSON.parse(responce)
                    this._fillPool(responce.data, cashPool);
                }

                return response.status; //$q.reject(response.status) ??
            }); //do we nee new then?
    };
    /** GET. Sends ID to server -> Server looks for instance with this ID -> server returns result*/
    this.loadInstanceById = function (id, $http, cashPool) {
        $http.get("'api.php?controller=school_rooms&action=item&id=" + id) //wrong address
            .then(function (responce) {
                if (responce.status >= 200 && responce.status < 300) { //JSON.parse(responce)
                    var instance = new SchoolRoomClass(responce.data);
                    cashPool[responce.data.id] = instance;
                    return instance;
                }

                return response.status; //$q.reject(response.status) ??
            }); //do we nee new then?
    };
    /**POST. Sends object to server -> Server looks for instance with this ID -> server changes object in DB -> server sends back the object*/
    this.changeObjectRequest = function (object, $http, cashPool) {
        $http.post("'api.php?controller=school_rooms&action=item&id=" + object.id, JSON.stringify(object))//wrong address, correct JSON.stringify(object)?
            .then(function (responce) {
                if (responce.status >= 200 && responce.status < 300) { //JSON.parse(responce)
                    cashPool[responce.data.id] = responce.data;
                }

                return response.status; //$q.reject(response.status) ??
            }); //do we nee new then?
    };

}