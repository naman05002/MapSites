var map;
var Marker1;
/*Search plugin initialization*/
var placeOptions={
    location:[15.392892, 73.880329]/*,
    geolocation:true,
    pod:'City',
    bridge:true,
    tokenizeAddress:true,*
    filter:'cop:9QGXAM',
    hyperLocal:true, Default is false. Location parameter is mandatory to use this parameter.
    distance:true,
    width:300,
    height:300,
    clearButton:false, //to hide cross button, which is right side of search input
    blank_callback:function(){console.log("called when click on cross button or input value become blank");}
    */
};

    function initMap1() {
        map = new mappls.Map('map', {
            center:[15.392892, 73.880329],
            zoomControl: true,
            location: true
        });
        // console.log(map);

        Marker1 = new mappls.Marker({
            map: map,
            position: {
                "lat": 15.392892, 
                "lng": 73.880329
            },
            fitbounds: true,
            icon_url: 'https://apis.mapmyindia.com/map_v3/1.png'
        });
        map.addListener('load', function () {
            var window=new mappls.InfoWindow({
                map:map,
                content:`<div id = "InfoWindow">BITS Pilani, K.K. Birla Goa Campus</div>`,
                position:{
                    lat: 15.392892, 
                    lng: 73.880329
                },
                closeButton: false
            });
        });
        new MapmyIndia.search(document.getElementById("auto"),placeOptions,callback);
        
    }
    function callback(data) { 
        if(data)
        {
            console.log(data);
            var dt=data[0];
            if(!dt) return false;
            var eloc=dt.eLoc;
            var place=dt.placeName+", "+dt.placeAddress;
            /*Use elocMarker Plugin to add marker*/
            if(Marker1) Marker1.remove();
            Marker1=new MapmyIndia.elocMarker({map:map,eloc:eloc,popupHtml:place,popupOptions:{openPopup:true}}).fitbounds();
        }
      }   
    // var marker;
    
