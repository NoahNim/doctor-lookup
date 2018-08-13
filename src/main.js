import { doctorLookup } from './doctor-lookup.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function(){
  $('#search-by-doctor').submit(function(event){
    event.preventDefault();
    let userSearch = $('#doctor-value').val();
    console.log(userSearch);
    let thisSearch = new doctorLookup(userSearch);
    console.log(thisSearch);
    thisSearch.searchByDoctor();
  })
})
