define(function(){
    return function() {
        var authSection = document.getElementById('authorization_sect'); //document.getElementById - возвращает ссылку на 
                                                                   //элемент по его идентификатору
        authSection.innerHTML =   //Свойство Element.innerHTML устанавливает или получает разметку дочерних элементов.
            '<ul id="auth">' +
            '<li><a href="/signup" onclick="return makeSignUpSectionVisible()">Регистрация </a></li>' +
            '<li><a href="/login" onclick="return makeLogInSectionVisible()">Вход</a></li>' +
            '</ul>'; 
        $('.invalid:visible').fadeOut(3000); //элемент "растворится"
        return false;
    }
});
