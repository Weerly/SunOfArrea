$(document).ready(function(){ 
    socket.init("ws://95.69.131.67:8000/ws");
    //socket.init("ws://http://python-weerlygit.rhcloud.com:8000/ws");
    var selectarray = [];
    var item =[];
    if(selectarray ===null){
        $('#Enter').attr('disabled','true');
    }else{$('#Enter').attr('disabled','false');}
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
        socket.sendMessage({'type' :constants.type("Setname"),"name":item.username});
        socket.sendMessage({'type' :constants.type("GetListOfRoom")});
        $('body').html(data);
    }
    });
   });
   $('#logins').click(function(){
    var item = {
       "username" :$('#inputLogin').val(),
       "password" :$('#inputPassword').val()
    };
      $('#mainAuthForm').hide();
      $('.bkgrd_form').hide();
      $('.bkgrd_form').show();
      $('#mainAuthForm').load("/pages/Rooms.html",function(){
        socket.sendMessage({'type' :constants.type("GetListOfRoom")});
      });
      $('#mainAuthForm').show();
   });
   $(document).on('click','#go',function(){
       var You = 'ggg';
       console.log('it`s click');
       socket.sendMessage({'type':60,'message':'Hello it`s a test`s text for the chat'});
   });
   $(window).unload(function(){
       socket.sendMessage({'type' :Room.disconnected(),});//'name':disconnected.name,'id':disconnected.id,'player':disconnected.player});
   });
   $(document).on('click','#Enter',function(){
       if(selectarray.length !==0){
           socket.sendMessage({'type':constants.type('cardReceived')});
           socket.sendMessage({'type' :constants.type("ConnectToRoom"),'id':selectarray[0]});
       }
   });
   $(document).on('click','#Create',function(){
       socket.sendMessage({'type':constants.type('cardReceived')});
       socket.sendMessage({'type' :constants.type("CreateRoom"),'name':item.username});
   });
   $(document).on('click','#refresh',function(){socket.sendMessage({'type' :constants.type("GetListOfRoom")});});
   $(document).on('dblclick','.roomlist',function(){if(selectarray.length !==0){
           socket.sendMessage({'type':constants.type('cardReceived')});
           socket.sendMessage({'type' :constants.type("ConnectToRoom"),'id':selectarray[0]});
   }});
   $(document).on('mouseover','.roomlist',function(){
      $(this).css({cursor: "pointer"}); 
   });
   $(document).on('click','.roomlist',function(){
       Room.select($(this),selectarray);
   });
   $(document).on('click','#leave',function(){
      socket.sendMessage({'type':constants.type('LeaveRoom')});
      $('body').load("/pages/Rooms.html",function(){
        $('body').css({'background':'url(/img/start.jpg)','height':'100%','width':'100%'});
        socket.sendMessage({'type' :constants.type("GetListOfRoom")});
      });
   });
   $(document).on('mouseover','#HeroClass',function(){
      Card.overAnimation($(this)); 
   });
   $(document).on('mouseleave','#HeroClass',function(){
      Card.leaveAnimation($(this)); 
   });
   $(document).on('click','#HeroClass',function(){
       var Cards={"type":"cardReceived","class":"HeroClass","cardType":[{"1":"Паладин","2":"Маг","3":"Разбойник","4":"Лучник"}]};
       var Cardss = JSON.stringify(Cards);
       receivedData.filter(Cardss);
   });
   $(document).on('mouseover','#Skills',function(){
      Card.overAnimation($(this)); 
   });
   $(document).on('mouseleave','#Skills',function(){
      Card.leaveAnimation($(this)); 
   });
   $(document).on('click','#Skills',function(){
       //var Cards=["Разящий клинок","Кромсающий выпад","Берсерк","Оглушение щитом","Укол","Железная стрела"];
       //console.log(Cards);
       //Card.clickAnimation($(this,Cards));
       socket.sendMessage({'type' :1});
   });
   $(document).on('mouseover','#Weapons',function(){
      Card.overAnimation($(this)); 
   });
   $(document).on('mouseleave','#Weapons',function(){
      Card.leaveAnimation($(this)); 
   });
   $(document).on('click','#Weapons',function(){
       var Cards=["Меч одноручный","Меч двуручный","2 меча одноручных","Щит","Копье","Кинжал"];
       Card.clickAnimation($(this,Cards));
   });
});