//для регестрации в системе
function makeSignUpSectionVisible() {
    var authSection = document.getElementById('authorization_sect');
    authSection.innerHTML = ''; //вставка пустого html

    var form = document.createElement('form'); //создание формы
    form.id = 'signup'; //id формы
    form.action = '/signup'; //функция app.js
    form.method = 'post'; //тип метода (get или post)
    form.classList.add('visible-form'); 

    var loginDiv = document.createElement('div'); //блок div логина
    loginDiv.classList.add('field');              //создаю блоку loginDiv класс field
    var passwordDiv = document.createElement('div'); 
    passwordDiv.classList.add('field');

    var loginLabel = document.createElement('label'); //создание надписи
    loginLabel.for = 'username';        //привязка
    loginLabel.innerHTML = 'Логин: ';
    var loginInput = document.createElement('input');
    loginInput.type = 'text';
    loginInput.id = 'username';
    loginInput.name = 'username';
    loginInput.required = true;         //required - обязательное

    loginInput.onfocus = function () {    //элемент находится в фокусе
    loginInput.style.borderColor = 'orange';
    };

    loginInput.onblur = function () {      //потеря элемента фокуса            
        loginInput.style.borderColor = 'transparent';  //убирает подсветку границы
    };

    loginDiv.appendChild(loginLabel);   //добавить loginLabel в loginDiv
    loginDiv.appendChild(loginInput);

    var passwordLabel = document.createElement('label');
    passwordLabel.for = 'password';
    passwordLabel.innerHTML = 'Пароль: ';
    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';
    passwordInput.required = true;
    passwordInput.onfocus = function () {
        passwordInput.style.borderColor = 'orange';
    };
    passwordInput.onblur = function () {
        passwordInput.style.borderColor = 'transparent';
    };
    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);

    //кнопка "Назад" - вызывает функцию, которая стирает созданные поля
    var cancelButton = document.createElement('button');
    cancelButton.onclick = function () {
        require(['makeAuthSectionClear', 'jquery'], function (makeAuthSectionClear, $) {
            makeAuthSectionClear();
        });
        return false;
    };
    cancelButton.innerHTML = 'Назад';

    var signUpButton = document.createElement('input');
    signUpButton.type = 'submit';                      //позволяет отправить форму
    signUpButton.value = 'Зарегистрироваться';
    form.appendChild(loginDiv);
    form.appendChild(passwordDiv);
    form.appendChild(cancelButton);
    form.appendChild(signUpButton);

    authSection.insertBefore(form, authSection.firstChild); //вставка формы перед первым потомком класса authSection
    form.addEventListener('submit',
        require(['checkEmptyFields', 'jquery'], function (checkEmptyFields, $) { //проверка полей на пустоту
            checkEmptyFields();
        }));
    return false;
}

//Для входа в систему
function makeLogInSectionVisible() {
    var authSection = document.getElementById('authorization_sect');
    authSection.innerHTML = '';
    var form = document.createElement('form');
    form.id = 'login';
    form.action = '/login';
    form.method = 'post';
    form.classList.add('visible-form');

    var loginDiv = document.createElement('div');
    loginDiv.classList.add('field');
    var passwordDiv = document.createElement('div');
    passwordDiv.classList.add('field');

    var loginLabel = document.createElement('label');
    loginLabel.for = 'username';
    loginLabel.innerHTML = 'Логин: ';
    var loginInput = document.createElement('input');
    loginInput.type = 'text';
    loginInput.id = 'username';
    loginInput.name = 'username';
    loginInput.required = true;
    loginInput.onfocus = function () {
        loginInput.style.borderColor = 'orange';
    };
    loginInput.onblur = function () {
        loginInput.style.borderColor = 'transparent';
    };
    loginDiv.appendChild(loginLabel);
    loginDiv.appendChild(loginInput);
    var passwordLabel = document.createElement('label');
    passwordLabel.for = 'password';
    passwordLabel.innerHTML = 'Пароль: ';
    var passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';
    passwordInput.required = true;
    passwordInput.onfocus = function () {
        passwordInput.style.borderColor = 'orange';
    };
    passwordInput.onblur = function () {
        passwordInput.style.borderColor = 'transparent';
    };
    passwordDiv.appendChild(passwordLabel);
    passwordDiv.appendChild(passwordInput);
    var cancelButton = document.createElement('button');
    cancelButton.onclick = function () {
        require(['makeAuthSectionClear', 'jquery'], function (makeAuthSectionClear, $) {
            makeAuthSectionClear();
        });
        return false;
    };
    cancelButton.innerHTML = 'Назад';
    var signUpButton = document.createElement('input');
    signUpButton.type = 'submit';
    signUpButton.value = 'Войти';

    form.appendChild(loginDiv);
    form.appendChild(passwordDiv);
    form.appendChild(cancelButton);
    form.appendChild(signUpButton);

    authSection.insertBefore(form, authSection.firstChild);

    form.addEventListener('submit',
        require(['checkEmptyFields', 'jquery'], function (checkEmptyFields, $) {
            checkEmptyFields();
        }));

    return false;
}


//проверяет включенны ли Cookies - небольшой фрагмент данных, 
//отправленный веб-сервером и хранимый на компьютере пользователя.
function checkCookies() {
    if (navigator.cookieEnabled == false) {
        document.getElementById("error").innerHTML = "Cookies are enabled, please turn them on";
    }
}

//при нажатии ESC стираются поля ввода лоогина и пароля, и появляется "Регистрация/ Вход"
$('html').bind('keyup', function (e) {
    if (e.keyCode == 27) {
        require(['makeAuthSectionClear', 'jquery'], function (makeAuthSectionClear, $) {
            makeAuthSectionClear();
        });
        return false;
    }
});

//Убрать сообщение об ошибке при попытке регистрации уже существующего пользователя нажатием мыши
$('html').bind('mousedown', function () {
    $('.error:visible').filter(':parent').fadeOut(4000);
});

function readJSON() {
    if ($("#facts-table").css('display') == "block") {
        $("#facts-table").css({display: "none"});
        $("tbody tr").remove();
        $("#facts-button").text('Открыть статистику');
        return false;
    }
    $.getJSON("../resources/data/data.json")// возвращает объект jqXHR, реализующий интерфейс deferred,
                                            // что позволяет задавать дополнительные обработчики
        .done(function (json) {             // принимает один или более аргументов, которые могут быть 
                                            // функциями или массивом функций
            require(['mustache', 'jquery'], function (mustache, $) {
                var templ = '<tr><td>{{number}}</td><td>{{country}}</td><td>{{capital}}</td><td>{{lenguage}}</td><td>{{square}}</td><td>{{population}}</td><td>{{definition}}</td></tr>';
                for (var i = 0; i < json.team.length; i++) {
                    var data = {
                        number: json.team[i].number,
                        country: json.team[i].country + ' (' + json.team[i].town.join(", ") + ')',
                        capital: json.team[i].capital,
                        lenguage: json.team[i].lenguage,
                        square: json.team[i].square,
                        population: json.team[i].population,
                        definition: json.team[i].definition
                    };
                    var h = mustache.to_html(templ, data);
                    $("#table-cont").append(h);
                    $("#facts-table").css({display: "block"});
                    $("#facts-button").text(' Закрыть статистику ');
                }
            });
        });
}

//всплывает меню
$(function () {
    $('.dropdown-toggle').click(function () {
        $(this).next('.dropdown').slideToggle(); //slideToggle() - свернет/развернет элемент с идентификатором leftFit за 400 мс.
});

//скрывает меню при клике по странице в другом месте
$(document).click(function (e) {
        var target = e.target;
        if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) {
            $('.dropdown').hide();
        }
    });

});

//при наведении на картинку появление всплывающего окна с подписью
$(document).ready(function () {
    $('.masterTooltip').hover(function () {  //hover - при наведении указателя мыши
        var title = $(this).attr('title');  
        $(this).data('tipText', title).removeAttr('title'); //removeAttr - для того, чтобы стандартное окошко не отображалось
        $('<p class="tooltip"></p>')
            .text(title)       //добавляем значение из title
            .appendTo('body') //записываем в body
            .fadeIn('slow'); //медленное появление
    }, function () {
        $(this).attr('title', $(this).data('tipText')); 
        $('.tooltip').remove();
    }).mousemove(function (e) {   //смена координат вместе с указателем мыши
        var mousex = e.pageX + 20;  
        var mousey = e.pageY + 10;
        $('.tooltip')
            .css({top: mousey, left: mousex}) 
    });
});