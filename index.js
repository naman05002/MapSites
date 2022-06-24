/*Map Initialization*/
var map = new MapmyIndia.Map('map', {center: [28.6304, 77.2177], zoom: 10, search: false});
          
/*Search plugin initialization*/
  var optional_config={
      location:[28.61, 77.23],
     /* pod:'City',
      bridge:true,
      tokenizeAddress:true,*
      filter:'cop:9QGXAM',
      distance:true,
      width:300,
      height:300*/
  };
  var LOC1, LOC2;
  
  new MapmyIndia.search(document.getElementById("auto"),optional_config,callback);
  new MapmyIndia.search(document.getElementById("auto2"),optional_config, (data) => {
    console.log(`LOC2 = ${data[0].placeName}`);console.log(data);LOC2=data[0].placeName;
  });
  function foo(){
    console.log('Loading...')
    fetch(`https://delhimetroapi.herokuapp.com/metroapi/from=${LOC1.replace(/ /g, '%20')}&to=${LOC2.replace(/ /g, '%20')}`).then(response => {
      if(!response.ok)throw new Error(`Error:  ${response.status}`);
      return response.json()
    })
    .then(data => {
      console.log(data);
      alert(JSON.stringify(data));
    })
    .catch(error => console.error(error))
    
  }
 
  /*CALL for fix text - LIKE THIS
   * 
   new MapmyIndia.search("agra",optional_config,callback);
   * 
   * */

  // function pick(){
  //   var options={
  //       map: map,
  //       callback: callback_method
  //     }
  //     var picker = new MapmyIndia.placePicker(options);
  //     function callback_method(data){
  //       console.log(data);
  //       alert(JSON.stringify(data));
  //     }
  // }
  var optio = {
    divId:'nearby_search',
    map:map,
    keywords:'Metro Stations',
    refLocation:[28.632735,77.219696],
    fitbounds:true,
    click_callback:function(d){alert(d);}
  }
  var nr=MapmyIndia.nearby(optio);

  var x= false;
  function near(){
    // document.getElementById("pickerButton").classList[2] = true;
    // if(document.getElementById("pickerButton").classList[2]==true){
      if(x==false){
        MapmyIndia.direction({map:map,start:"28.545,77.545",end:{label:'India Gate, Delhi',geoposition:"1T182A"},divWidth:0},(data)=>console.log(data));
        x=true;
      }
      
    }
    
  
  
  document.getElementById("pickerButton").addEventListener("click",foo);
  var marker;
  function callback(data) { 
      if(data)
      {
          LOC1=data[0].placeName;
          console.log(`LOC1 = ${LOC1}`)
          console.log(data);
          var dt=data[0];
          if(!dt) return false;
          var eloc=dt.eLoc;
          var place=dt.placeName+", "+dt.placeAddress;
          /*Use elocMarker Plugin to add marker*/
          if(marker) marker.remove();
          marker=new MapmyIndia.elocMarker({map:map,eloc:eloc,popupHtml:place,popupOptions:{openPopup:true}}).fitbounds();
      }
    } 