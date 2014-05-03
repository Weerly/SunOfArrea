var receivedData = {
    filter: function(Data){
        this.type(JSON.parse(Data));
    },
    type: function(Data){
        switch(Data.type){
            case"listOfRooms": Room.display(Data.rooms);
                break;
            case"cardReceived": Card.display(Data.card);
                break;
            default:console.log('simple msg');
                break;
        };
    }
};
var Room = {
    display:function(room){
        console.log(room);
        this.roomList(room);
    },
    create: function(Data){
        console.log(Data);
    },
    join: function(Data){
        
    },
    roomList:function(room){
        $('#roomcontent').html('');
        $('.room').css("height", "73px");
        this.printRoom(room);
    },
    printRoom:function(room){
        var divBody;
        if(room.length===0){
            divBody = 'Нету пустых комнат, может подождать пока,'+
                    'кто-то создаст комнату или созадйте сами';
            room.length++;
        }
        for(var i=0;i<room.length;i++){
            var divAttribute = '<div class="roomlist" id="'+i+'">';
            if(room.length!==0){
                divBody = room[i].player1+'комната №'+(i+1);
            }
            var roomInList = divAttribute+divBody+'</div>';
            $('#roomcontent').append(roomInList);
            $('.room').css("height", "+=28px");
            if(room.length>8){
               $('#roomcontent').css({"overflow-y":"scroll"}); 
            }
        }    
        
    },
    select:function($this,selectArray){
        var Id = $this.attr('id');
        $id = '#'+Id+'';
        if(selectArray.length === 0){
               selectArray.push(Id,$id);
               $this.css({'background':'violet'});
           }else if(Id !== selectArray[0]){
               $(selectArray[1]).css({'background':'none'});
               selectArray.pop(selectArray[0]);
               selectArray.pop(selectArray[1]);
               selectArray.push(Id,$id);
               $this.css({'background':'violet'});

           }else{
               $(selectArray[1]).css({'background':'none'});
               selectArray.pop(selectArray[0]);
               selectArray.pop(selectArray[1]);
           }
    }
};
 var Card = {
     display: function(card){console.log(card);}
 };