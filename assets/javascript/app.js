// Initialize Firebase
	var config = {
	apiKey: "AIzaSyCTjLWY8RYA29tD2Z98hbARgDkIVoTKv3c",
	authDomain: "project-train-scheduler.firebaseapp.com",
	databaseURL: "https://project-train-scheduler.firebaseio.com",
	projectId: "project-train-scheduler",
	storageBucket: "project-train-scheduler.appspot.com",
	messagingSenderId: "687439454592"
	};
	firebase.initializeApp(config);

	  	// Create a variable to reference the database.
    	var database = firebase.database();

    	// Initial Values
	    var name = "";
	    var destination = "";
	    var frequency = "5";
	    var first = "10:30"
	    //converting user input to be able to use in moment.js
	    var firstMoment = moment(first, 'hh:mm');
	    //converting the moment variable with same format as "now"
	    var firstMoment2 = moment(firstMoment).format('hh:mm');
	    
	    
	    // shows time in hours and min
	    var now = moment().format('hh:mm');

	    // calculates time until next bus
	    var nowMin = moment.duration(now).asMinutes();
	   	var firstMin = moment.duration(firstMoment2).asMinutes();
	   	var nextArrival = (nowMin - firstMin) % frequency;
	   	var minAway = frequency - nextArrival;
	   	console.log(minAway);
	   	
	    // shows time to next bus
	    var next = now.add(minAway, 'minutes');
	    

	    console.log(next);
    	

	    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      // var convertedDate = moment(startDate, randomFormat);
      // monthsWorked = (convertedDate).diff(moment(), "months")
      first = $("#first-train-input").val().trim();

 




      // Code for handling the push into firebase
      database.ref().push({
        name: name,
        destination: destination,
        first: first,
        frequency: frequency,
        next: next,
        minAway: minAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.role);
      console.log(sv.startDate);
      console.log(sv.rate);

      // Change the HTML to reflect - single change
      $("#trainList").append('<div id="addTrain"><span class="data">' + name + '</span><span class="data">' + destination + '</span><span class="data">' + frequency + '</span><span class="data">' + next + '</span><span class="data">' + minAway + '</span></div>');
      $("#trainList").append('<hr class="style-two">');





      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
