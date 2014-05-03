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
   //socket.sendMessage({'type' :1});
   $.ajax({
    url: "/pages/Rooms.html",
    dataType: "html",
    success:function(data){
        $(document).attr({title:'Rooms'});
        socket.sendMessage({'type' :10});
        $('body').html(data);
    }
    });
   });
   var selectarray = [];
   $(document).on('click','#refresh',function(){socket.sendMessage({'type' :10});});
   $(document).on('click','#Create',function(){socket.sendMessage({'type' :20});});
   $(document).on('click','#Enter',function(){socket.sendMessage({'type' :10});});
   $(document).on('dblclick','.roomlist',function(){socket.sendMessage({'type' :10});});
   $(document).on('mouseover','.roomlist',function(){
      $(this).css({cursor: "pointer"}); 
   });
   $(document).on('click','.roomlist',function(){
       Room.select($(this),selectarray);
   });
});