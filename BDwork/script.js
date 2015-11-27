"use strict";

function mySQLget(type, id) {
    var requestedObject =  JSON.parse(/*SELECT id FROM type*/);
    if (requestedObject.Code === 400 || requestedObject.Code === 404) { // requestedObject // requestedObject.Code instanceOf(Error)
        throw new Error("ID");
    }
    return requestedObject;
}

function mySQLgetTeachers(type, firstName,  middleName, lastName) {
    var requestedObject =  JSON.parse(/*request by names*/);
    if (requestedObject.Code === 400 || requestedObject.Code === 404) {
        throw new Error("ID");
    }
    return requestedObject;
}

function BaseClass(id, type, name) {
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

BaseClass.prototype.post = function (newName) {
    try {
        var sql = "UPDATE " + this.type + " SET name=" + newName + " WHERE id=" + this.id;
        if (sql.Code === 400 || sql.Code === 404) { // requestedObject // requestedObject.Code
            throw new Error("Bad Request");
        }
        alert("Changed successfully");
    } catch (error) {
        if (error.property === 'Bad Request') {
            alert("Failed update");
        } else {
            throw error; //unknown error
        }
    }
};

BaseClass.prototype.delete = function () {
    try {
        var sql = "DELETE FROM " + this.type + " WHERE id=" + this.id;
        if (sql.Code === 400 || sql.Code === 404) { // requestedObject // requestedObject.Code
            throw new Error("Bad Request");
        }
        alert("Deleted");
    } catch (error) {
        alert("Bad Request");
    }
};

BaseClass.prototype.put = function () {
    try {
        var sql = "INSERT INTO " + this.type + " VALUES (" + this.id + ", " + this.name + ")";
        if(sql.Code === 400 || sql.Code === 404) { //TODO WRONG CODE
            throw new Error("Bad Request");
        }
        alert("Added");
    } catch (error) {
        if (error.property === 'Bad Request') {
            alert("Failed update");
        } else {
            throw error; //unknown error
        }
    }
};

/*******************************classroom************************************************ */
function SchoolRoom(id, type, name) {
    BaseClass.apply(this, arguments);
}

SchoolRoom.prototype = Object.create(BaseClass.prototype);
SchoolRoom.prototype.constructor = schoolRoom;

/*******************************subject************************************************ */
function Subject(id, type, name) {
    BaseClass.apply(this, arguments);
}

Subject.prototype = Object.create(BaseClass.prototype);
Subject.prototype.constructor = Subject;

/*******************************schoolClasses************************************************ */
function SchoolClasses(id, type, name) {
    BaseClass.apply(this, arguments);
}

SchoolClasses.prototype = Object.create(BaseClass.prototype);
SchoolClasses.prototype.constructor = SchoolClasses;

/*******************************teacher************************************************ */

function Teacher(type, firstName, middleName, lastName, requestTrigger) {
    try {
        if (requestTrigger === undefined) {
            var requestedObject = mySQLgetTeachers(type, firstName,  middleName, lastName);
            this.type = type;
            this.firstName = requestedObject.firstName;
            this.middleName = requestedObject.middleName;
            this.lastName = requestedObject.lastName;

        } else {
            this.type = type;
            this.firstName = firstName;
            this.middleName = middleName;
            this.lastName = lastName;
        }
    } catch (error) {
        if (error.property === 'ID') {
            alert("Does  not exist");
        } else {
            throw error; //unknown error
        }
    }
}



Teacher.prototype = Object.create(BaseClass.prototype);
Teacher.prototype.constructor = Teacher;


Teacher.prototype.post = function (newName) {
    try {
        //update tacher
        if (sql.Code === 400 || sql.Code === 404) { // requestedObject // requestedObject.Code
            throw new Error("Bad Request");
        }
        alert("Changed successfully");
    } catch (error) {
        if (error.property === 'Bad Request') {
            alert("Failed update");
        } else {
            throw error; //unknown error
        }
    }
};

Teacher.prototype.delete = function () {
    try {
        //Delete by teacher name
        if (sql.Code === 400 || sql.Code === 404) { // requestedObject // requestedObject.Code
            throw new Error("Bad Request");
        }
        alert("Deleted");
    } catch (error) {
        alert("Bad Request");
    }
};

Teacher.prototype.put = function () {
    try {
        //put new teacher method
        if(sql.Code === 400 || sql.Code === 404) { //TODO WRONG CODE
            throw new Error("Bad Request");
        }
        alert("Added");
    } catch (error) {
        if (error.property === 'Bad Request') {
            alert("Failed to create");
        } else {
            throw error; //unknown error
        }
    }
};

/*******************************lesson_week************************************************ */

function LessonWeek(id, type, name, number, requestTrigger) {
    try {
        if (requestTrigger === undefined) {
            var requestedObject = mySQLget(type, id);
            this.id = requestedObject.id;
            this.type = type;
            this.name = requestedObject.name;
            this.number = requestedObject.number;
        } else {
            this.id = id;
            this.type = type;
            this.name = name;
            this.number = number;
        }
    } catch (error) {
        if (error.property === 'ID') {
            alert("Does  not exist");
        } else {
            throw error; //unknown error
        }
    }
}

































