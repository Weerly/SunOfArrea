var receivedData = {
    filter: function(Data){
        this.type(JSON.parse(Data));
    },
    type: function(Data){
        switch(Data.type){
            case 11: Room.display(Data.rooms);
                break;
             case 31:Room.connect(Data);
                break;
              case 32:Room.afterCreate(Data);
                break;
            case 21: Room.create(Data);
                break;
            case"cardReceived": Card.display(Data.card);
                break;
            default:console.log('simple msg');
                break;
        };
    }
};
var constants = {
    type: function(type){
        var constant;
        switch(type){
            case'GetListOfRoom':
                constant = 10;
                break;
            case'ListOfRooms':
                constant = 11;
                break;
            case'CreateRoom':
                constant = 20;
                break;
            case'RoomCreated':
                constant = 21;
                break;
            case'ConnectToRoom':
                constant = 30;
                break;
            case'ConnectedToRoom':
                constant = 31;
                break;
            case'PlayerConnected':
                constant = 32;
                break;   
        }
        return constant;
    }
};
var Room = {
    display:function(room){
        console.log(room);
        this.roomList(room);
    },
    create: function(Data){
        Battle.prepare(Data);
    },
    afterCreate: function(Data){
        Battle.playerConnected(Data);
    },
    connect: function(Data){
        Battle.prepare(Data);
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
        var enable = true;
        if(enable === true){
            enable = 'enable';
        }else{
            enable = 'disable';
        }
        for(var i=0;i<room.length;i++){
            if(emptyRoom === ''){
                console.log(room.name);
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
    select:function($this,selectArray){
        var Id = $this.attr('id');
        alert(Id);
        $id = '#'+Id+'';
        if(selectArray.length === 0){
               selectArray.push(Id,$id);
               $this.css({'background':'linear-gradient(315deg, green 10%,rgba(48,127,255,0.1) 20%, green 30%,'+
                           'rgba(48,127,255,0.1) 40%, green 50%,rgba(48,127,255,0.1) 60%,'+
                           ' green 70%,rgba(48,127,255,0.1) 80%, green 90%,rgba(48,127,255,0.1) 100%)'});
           }else if(Id !== selectArray[0]){
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
     prepare: function(data){
         $("body").load("/pages/BattlepreRoom.html",function(data){
             Ajax.$success_("Room",data);
             $('#1stPlayerName').text('Your Name');
             $('#1stPlayerClass').text('Your Class');
             Battle.blurLoad();
         });
     },
     playerConnected:function(data){
            $('#2ndPlayerName').text('Your Name');
            $('#2ndPlayerClass').text('Your Class');
     }
 }; 
 var Card = {
     display: function(cards){
         this.clickAnimation(cards);
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
//<!--script type='text/javascript' src='http://code.jquery.com/jquery-1.7.1.js'></script>
//	<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js'></script-->