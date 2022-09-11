var new_list = [];
var company_lat = 9999;
var company_long = 0;
var company_address = "";

function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

$(document).ready(function(){
    $.getJSON("test.json", function(data){
        console.log(data[0].metadata); // Prints: Harry
        for (let i = 0; i < data.length; i++) {
            new_list[i] = data[i].metadata
            new_list[i].lake_name = data[i].lake_name
        }
        console.log(new_list);
        //object.assign(new_list, test2.json);
    }).fail(function(){
        console.log("An error has occurred.");
    });
});

function geolocater() {
    address = $("#address").val();
    console.log(address);

    $.ajax({
        url: 'http://api.positionstack.com/v1/forward',
        data: {
          access_key: '77378826c171b536786c6938af54ae60',
          query: address,
          limit: 1
        }
      }).done(function(data) {
        console.log(data.data[0].latitude);
        console.log(data.data[0].longitude);
        company_lat = data.data[0].latitude;
        company_long = data.data[0].longitude;

        var distance = 20000000000;
        var reserve_name = "";
        var reserve_country = "";
            for (let i = 0; i < new_list.length; i++) {
            var dist_calc = getDistance(new_list[i].latitude, new_list[i].longitude, company_lat, company_long)
                if (dist_calc < distance) {
                    distance = dist_calc;
                    reserve_name = new_list[i].lake_name;
                    reserve_country = new_list[i].country;
                }
            
            }

        console.log(company_lat);
        console.log(company_long);
        console.log(dist_calc);
        console.log(reserve_name);
        console.log(reserve_country);
      });

    
}

