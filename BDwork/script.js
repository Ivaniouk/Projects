"use strict ";

function mySQLget(id, type) {
    var requestedObject =  JSON.parse(/*SELECT id FROM type*/);
    if(requestedObject.Code === 400 || requestedObject.Code === 404) { // requestedObject // requestedObject.Code instanceOf(Error)
        throw new Error("ID");
    }
   return requestedObject;
}

function mySQLpost(type, id, name) {
    var sql = "UPDATE " + type + "SET name=" + name + "WHERE id=" + id;
    if(sql.Code === 400 || sql.Code === 404) { // requestedObject // requestedObject.Code
        throw new Error("Bad Request");
    }
}
/**
 * subjects classes classroom
 */
function schoolRoom(id, type) {
    try {
        var classroom = mySQLget(type, id); //потрібен зайвий if щоб трай не виконався? чи помилка встигне його зупинити?
        this.id = classroom.id;
        this.name = classroom.name;
        this.type = type;
    } catch (error) {
        if (error.property === 'ID') {
            alert("Сlassroom " +  id + " does not exist");
        } else {
            throw error; //unknown error
        }
    }
}

schoolRoom.prototype.mySQLpost = function (newName) {
    try {
        var sql = mySQLpost(this.type, this.id, newName);
        alert("Classroom " + this.id + " changed successfully");
    } catch (error) {
        if (error.property === 'Bad Request') {
            alert("Classroom " + this.id + " failed update");
        } else {
            throw error; //unknown error
        }
    }
}
//********************************************************************* //