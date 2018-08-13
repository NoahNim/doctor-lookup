import $ from 'jquery';

export class doctorLookup {
    searchByDoctor(doctor){
      let promise = Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctor}&location=wa-seattle&skip=0&limit=25&user_key=${process.env.exports.apiKey}`;
        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }
        request.open("GET", url, true);
        request.send();
      });
      promise.then(function(response){
        let body = JSON.parse(response);
        if (body.data.length === 0) {
          return $("#error").text("Unable to find a doctor.")
        }
          body.data.forEach(function(item) {
          let name = item.profile.first_name + " " + item.profile.last_name + ", " + item.profile.title;
          let phone = item.practices[0].phones[0].number;
          let website = item.practices[0].website;
          let patients = item.practices[0].accepts_new_patients;
          let address = item.practices[0].visit_address.street + " " + item.practices[0].visit_address.street2 + ", "
          + item.practices[0].visit_address.city + ", " + item.practices[0].visit_address.state + ", " + item.practices[0].visit_address.zip;
          $('#result').append("<li>" + name + "<br>" + address + "<br>" + phone + "<br>" + "is taking new patients: " + patients + "<br>" + "Website: " + website + "</li>");
        }), function(error) {
        $('#error').text(`There was an error processing your request: ${error.message}`);
          };
        });
      };
  //   searchByCondition(condition) {
  //   return new Promise(function(resolve, reject) {
  //     let request = new XMLHttpRequest();
  //     let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${condition}&location=wa-seattle&skip=0&limit=25&user_key=${process.env.exports.apiKey}`;
  //     request.onload = function() {
  //       if (this.status === 200) {
  //         resolve(request.response);
  //       } else {
  //         reject(Error(request.statusText));
  //       }
  //     }
  //     request.open("GET", url, true);
  //     request.send();
  //   });
  // }
}
