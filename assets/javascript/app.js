/**
 * 
 * 
 *      This is the app.js file
 * 
 * 
 */

 // Initialize Firebase
var config = {
    apiKey: "AIzaSyCbRk3M84RykVvCfQhQkGfFc4TVv6xIqb8",
    authDomain: "train-scheduler-9f21b.firebaseapp.com",
    databaseURL: "https://train-scheduler-9f21b.firebaseio.com",
    projectId: "train-scheduler-9f21b",
    storageBucket: "",
    messagingSenderId: "446502719682"
};
firebase.initializeApp(config);

// handle to the database
var hDatabase = firebase.database();

// add a train to the schedule
function addTrainToHTML(_name, _destination, _freq, _arrival, _minAway) {

    // create a new row
    var newRow = $("<div class='row'></div>");

    // create the column for the train name
    var trainNameCol = $("<div class='col-sm-2'>" + _name + "</div>");

    // create the column for the destination
    var destCol = $("<div class='col-sm-2'>" + _destination + "</div>");

    // create the column for the frequency
    var freqCol = $("<div class='col-sm-2'>" + _freq + "</div>");

    // create the column for the next arrival 
    var arrivalCol = $("<div class='col-sm-2'>" + _arrival + "</div>");

    // createa the column for how far the train is away in minutes
    var minAwayCol = $("<div class='col-sm-2'>" + _minAway + "</div>");

    // add the columns to the row
    newRow.append(trainNameCol);
    newRow.append(destCol);
    newRow.append(freqCol);
    newRow.append(arrivalCol);
    newRow.append(minAwayCol);
    // add the new row the schedule
    $("#train-schedule-disp").append(newRow);

}
function addTrainToDB(_name, _destination, _freq, _arrival, _minAway) {
    

    // add the train to the database
    hDatabase.ref().push({
        name: _name,
        destinaton: _destination,
        frequency: _freq,
        nextArrival: _arrival,
        minAway: _minAway
    });
}

// function loadTrainsFromDB() {
    
// }
hDatabase.ref().on('child_added', function (snapshot) {
    
   
        addTrainToHTML(snapshot.val().name,
        snapshot.val().destinaton,
        snapshot.val().frequency,
        snapshot.val().nextArrival,
        snapshot.val().minAway);
    
});


/**                 LOGIC */
/******************************************************************** */
// click events
$("#submit-btn").on("click", function (_event) {
    
    // keep the form from refreshing the page
    _event.preventDefault();


    var trainTime = $("#input-train-time").val();
    var freq = $("#input-freq").val();
    //  
    var firstTrainTime = moment(trainTime, "HH:mm");

    //var diffTime = moment().diff(firstTrainTime, "minutes");

   
    // number of times stopped multiplied by 5 min
    //var timeStopped = $("#input-freq").val();


    var nextArrival = firstTrainTime.add($("#input-freq").val(), "minutes");


    console.log(nextArrival.format("HH:mm"));


    // add the new train
    addTrainToDB($("#input-train-name").val(),
        $("#input-destination").val(),
        $("#input-freq").val(),
        nextArrival.format("HH:mm"),
        $("#input-freq").val());
});




