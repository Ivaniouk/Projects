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
/**
 * subjects classes classroom
 */
function schoolRoom(id, type, name) {
    try {
        if (name === undefined) {
            var classroom = mySQLget(type, id);
            this.id = classroom.id;
            this.type = type;
            this.name = classroom.name;
        } else {
            this.id = id;
            this.type = type;
            this.name = name;
        }
    } catch (error) {
        if (error.property === 'ID') {
            alert("Des not exist");
        } else {
            throw error; //unknown error
        }
    }
}

schoolRoom.prototype.mySQLpost = function (newName) {
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

schoolRoom.prototype.mySQLdel = function () {
    try {
        mySQLdel(this.type, this.id);
        alert("Deleted");
    } catch (error) {
        alert("Bad Request");
    }
}
//********************************************************************* //