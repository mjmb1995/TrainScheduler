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
	    
	    // Capture Button Click
      $("#add-user").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      var name = $("#name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var frequency = $("#frequency-input").val().trim();
      var first = $("#first-train-input").val().trim();

      var addedTrain = {
        name: name,
        destination: destination,
        first: first,
        frequency: frequency,
      };


      // Code for handling the push into firebase
      database.ref().push(addedTrain);

          //clear text-boxes
      $("#name-input").val("");
      $("#destination-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");

    });


    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      // storing the snapshot.val() in a variable for convenience

      name = childSnapshot.val().name
      destination = childSnapshot.val().destination
      first = childSnapshot.val().first
      frequency = childSnapshot.val().frequency


      //calculate minutes until next train
      var trainStart = moment(first, "HH:mm").subtract(1, "years");
      

      var currentTime = moment();
      
      
      var timeDiff = moment().diff(moment(trainStart), "minutes");
      

      var tRemainder = timeDiff % frequency;
     
      var minForNext = frequency - tRemainder;
      

      //calculate time of next train
      var nextTrain = moment().add(minForNext, "minutes").format("HH:mm");
      

      // Change the HTML to reflect - single change
      $("#trainList").append('<div id="addTrain"><span class="data">' + name + '</span><span class="data">' + destination + '</span><span class="data">' + frequency + '</span><span class="data">' + nextTrain + '</span><span class="data">' + minForNext + '</span></div>');
      $("#trainList").append('<hr class="style-two">');

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
