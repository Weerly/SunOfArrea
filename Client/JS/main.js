$(document).ready(function(){
    socket.init("ws://localhost:8000/ws");
   $('#login').click(function(){
   var username = $('#inputLogin').val();
   var password = $('#inputPassword').val();
   var item = {
       "username" :$('#inputLogin').val(),
       "password" :$('#inputPassword').val()
   };
   var loginData = [];
   loginData.push(item);
   //socket.sendMessage(loginData);
   $.ajax({
    url: "ajax/example.html",
    dataType: "html",
    success:function(data){
        $(document).attr({title:'Rooms'});
        $('body').html(data);
    }
});
   });
   
});