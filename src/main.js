import { doctorLookup } from './doctor-lookup.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function(){
  $('#search-by-doctor').submit(function(event){
    event.preventDefault();
    let search = $('#doctor-value').val();
    console.log(search);
    let thisSearch = new doctorLookup();
    console.log(promise);
    thisSearch.searchByDoctor(search);

    // promise.then(function(response){
    //   let body = JSON.parse(response);
    //   if (body.data.length === 0) {
    //     return $("#error").text("Unable to find a doctor.")
    //   }
    //     body.data.forEach(function(item) {
    //     let name = item.profile.first_name + " " + item.profile.last_name + ", " + item.profile.title;
    //     let phone = item.practices[0].phones[0].number;
    //     let website = item.practices[0].website;
    //     let patients = item.practices[0].accepts_new_patients;
    //     let address = item.practices[0].visit_address.street + " " + item.practices[0].visit_address.street2 + ", "
    //     + item.practices[0].visit_address.city + ", " + item.practices[0].visit_address.state + ", " + item.practices[0].visit_address.zip;
    //     $('#result').append("<li>" + name + "<br>" + address + "<br>" + phone + "<br>" + "is taking new patients: " + patients + "<br>" + "Website: " + website + "</li>");
    //   }), function(error) {
    //   $('#error').text(`There was an error processing your request: ${error.message}`);
    //     };
    // })
  })
})
