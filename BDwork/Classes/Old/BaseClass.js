angular
    // http://www.webdeveasy.com/angularjs-data-model/
    // http://habrahabr.ru/post/225659/
    .factory('LessonWeek', ['$http', 'lessonDayManager', function($http, lessonDayManager) {
        'use strict';

        function LessonWeek(lessonWeekData)
        {
            if (lessonWeekData)
            {
                this.setData(lessonWeekData);
            }
            //что-то, что еще нужно для инициализации
        };

        LessonWeek.prototype = {
            setData: function(lessonWeekData)
            {
                angular.extend(this, lessonWeekData);
            },
            getAllLessonDays: function()
            {
                return this.lesson_days;
            },
            loadAllLessonDays: function()
            {
                var vm = this;
                return lessonDayManager.loadAllLessonDaysByWeek(this.id).then(function(lesson_days_data)
                {
                    vm.setAllLessonDays(lesson_days_data);
                });
            },
            setAllLessonDays: function(lesson_days_data)
            {
                angular.extend(this, {"lesson_days": lesson_days_data});
                return this;
            }
        };

        return LessonWeek;
    }])
    .factory('lessonWeekManager', ['$http', '$q', 'LessonWeek', function($http, $q, LessonWeek) {
        'use strict';

        var lessonWeekManager = {
            _pool: {},
            _retrieveInstance: function(lessonWeekId, lessonWeekData) {
                var instance = this._pool[lessonWeekId];
                if (instance)
                {
                    instance.setData(lessonWeekData);
                }
                else
                {
                    instance = new LessonWeek(lessonWeekData);
                    this._pool[lessonWeekId] = instance;
                }
                return instance;
            },
            _search: function(lessonWeekId) {
                return this._pool[lessonWeekId];
            },
            _load: function(lessonWeekId, deferred) {
                var scope = this;

                $http.get('api.php?controller=lesson_weeks&action=item&id=' + lessonWeekId)
                    .success(function(lessonWeekData) {
                        var lesson_week = scope._retrieveInstance(lessonWeekData.id, lessonWeekData);
                        deferred.resolve(lesson_week);
                    })
                    .error(function() {
                        deferred.reject();
                    });
            },
            //Публичные методы
            // Получение по идентификатору
            getLessonWeek: function(lessonWeekId) {
                var deferred = $q.defer();
                var lesson_week = this._search(lessonWeekId);
                if (lesson_week)
                {
                    deferred.resolve(lesson_week);
                }
                else
                {
                    this._load(lessonWeekId, deferred);
                }
                return deferred.promise;
            },
            // Получение списка
            loadAllLessonWeeks: function() {
                var deferred = $q.defer();
                var scope = this;

                $http.get('api.php?controller=lesson_weeks&action=list')
                    .success(function(lessonWeeksArray) {
                        var lesson_weeks = [];
                        lessonWeeksArray.forEach(function(lessonWeekData) {
                            var lesson_week = scope._retrieveInstance(lessonWeekData.id, lessonWeekData);
                            lesson_weeks.push(lesson_week);
                        });
                        deferred.resolve(lesson_weeks);
                    })
                    .error(function() {
                        deferred.reject();
                    });
                return deferred.promise;
            }
        };

        return lessonWeekManager;
    }])
    .factory('LessonDay', [function() {
        'use strict';

        function LessonDay(lessonDayData)
        {
            if (lessonDayData)
            {
                this.setData(lessonDayData);
            }
            //что-то, что еще нужно для инициализации
        };

        LessonDay.prototype = {
            setData: function(lessonDayData)
            {
                angular.extend(this, lessonDayData);
            },
            getLessonsByClass: function(schoolClassId)
            {

                return lessons;
            }
        };

        return LessonDay;
    }])
    .factory('lessonDayManager', ['$http', '$q', 'LessonDay', function($http, $q, LessonDay) {
        'use strict';

        var lessonDayManager = {
            _pool: {},
            _retrieveInstance: function(lessonDayId, lessonDayData) {
                var instance = this._pool[lessonDayId];
                if (instance)
                {
                    instance.setData(lessonDayData);
                }
                else
                {
                    instance = new LessonDay(lessonDayData);
                    this._pool[lessonDayId] = instance;
                }
                return instance;
            },
            _search: function(lessonDayId) {
                return this._pool[lessonDayId];
            },
            _load: function(lessonDayId, deferred) {
                var scope = this;

                $http.get('api.php?controller=lesson_days&action=item&id=' + lessonDayId)
                    .success(function(lessonDayData) {
                        var lesson_day = scope._retrieveInstance(lessonDayData.id, lessonDayData);
                        deferred.resolve(lesson_day);
                    })
                    .error(function() {
                        deferred.reject();
                    });
            },
            //Публичные методы
            // Получение по идентификатору
            getLessonDay: function(lessonDayId) {
                var deferred = $q.defer();
                var lesson_day = this._search(lessonDayId);
                if (lesson_day)
                {
                    deferred.resolve(lesson_day);
                }
                else
                {
                    this._load(lessonDayId, deferred);
                }
                return deferred.promise;
            },
            // Дні певного тиждня
            loadAllLessonDaysByWeek: function(lessonWeekId) {
                // FIXME: терба нормальний запит
                return this.loadAllLessonDays();
            },
            // Получение списка
            loadAllLessonDays: function() {
                var deferred = $q.defer();
                var scope = this;

                $http.get('api.php?controller=lesson_days&action=list')
                    .success(function(lessonDaysArray) {
                        var lesson_days = [];
                        lessonDaysArray.forEach(function(lessonDayData) {
                            var lesson_day = scope._retrieveInstance(lessonDayData.id, lessonDayData);
                            lesson_days.push(lesson_day);
                        });
                        deferred.resolve(lesson_days);
                    })
                    .error(function() {
                        deferred.reject();
                    });
                return deferred.promise;
            }
        };

        return lessonDayManager;
    }])
    .factory('Lesson', ['lessonDayManager', 'schoolClassManager', 'subjectManager', 'schoolRoomManager', 'teacherManager', function(lessonDayManager, schoolClassManager, subjectManager, schoolRoomManager, teacherManager) {
        'use strict';

        function Lesson(lessonData)
        {
            if (lessonData)
            {
                this.setData(lessonData);
            }
            //что-то, что еще нужно для инициализации
        };

        Lesson.prototype = {
            id: 0,
            lesson_day_id: 0,
            lesson_day: {},
            lesson_number_id: 0,
            school_class_id: 0,
            school_class: {},
            subject_id: 0,
            subject: {},
            school_room_id: 0,
            school_room: {},
            teacher_id: 0,
            teacher: {},
            setData: function(lessonData)
            {
                angular.extend(this, lessonData);
            },
            loadRelations: function()
            {
                var vm = this;
                if (this.lesson_day_id > 0)
                {
                    lessonDayManager.getLessonDay(this.lesson_day_id).then(function(relationData)
                    {
                        vm.lesson_day = relationData;
                    });
                }
                if (this.school_class_id > 0)
                {
                    schoolClassManager.getSchoolClass(this.school_class_id).then(function(relationData)
                    {
                        vm.school_class = relationData;
                    });
                }
                if (this.subject_id > 0)
                {
                    subjectManager.getSubject(this.subject_id).then(function(relationData)
                    {
                        vm.subject = relationData;
                    });
                }
                if (this.school_room_id > 0)
                {
                    schoolRoomManager.getSchoolRoom(this.school_room_id).then(function(relationData)
                    {
                        vm.school_room = relationData;
                    });
                }
                if (this.teacher_id > 0)
                {
                    teacherManager.getTeacher(this.teacher_id).then(function(relationData)
                    {
                        vm.teacher = relationData;
                    });
                }
            }
        };

        return Lesson;
    }])
    .factory('lessonManager', ['$http', '$q', 'Lesson', function($http, $q, Lesson) {
        'use strict';

        var lessonManager = {
            _pool: {},
            _retrieveInstance: function(lessonId, lessonData) {
                var instance = this._pool[lessonId];
                if (instance)
                {
                    instance.setData(lessonData);
                }
                else
                {
                    instance = new Lesson(lessonData);
                    this._pool[lessonId] = instance;
                }
                return instance;
            },
            _search: function(lessonId) {
                return this._pool[lessonId];
            },
            _load: function(lessonId, deferred) {
                var scope = this;

                $http.get('api.php?controller=lessons&action=item&id=' + lessonId)
                    .success(function(lessonData) {
                        var lesson = scope._retrieveInstance(lessonData.id, lessonData);
                        deferred.resolve(lesson);
                    })
                    .error(function() {
                        deferred.reject();
                    });
            },
            //Публичные методы
//			// Получение по идентификатору
//			getLesson: function(lessonId) {
//				var deferred = $q.defer();
//				var lesson = this._search(lessonId);
//				if (lesson)
//				{
//					deferred.resolve(lesson);
//				}
//				else
//				{
//					this._load(lessonId, deferred);
//				}
//				return deferred.promise;
//			},
            // Список уроків по предмету для яких розставлені дні
            loadTeachersBySubject: function(subject_id) {
                var deferred = $q.defer();
                var scope = this;

                $http.get('api.php?controller=lessons&action=by_subject&subject_id=' + subject_id)
                    .success(function(lessonsArray) {
                        var lessons = [];
                        lessonsArray.forEach(function(lessonData) {
                            var lesson = scope._retrieveInstance(lessonData.id, lessonData);
                            lessons.push(lesson);
                        });
                        deferred.resolve(lessons);
                    })
                    .error(function() {
                        deferred.reject();
                    });
                return deferred.promise;
            },
//			// Не приатачені уроки
//			loadAllUnattachedLessonByClass: function(schoolClassId) {
//				// FIXME: терба нормальний запит
//
//				var deferred = $q.defer();
//				var scope = this;
//
//				$http.get('api.php?controller=lessons&action=unattached&school_class_id=' + schoolClassId)
//						.success(function(lessonDaysArray) {
//							var lesson_days = [];
//							lessonDaysArray.forEach(function(lessonDayData) {
//								var lesson_day = scope._retrieveInstance(lessonDayData.id, lessonDayData);
//								lesson_days.push(lesson_day);
//							});
//							deferred.resolve(lesson_days);
//						})
//						.error(function() {
//							deferred.reject();
//						});
//				return deferred.promise;
//			},
            // Получение списка
            loadAllLesson: function($params) {
                var deferred = $q.defer();
                var scope = this;

                $http.get('api.php?controller=lessons&action=list', {params: $params})
                    .success(function(lessonsArray) {
                        var lessons = [];
                        lessonsArray.forEach(function(lessonData) {
                            var lesson = scope._retrieveInstance(lessonData.id, lessonData);
                            lessons.push(lesson);
                        });
                        deferred.resolve(lessons);
                    })
                    .error(function() {
                        deferred.reject();
                    });
                return deferred.promise;
            }
        };

        return lessonManager;
    }])
    .factory('SchoolClass', [function() {
        'use strict';

        function SchoolClass(schoolClassData)
        {
            if (schoolClassData)
            {
                this.setData(schoolClassData);
            }
            //что-то, что еще нужно для инициализации
        };

        SchoolClass.prototype = {
            setData: function(schoolClassData)
            {
                angular.extend(this, schoolClassData);
            }
        };

        return SchoolClass;
    }])
    .factory('schoolClassManager', ['$http', '$q', 'SchoolClass', function($http, $q, SchoolClass) {
        'use strict';

        var schoolClassManager = {
            _pool: {},
            _retrieveInstance: function(schoolClassId, schoolClassData) {
                var instance = this._pool[schoolClassId];
                if (instance)
                {
                    instance.setData(schoolClassData);
                }
                else
                {
                    instance = new SchoolClass(schoolClassData);
                    this._pool[schoolClassId] = instance;
                }
                return instance;
            },
            _search: function(schoolClassId) {
                return this._pool[schoolClassId];
            },
            _load: function(schoolClassId, deferred) {
                var scope = this;

                $http.get('api.php?controller=school_classses&action=item&id=' + schoolClassId)
                    .success(function(schoolClassData) {
                        var schoolClass = scope._retrieveInstance(schoolClassData.id, schoolClassData);
                        deferred.resolve(schoolClass);
                    })
                    .error(function() {
                        deferred.reject();
                    });
            },
            //Публичные методы
            // Получение по идентификатору
            getSchoolClass: function(schoolClassId) {
                var deferred = $q.defer();
                var schoolClass = this._search(schoolClassId);
                if (schoolClass)
                {
                    deferred.resolve(schoolClass);
                }
                else
                {
                    this._load(schoolClassId, deferred);
                }
                return deferred.promise;
            },
            // Получение списка
            loadAllClasses: function() {
                var deferred = $q.defer();
                var scope = this;

                $http.get('api.php?controller=school_classses&action=list')
                    .success(function(schoolClassesArray) {
                        var schoolClasss = [];
                        schoolClassesArray.forEach(function(schoolClassData) {
                            var schoolClass = scope._retrieveInstance(schoolClassData.id, schoolClassData);
                            schoolClasss.push(schoolClass);
                        });
                        deferred.resolve(schoolClasss);
                    })
                    .error(function() {
                        deferred.reject();
                    });
                return deferred.promise;
            }
        };

        return schoolClassManager;
    }])
    .factory('Subject', [function() {
        'use strict';

        function Subject(subjectData)
        {
            if (subjectData)
            {
                this.setData(subjectData);
            }
            //что-то, что еще нужно для инициализации
        };

        Subject.prototype = {
            setData: function(subjectData)
            {
                angular.extend(this, subjectData);
            }
        };

        return Subject;
    }])
    .factory('subjectManager', ['$http', '$q', 'Subject', function($http, $q, Subject) {
        'use strict';

        var subjectManager = {
            _pool: {},
            _retrieveInstance: function(subjectId, subjectData) {
                var instance = this._pool[subjectId];
                if (instance)
                {
                    instance.setData(subjectData);
                }
                else
                {
                    instance = new Subject(subjectData);
                    this._pool[subjectId] = instance;
                }
                return instance;
            },
            _search: function(subjectId) {
                return this._pool[subjectId];
            },
            _load: function(subjectId, deferred) {
                var scope = this;

                $http.get('api.php?controller=subjects&action=item&id=' + subjectId)
                    .success(function(subjectIdData) {
                        var subject = scope._retrieveInstance(subjectIdData.id, subjectIdData);
                        deferred.resolve(subject);
                    })
                    .error(function() {
                        deferred.reject();
                    });
            },
            //Публичные методы
            // Получение по идентификатору
            getSubject: function(subjectId) {
                var deferred = $q.defer();
                var subject = this._search(subjectId);
                if (subject)
                {
                    deferred.resolve(subject);
                }
                else
                {
                    this._load(subjectId, deferred);
                }
                return deferred.promise;
            },
            // Получение списка
            loadAllSubjects: function() {
                var deferred = $q.defer();
                var scope = this;

                $http.get('api.php?controller=subjects&action=list')
                    .success(function(subjectsArray) {
                        var subjects = [];
                        subjectsArray.forEach(function(subjectData) {
                            var subject = scope._retrieveInstance(subjectData.id, subjectData);
                            subjects.push(subject);
                        });
                        deferred.resolve(subjects);
                    })
                    .error(function() {
                        deferred.reject();
                    });
                return deferred.promise;
            }
        };

        return subjectManager;
    }])
    .factory('SchoolRoom', [function() {
        'use strict';

        function SchoolRoom(schoolRoomData)
        {
            if (schoolRoomData)
            {
                this.setData(schoolRoomData);
            }
            //что-то, что еще нужно для инициализации
        };

        SchoolRoom.prototype = {
            setData: function(schoolRoomData)
            {
                angular.extend(this, schoolRoomData);
            }
        };

        return SchoolRoom;
    }])
    .factory('schoolRoomManager', ['$http', '$q', 'SchoolRoom', function($http, $q, SchoolRoom) {
        'use strict';

        var schoolRoomManager = {
            _pool: {},
            _retrieveInstance: function(schoolRoomId, schoolRoomData) {
                var instance = this._pool[schoolRoomId];
                if (instance)
                {
                    instance.setData(schoolRoomData);
                }
                else
                {
                    instance = new SchoolRoom(schoolRoomData);
                    this._pool[schoolRoomId] = instance;
                }
                return instance;
            },
            _search: function(schoolRoomId) {
                return this._pool[schoolRoomId];
            },
            _load: function(schoolRoomId, deferred) {
                var scope = this;

                $http.get('api.php?controller=school_rooms&action=item&id=' + schoolRoomId)
                    .success(function(schoolRoomData) {
                        var schoolRoom = scope._retrieveInstance(schoolRoomData.id, schoolRoomData);
                        deferred.resolve(schoolRoom);
                    })
                    .error(function() {
                        deferred.reject();
                    });
            },
            //Публичные методы
            // Получение по идентификатору
            getSchoolRoom: function(schoolRoomId) {
                var deferred = $q.defer();
                var schoolRoom = this._search(schoolRoomId);
                if (schoolRoom)
                {
                    deferred.resolve(schoolRoom);
                }
                else
                {
                    this._load(schoolRoomId, deferred);
                }
                return deferred.promise;
            },
            // Получение списка
            loadAllSchoolRooms: function() {
                var deferred = $q.defer();
                var scope = this;

                $http.get('api.php?controller=school_rooms&action=list')
                    .success(function(schoolRoomsArray) {
                        var schoolRooms = [];
                        schoolRoomsArray.forEach(function(schoolRoomData) {
                            var schoolRoom = scope._retrieveInstance(schoolRoomData.id, schoolRoomData);
                            schoolRooms.push(schoolRoom);
                        });
                        deferred.resolve(schoolRooms);
                    })
                    .error(function() {
                        deferred.reject();
                    });
                return deferred.promise;
            }
        };

        return schoolRoomManager;
    }])
    .factory('Teacher', [function() {
        'use strict';

        function Teacher(teacherData)
        {
            if (teacherData)
            {
                this.setData(teacherData);
            }
            //что-то, что еще нужно для инициализации
        };

        Teacher.prototype = {
            setData: function(teacherData)
            {
                angular.extend(this, teacherData);
            }
        };

        return Teacher;
    }])
    .factory('teacherManager', ['$http', '$q', 'Teacher', function($http, $q, Teacher) {
        'use strict';

        var teacherManager = {
            _pool: {},
            _retrieveInstance: function(teacherId, teacherData) {
                var instance = this._pool[teacherId];
                if (instance)
                {
                    instance.setData(teacherData);
                }
                else
                {
                    instance = new Teacher(teacherData);
                    this._pool[teacherId] = instance;
                }
                return instance;
            },
            _search: function(teacherId) {
                return this._pool[teacherId];
            },
            _load: function(teacherId, deferred) {
                var scope = this;

                $http.get('api.php?controller=teachers&action=item&id=' + teacherId)
                    .success(function(teacherIdData) {
                        var teacher = scope._retrieveInstance(teacherIdData.id, teacherIdData);
                        deferred.resolve(teacher);
                    })
                    .error(function() {
                        deferred.reject();
                    });
            },
            //Публичные методы
            // Получение по идентификатору
            getTeacher: function(teacherId) {
                var deferred = $q.defer();
                var teacher = this._search(teacherId);
                if (teacher)
                {
                    deferred.resolve(teacher);
                }
                else
                {
                    this._load(teacherId, deferred);
                }
                return deferred.promise;
            },
            // Получение списка
            loadAllTeachers: function() {
                var deferred = $q.defer();
                var scope = this;

                $http.get('api.php?controller=teachers&action=list')
                    .success(function(teachersArray) {
                        var teachers = [];
                        teachersArray.forEach(function(teacherData) {
                            var teacher = scope._retrieveInstance(teacherData.id, teacherData);
                            teachers.push(teacher);
                        });
                        deferred.resolve(teachers);
                    })
                    .error(function() {
                        deferred.reject();
                    });
                return deferred.promise;
            },
            // Список викладачів по предмету уроки для яких розставлені
            loadTeachersBySubject: function(subject_id) {
                var deferred = $q.defer();
                var scope = this;

                $http.get('api.php?controller=teachers&action=by_subject&subject_id=' + subject_id)
                    .success(function(teachersArray) {
                        var teachers = [];
                        teachersArray.forEach(function(teacherData) {
                            var teacher = scope._retrieveInstance(teacherData.id, teacherData);
                            teachers.push(teacher);
                        });
                        deferred.resolve(teachers);
                    })
                    .error(function() {
                        deferred.reject();
                    });
                return deferred.promise;
            }
        };

        return teacherManager;
    }])
;
