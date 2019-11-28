define(function(){
    return function (event) {
        if (!$(':input[required]:text').val() || !$(':input[required]:password').val()) { //проверка заполнения полей
                                                                  //для ввода логина и пароля
            event.preventDefault();          //Отменяет событие, если оно отменяемое, без остановки 
                                            //дальнейшего распространения этого события.
            $('.invalid').text('Не заполнены все поля'); //сообщение об ошибке
            return false;
        }
    }
});
