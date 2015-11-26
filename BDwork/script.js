"use strict";

function mySQLget(id, type) {
    var requestedObject =  JSON.parse(/*SELECT id FROM type*/);
    if(requestedObject.Code === 400 || requestedObject.Code === 404) { // requestedObject // requestedObject.Code instanceOf(Error)
        throw new Error("ID");
    }
    return requestedObject;
}

function mySQLpost(type, id, name) {
    var sql = "UPDATE " + type + " SET name=" + name + " WHERE id=" + id;
    if(sql.Code === 400 || sql.Code === 404) { // requestedObject // requestedObject.Code
        throw new Error("Bad Request");
    }
}

function mySQLdel(type, id) {
    var sql = "DELETE FROM " + type + " WHERE id=" + id;
    if(sql.Code === 400 || sql.Code === 404) { // requestedObject // requestedObject.Code
        throw new Error("Bad Request");
    }
}



function baseClass(id, type, name) {
    try {
        if (name === undefined) {
            var requestedObject = mySQLget(type, id);
            this.id = requestedObject.id;
            this.type = type;
            this.name = requestedObject.name;
        } else {
            this.id = id;
            this.type = type;
            this.name = name;
        }
    } catch (error) {
        if (error.property === 'ID') {
            alert("Does  not exist");
        } else {
            throw error; //unknown error
        }
    }
}

baseClass.prototype.mySQLpost = function (newName) {
    try {
        mySQLpost(this.type, this.id, newName);
        alert("Changed successfully");
    } catch (error) {
        if (error.property === 'Bad Request') {
            alert("Failed update");
        } else {
            throw error; //unknown error
        }
    }
}

baseClass.prototype.mySQLdel = function () {
    try {
        mySQLdel(this.type, this.id);
        alert("Deleted");
    } catch (error) {
        alert("Bad Request");
    }
}

/*******************************classroom************************************************ */
function schoolRoom(id, type, name) {
    baseClass.apply(this, arguments);
}

schoolRoom.prototype = Object.create(baseClass.prototype);
schoolRoom.prototype.constructor = schoolRoom;

/*******************************subject************************************************ */
function subject(id, type, name) {
    baseClass.apply(this, arguments);
}

subject.prototype = Object.create(baseClass.prototype);
subject.prototype.constructor = subject;

/*******************************schoolClasses************************************************ */
function schoolClasses(id, type, name) {
    baseClass.apply(this, arguments);
}

schoolClasses.prototype = Object.create(baseClass.prototype);
schoolClasses.prototype.constructor = schoolClasses;





























