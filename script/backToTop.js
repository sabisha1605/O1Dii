$(document).ready(function(){  //jquery
    $('body').append('<div id="toTop">В начало</div>'); //Создаем блок "В начало", который будет 
                                                        //отвечать за перемещение вверх по странице
    $(window).bind('scroll', function () { //событие происходит, когда элемент прокручивается
        if ($(this).scrollTop() != 0) {  //если окно "прокручено"
            $('#toTop').fadeIn(); //элемент "прояснится" за 400 мс.
        } else {
            $('#toTop').fadeOut(); //элемент "растворится" за 400 мс.
        }
    });
    $('#toTop').bind('click', function(){ //при нажатии на кнопку "В начало"
        $("html, body").animate({ scrollTop: 0 }, 700); //страница прокрутится вверх за 700мс
        return false;
    });
});