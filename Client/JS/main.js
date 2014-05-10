$(document).ready(function(){ 
    socket.init("ws://localhost:8000/ws");
    var selectarray = [];
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
        socket.sendMessage({'type' :constants.type("GetListOfRoom")});
        $('body').html(data);
    }
    });
   });
   $(document).on('click','#Enter',function(){if(selectarray.length !==0){  
           socket.sendMessage({'type' :constants.type("ConnectToRoom"),'id':selectarray[0]});}});
   $(document).on('click','#Create',function(){socket.sendMessage({'type' :constants.type("CreateRoom"),'name':'battle'});});
   $(document).on('click','#refresh',function(){socket.sendMessage({'type' :constants.type("GetListOfRoom")});});
   $(document).on('dblclick','.roomlist',function(){if(selectarray.length !==0){  
           socket.sendMessage({'type' :constants.type("ConnectToRoom"),'id':selectarray[0]});
   }});
   $(document).on('mouseover','.roomlist',function(){
      $(this).css({cursor: "pointer"}); 
   });
   $(document).on('click','.roomlist',function(){
       Room.select($(this),selectarray);
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