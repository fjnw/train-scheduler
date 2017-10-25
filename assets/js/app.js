//global variables
var startDate = new Date();
var currentTime;
var timeFormat = 'HH:MM';

//database global variables
var config = {
   apiKey: "AIzaSyBR7wXvz1KKldfvCPpHfHJjeGqUJJ_SkRc",
   authDomain: "train-schedul-14caa.firebaseapp.com",
   databaseURL: "https://train-schedul-14caa.firebaseio.com",
   projectId: "train-schedul-14caa",
   storageBucket: "train-schedul-14caa.appspot.com",
   messagingSenderId: "878659326183"
};
firebase.initializeApp(config);

// display current date (dynamic)
$(document).ready(function(){
	function update(){
		currentTime = moment(new Date()).format('HH:mm:ss a');
		$('#current-time').html("Current time: " + "<strong>"+ currentTime +"<strong>")
	}
	setInterval(update,1000);
});
// alternate current date code:
// var currentDate = new Date();
// var currentTime = now.getHours() + ":" + now.getMinutes() +":"+ now.getSeconds();


//function to store the data into the database
$("#submit").on("click", function(){
	firebase.database().ref().push({
		name: $("#name").val().trim(),
		destination: $("#destination").val().trim(),
		start: $("#start").val().trim(),
		frequency: parseFloat($("#frequency").val().trim())
	});
});

// listener and function to display the data
firebase.database().ref().on("child_added", function (snap){
	console.log(snap.val());
	
	var diffTime = moment(moment(currentTime).diff(currentTime, "minutes"));

	//table row elements
	var row = $("<tr>");
   $( '<tr>' +
		'<td>'+ snap.val().name +'</td>'+
		'<td>'+ snap.val().destination +'</td>'+
		'<td>'+ moment(snap.val().start, 'HH:mm').format('HH:mm a') +'</td>'+
		'<td>'+ snap.val().frequency +'</td>'+
		'<td>'+ diffTime +'</td>'+
		'<td>Placeholder</td>'+
		'<td><a href="#" class="btn btn-secondary delete" id="' + snap.key + '">Delete</a>'+
		'<tr>'
	).appendTo("#train-table tbody");
});

// console.log(firebase.database().ref())


// deletes train in Firebase by key stored in ID of delete-btn
$("body").on("click", ".delete", function(){
     $(this).closest('tr').remove();
     firebase.database().ref().child($(this).attr('id')).remove();
});
