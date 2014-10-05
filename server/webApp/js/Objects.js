var receivedData = {
    filter: function(Data){
        this.type(JSON.parse(Data));
    },
    type: function(Data){
        switch(Data.type){
            case 'get_list_of_rooms': 
                Room.display(Data.rooms);
                break;
            case "room_created":
                Room.player1(Data);
                Room.create(Data);
                break;
             case "successfully_connected_to_room":
                Room.player2(Data);  
                Room.connect(Data);
                break;
            case "player_connected":
                Room.afterCreate(Data);
                break;
            case"cardReceived":
                console.log(Data);
                Card.display(Data);
                break;
            default:console.log(Data.type);
                break;
        };
    }
};
var page_transform = {
    first:function(){
        
    }
};
var constants = {
    type: function(type){
        var constant;
        switch(type){
            case 'cardReceived' :
                constant = "get_card";
                break;
            case 'GetListOfRoom' :
                constant = "get_list_of_room";
                break;
            case 'ListOfRooms' :
                constant = "get_list_of_room";
                break;
            case 'LeaveRoom' :
                constant = "leave_room";
                break;
            case 'destroy_room' :
                constant = "destroy_room";
                break;
            case 'CreateRoom' :
                constant = "create_room";
                break;
            case 'RoomCreated' :
                constant = "room_created";
                break;
            case 'ConnectToRoom' :
                constant = "connect_to_room";
                break;
            case 'ConnectedToRoom' :
                constant = "successfully_connected_to_room";
                break;
            case 'PlayerConnected' :
                constant = "player_connected";
                break;
            case 'Setname' :
                constant = "set_name";
                break;   
        }
        return constant;
    }
};
var Room = {
    display:function(room){
        this.roomList(room);
    },
    create: function(Data){
        Battle.prepare(Data,1);
    },
    afterCreate: function(Data){
        Battle.playerConnected(Data);
    },
    connect: function(Data){
        Battle.prepare(Data,2);
    },
    roomList:function(room){
        $('#roomcontent').html('');
        $('.room').css("height", "73px");
        this.printRoom(room);
    },
    printRoom:function(room){
        var divLeft;
        var emptyRoom = '';
        if(room.length===0){
            divLeft = '<div>Нету пустых комнат, можете подождать пока,'+
                    'кто-то <br/>создаст комнату или создайте сами! Для обновления списка нажмите кнопку "Обновить"</div>';
            emptyRoom = 'emptyRoomList';
            room.length++;
            var divRight = '<div></div>';
        }
        var divAttribute = '<div class="roomlist '+emptyRoom+'">';
        this.printRoomCycle(room,emptyRoom,divAttribute,divLeft,divRight);
        if(room.length>8){
            $('#roomcontent').css({"overflow-y":"scroll"}); 
         }    
    },
    printRoomCycle:function(room,emptyRoom,divAttribute,divLeft,divRight){
        
        for(var i=0;i<room.length;i++){
            if(emptyRoom === ''){
                var enable = room[i].player2;
                if(enable === null){
                    enable = 'enable';
                }else{
                    enable = 'disable';
                }
                var divAttribute = '<div class="roomlist" id='+room[i].id+'>';
                var divAttributeLeft = '<div class="roomlistblock centered '+enable+' f-right">';
                var divAttributeRight = '<div class="roomlistblock centered '+enable+' f-left">';
                var divBodyLeft = room[i].player1;
                var divBodyRight = 'комната №'+(i+1);
                $('.room').css("height", "+=28px");
                divLeft = divAttributeLeft+divBodyLeft+'</div>';
                divRight = divAttributeRight+divBodyRight+'</div>';
            }else{ 
                $('.room').css("height", "+=60px");
            }
            var roomInList = divAttribute+divLeft+divRight+'</div>';
            $('#roomcontent').append(roomInList);
        }
    },
    player1:function(data){
        this.disconnected.id = data.id;
        this.disconnected.name = data.name;
        this.disconnected.player = "player1";
    },
    player2:function(data){
        this.disconnected.id = data.roomInfo.id;
        this.disconnected.name = data.roomInfo.name;
        this.disconnected.player = "player2";
    },
    disconnected:function(){
        var id;
        var player;
        var name;
        var type;
        if(player === "player1"){
            return 40;
        }
    },
    select:function($this,selectArray){
         var card = Card.display();
         console.log(card);
        var Id = $this.attr('id');
        $id = '#'+Id+'';
        if(selectArray.length === 0&&$($id).children().hasClass('enable')){
               selectArray.push(Id,$id);
               $this.css({'background':'linear-gradient(315deg, green 10%,rgba(48,127,255,0.1) 20%, green 30%,'+
                           'rgba(48,127,255,0.1) 40%, green 50%,rgba(48,127,255,0.1) 60%,'+
                           ' green 70%,rgba(48,127,255,0.1) 80%, green 90%,rgba(48,127,255,0.1) 100%)'});
           }else if(Id !== selectArray[0]&&$($id).children().hasClass('enable')){
               $(selectArray[1]).css({'background':'none'});
               selectArray.pop(selectArray[0]); 
               selectArray.pop(selectArray[1]);
               selectArray.push(Id,$id);
               $this.css({'background':'linear-gradient(315deg, green 10%,rgba(48,127,255,0.1) 20%, green 30%,'+
                           'rgba(48,127,255,0.1) 40%, green 50%,rgba(48,127,255,0.1) 60%,'+
                           ' green 70%,rgba(48,127,255,0.1) 80%, green 90%,rgba(48,127,255,0.1) 100%)'});
           }else{
               $(selectArray[1]).css({'background':'none'});
               selectArray.pop(selectArray[0]);
               selectArray.pop(selectArray[1]);
           }
    }
};
 var Battle = {
     blurLoad:function(){
        $('.blur-block').blurjs({
		overlay: 'rgba(255,255,255,0.1)',
		radius:7		
	});
    },
     prepare: function(data_,player){
         $("body").load("/pages/BattlepreRoom.html",function(data){
             Ajax.$success_("Room",data);       
              var card = Cookie.getKookie("Card");
             if(player === 1){
                $('#1stPlayerName').text('Anonimous1');
                //$('#1stPlayerClass').text(card.hero[0].name);
                
                //$('#2ndPlayerClass').text(card.hero[1].name);
                $('#Hero1').load('/flags/player1.html',function(){
                    $('#av1').css({"background":'url("/img/player1av.png")',"background-size":'30% 30%',"background-repeat":'no-repeat'});
                });
                
                 $('#btns').hide();
                 $('#wait_alert').show();
             }else{
                console.log(JSON.parse(data_.roomInfo).p);
                  $('#1stPlayerName').text(JSON.parse(data_.roomInfo).player1);

                //$('#1stPlayerClass').text(card.hero[0].name);
                
                //$('#2ndPlayerClass').text(card.hero[1].name);
                $('#Hero1').load('/flags/player1.html',function(){
                    $('#av1').css({"background":'url("/img/player1av.png")',"background-size":'30% 30%',"background-repeat":'no-repeat'});
                });
                 $('#2ndPlayerName').text(JSON.parse(data_.roomInfo).player2);
                 $('#Hero2').load('/flags/player2.html',function(){
                    $('#av2').css({"background":'url("/img/player2av.png")',"background-size":'30% 30%',"background-repeat":'no-repeat'});
                });
                 $('#nav_buttons').show();
                 $('.preBattle_alert').hide();
             }
             //Battle.blurLoad();
         });
     },
     playerConnected:function(data){
            var card = Cookie.getKookie("Card");
            $('#2ndPlayerName').text(data.playerInfo.name);
            //$('#2ndPlayerClass').text(card.hero[1].name);
             $('#Hero2').load('/flags/player2.html',function(){
                    $('#av2').css({"background":'url("/img/player2av.png")',"background-size":'30% 30%',"background-repeat":'no-repeat'});
                });
     }
 }; 
 var Card = {
     display: function(cards){
         console.log(cards);
         //this.clickAnimation(cards);
         Cookie.setKookie("Card",cards);
     },
     data:function(){
         var cardss;
         console.log(cardss);
         return cardss;
     },
     overAnimation:function($this){
         var $next = $this.next();
         var nextHeight = $this.height();
         $this.css({"box-shadow":"0 0 200px green"});
         $this.css({"height":"+=3%"});
         $this.css({"width":"+=2%"});
         $this.zIndex(5);        
     },
     Front:function(front,id){
         if (front) {
        //$(this).css('background', '#f0f');
    } else {
        $(this).css('background', '#0f0');
        alert(id);
    }
     },
     leaveAnimation:function($this){
         var $next = $this.next();
         var nextHeight = "1%";
         $this.css({"box-shadow":"none"});
         $this.css({"height":"-=3%"});
         $this.css({"width":"-=2%"});
         $this.zIndex(0);
     },
     clickAnimation:function(Cards,page){
         var length = 0;
         var id_ = "Skills";
         //var d = count;
         //var $this = $('#Skills');
         var $this = $('#'+id_+'');
         //console.log(Cards);
         for(var i=0;i<4;i++){
             
             //console.log($this);
             //console.log(i);
             var percent = $(window).width()*10/100;
             console.log($(window).width());
             console.log(percent);
            length +=percent;
            var $next = $this.next();
            var nextHeight = "1%";
            $this.css({"box-shadow":"none"});
            $this.zIndex(0);
            $this.clone().prependTo($this.parent()).attr("id",id_+i);
            //console.log($this.clone().attr("id"));
            //console.log(length);
            $this.delay(5000);
            $this.animate({
                left:300+length,
                opacity:1
            },2000);
            $this.rotate3Di(180,800,{
                sideChange: function(front){
                    
                        if (front) {
                       //$(this).css('background', '#f0f');
                        } else {  
                            $(this).css('background', 'url("/img/'+Cards.name+'.jpg")');
                            $(this).css('backgroundSize', '100% 100%');
                            console.log($(this).css('background'));
                        }
                    }
            });
            
            $this = $("#"+id_+i+"");
            console.log($this);
        }
     }   
 };
 var Ajax = {
     $success_:function(type,data){
         switch(type){
             case'authorisation':   $(document).attr({title:'Rooms'});
                                    socket.sendMessage({'type' :10});
                                    $('body').html(data);
                                    break;
             case'Room':            $(document).attr({title:'Preparation To Battle'});
                                    //socket.sendMessage({'type' :21});
                                    $('body').html(data);
                                    $('body').css({"background":"url('/img/Wood_Texture.jpg')"});
                                    break;
         };
     },
     $ajax:function(url,dataType,type){
        $.ajax({
        url: url,
        dataType: dataType,
        success:function(data){
            Ajax.$success_(type,data);
            }    
        });
    }
};
 var Cookie = {
    setKookie:function(name,value){
        //var card;
        
        $.cookie(name,JSON.stringify(value),{expires: 300});
        console.log($.cookie('Card'));
    },
    getKookie:function(name){
        console.log(JSON.parse($.cookie(name)));
        return JSON.parse($.cookie(name));
    }
 };
//<!--script type='text/javascript' src='http://code.jquery.com/jquery-1.7.1.js'></script>
//	<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js'></script-->