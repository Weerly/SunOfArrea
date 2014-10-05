$(document).ready(function(){
	var datas = $('#dbTable').text();
	$('#credits').click(function(){
		$.ajax({
			url:"http://wizardtooth.esy.es/json.php",
			dataType:"jsonp",
			type:"GET",
			data:{"data":datas},
			success:function(data){
				console.log(data.d2+'dd');
				//var total = $.parseJSON(response);
				//alert(total.foo);
			}
		});
	});
});