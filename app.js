const buttonclick = document.querySelector('#search-button');
const search = document.querySelector('#searchbox');
const newtext = document.querySelector('h2');
let ip;
buttonclick.addEventListener('click', function (eve) {
    if (search.value == "") {
        alert("Enter Valid IP");
    }
    else {
         ip = search.value;
        var API_KEY = "02932968e1104403baa6bd9cb6b258f8"
        var url = 'https://api.ipgeolocation.io/ipgeo?apiKey=' + API_KEY + '&ip=' + ip;
        $.get(url, function (data) {
            console.log(data)
            const location = data.city + " " + data.country_name;
            document.getElementById('current_ip').innerText = data.ip;
            document.getElementById('current_town').innerText = location;
            document.getElementById('current_zone').innerText = data.time_zone.name;
            document.getElementById('current_isp').innerText = data.isp;
            let mapOptions = {
                center: [data.latitude, data.longitude],
                zoom: 15
            }

            let m = new L.map('map', mapOptions);
            let layer = new L.TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
            m.addLayer(layer);
            let marker = new L.marker([data.latitude, data.longitude]);
            marker.addTo(m);
            search.innerText = "";



        })
    }
})

buttonclick.addEventListener('click', (eve) => {
    var regularexp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    eve.preventDefault();
    console.log(ip)
    if (ip != '' && ip != null) {
        if (ip.match(regularexp)) {
            
            return true;
        }
        else {
            alert("Ip can't contain commas(,) or space and must be within the range [0-255]\nEx : 255.255.255.255")
        }
    }
    else {
        alert("Enter a valid IP address")
    }
})


