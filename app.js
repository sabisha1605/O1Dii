//загружаем модули
var express = require('express'), //подключение express - серверный web-фрайемворк
    http = require('http'), // http.createServer - создание нового объекта класса Server
    path = require('path'), // path - модуль, предоставляющий утилиты для работы с путями к директориям/файлам
    mongoose = require('mongoose'); // mongoose - модуль, предназначенный для работы с MongoDB

var app = express(); //создаем объект приложения

mongoose.connect("mongodb://localhost/myapp"); // устанавливаем соединение с БД

var UserSchema = new mongoose.Schema({   //создаем схему БД
    username: String,
    password: String
});

var User = mongoose.model('users', UserSchema); //создаем модель

app.configure(function () { // конфигурация 
    app.use(express.bodyParser()); // для обработки POST-запросов
    app.use(express.cookieParser('Authentication Tutorial ')); // промежуточная обработка для синтаксического анализа cookie
    app.use(express.session()); // поддержка сессий
   
    app.use(express.static(path.join(__dirname, 'public'))); //Для предоставления статических файлов (изображений, видео, файлов CSS и 
    app.use("/styles", express.static(__dirname + '/styles')); //JavaScript) в Express используется функция обработки express.static.
    app.use('/script', express.static(__dirname + '/script'));
    app.use("/resources/image", express.static(__dirname + '/resources/image'));
    app.use("/resources/fonts", express.static(__dirname + '/resources/fonts'));
    app.use("/resources/video", express.static(__dirname + '/resources/video'));
    app.use("/resources/data", express.static(__dirname + '/resources/data'));
    app.set('/views', express.static(__dirname + '/views')); // присваивает имя значению
    app.set('view engine', 'ejs'); // использование шаблонизатора
});

app.use(function (req, res, next) {
    var err = req.session.error,     // переменная получения ошибки (здесь будет "лежать" ошибка)
        msg = req.session.success, 
        usr = req.session.user;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    res.locals.currentUser = '';
    if (err) res.locals.message = err;
    if (msg) res.locals.message = msg; 
    if (usr) res.locals.currentUser = usr.username; 
    next();
});


function authenticate(name, pass, fn) {    // функция проверки подлинности введенного логина/пароля
    User.findOne({                         // поиск совпадений по таблице БД
            username: name
        },
        function (err, user) {  
            if (user) {                                        
                if (err) return fn(new Error('Данные пользователь не найден!'));
                if (pass == user.password) return fn(null, user);
                fn(new Error('Неверный пароль!'));
            } else {
                return fn(new Error('Пользователь не найден!'));
            }
        });
}

function userExist(req, res, next) {   // проверка при регестрации пользователя на существование аналогичного пароля
    User.count({                   
        username: req.body.username
    }, function (err, count) {
        if (count === 0) {           //если совпадений нет - регистрация пройдена
            next();
        } else {                     //в противном случае - сообщение об ошибке и откат регистрации
            req.session.error = "Такой пользователь уже зарегестрирован!";
            res.redirect("/"); // Перенаправление ответа
        }
    });
}

app.post("/signup", userExist, function (req, res) { 
    var password = req.body.password;               // Получение логина и пароля пользователя
    var username = req.body.username;
    var user = new User({
        username: username,
        password: password
    }).save(function (err, newUser) {   // Сохранение данных пользователя в БД
        if (err) throw err; 
        authenticate(newUser.username, password, function (err, user) {     // функция проверки подлинности введенного логина/пароля
            if (user) {
                req.session.regenerate(function () {      // Чистка сессии для сохранения новой
                    req.session.user = user;
                    res.redirect('/');        // Перенаправление ответа
                });
            }
        });
    });
});

app.post("/login", function (req, res) { 
    authenticate(req.body.username, req.body.password, function (err, user) {  // функция проверки подлинности введенного логина/пароля
        if (user) {
            req.session.regenerate(function () { // Чистка сессии для сохранения новой
                req.session.user = user;
                res.redirect('/');  // Перенаправление ответа
            });
        } else {
            req.session.error = 'Неправильный логин или пароль';
            res.redirect('/');  // Перенаправление ответа
        }
    });
});

app.get('/logout', function (req, res) { 
    req.session.destroy(function () {    // Удаление сессии
        res.redirect('/');           // Перенаправление ответа
    });
});

app.get("/", function (req, res) {
    if (req.session.user)
        res.locals.user = req.session.user;  // Заполнение БД
        res.render("index");                 // Вывод шаблона представления
});

app.get("/sites", function (req, res) {
    if (req.session.user)
    res.locals.user = req.session.user;    // Заполнение БД
    res.render("sites");                      // Вывод шаблона представления
});

app.get("/timetour", function (req, res) {
    if (req.session.user)
    res.locals.user = req.session.user;         // Заполнение БД
    res.render("timetour");                    // Вывод шаблона представления
});

app.get("/facts", function (req, res) {
    if (req.session.user)
    res.locals.user = req.session.user;     // Заполнение БД
    res.render("facts");                    // Вывод шаблона представления
});

app.get("/tour", function (req, res) {
    if (req.session.user)
    res.locals.user = req.session.user;     // Заполнение БД
    res.render("tour");                   // Вывод шаблона представления
});

http.createServer(app).listen(7000);  //прослушиваем соединение на порту 7000