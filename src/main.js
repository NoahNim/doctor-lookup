// import { doctorLookUp } from './doctor-lookup.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function(){
  $('#search').submit(function(event){
    event.preventDefault();
    let userSearch = $('#doctor-value').val();
    let conditionSearch = $('#condition-value').val();

    console.log(userSearch);

      let request = new XMLHttpRequest();
          let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${userSearch}&query=${conditionSearch}&location=wa-seattle&skip=0&limit=25&user_key=${process.env.API_KEY}`

          request.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            let response = JSON.parse(this.responseText);
            getInfo(response);
          } else if (this.readyState === 4 && this.status !== 200) {
            $("#error").text('Your request had a problem. Please try again.');
          } else {
            $("#processing").text('Your request is processing.');
          }
        }

        request.open("GET", url, true);
        request.send();

        let getInfo = function(response) {
          if (response.data != "") {
            $("#processing").hide();
            response.data.forEach(function(info) {
              $("#result").append(`
                <ul>
                  <li><h2>Name: ${info.profile.last_name}, ${info.profile.first_name}, ${info.profile.title}</h2></li>
                  <li>Phone number: ${info.practices[0].phones[0].number}</li>
                  <li>Address: ${info.practices[0].visit_address.street}, ${info.practices[0].visit_address.city}, ${info.practices[0].visit_address.state}, ${info.practices[0].visit_address.zip}</li>
                  <li>Specialties: ${info.specialties[0].name}</li>
                  <li>Accepting New Patients: ${info.practices[0].accepts_new_patients}</li>
                </ul>
                `);
            });
          } else {
            $("#error").text("Unable to find doctors. Please try again.");
          }
    };
  })
})
