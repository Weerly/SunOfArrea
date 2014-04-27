$(document).ready(function(){
    socket.init("ws://localhost:8000/ws");
   var authorisePage = ' <div  class="pelena corner-all center"></div>'+
            '<div id="mainAuthForm" class="auth-form form-over">'+
                '<div class="my-control-group">'+
                    '<div class="my-controls f-right">'+
                        '<input type="text" id="inputLogin" name="login"/>'+
                    '</div>'+
                    '<div class="my-controls f-right">'+
                       '<span class="f-right">Имя</span>'+
                    '</div>'+
                '</div>'+
                '<div class="my-control-group">'+
                    '<div class="my-controls f-right">'+
                        '<input type="password" id="inputPassword" name="password"/>'+
                    '</div>'+
                    '<div class="my-controls f-right">'+
                        '<span class="f-right">Пароль</span>'+
                    '</div>'+
                '</div>'+
                '<div class="control-group">'+
                    '<div class="controls">'+
                        '<label class="checkbox my-checkbox">'+
                            '<input type="checkbox"/> Запомни меня'+
                        '</label>'+
                        '<div class="button-block">'+
                            '<button  id="login" class="button button-auth corner-1 button-game f-left">Войти</button>'+
                            '<button  id="reg" class="button button-auth corner-1 button-game f-right">Регистрация</button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
    $('body').append(authorisePage);
   $('#login').click(function(){
   var username = $('#inputLogin').val();
   var password = $('#inputPassword').val();
   var item = {
       "username" :$('#inputLogin').val(),
       "password" :$('#inputPassword').val()
   };
   var loginData = [];
   loginData.push(item);
   socket.sendMessage(loginData);
   });
   
});
