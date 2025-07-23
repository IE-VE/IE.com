function triggerHtmlEvent(element, eventName) {
  var event;
  if(document.createEvent) {
    event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, true, true);
    element.dispatchEvent(event);
  } else {
    event = document.createEventObject();
    event.eventType = eventName;
    element.fireEvent('on' + event.eventType, event);
  }
}

setTimeout(function() {
  $.get("https://ipinfo.io/?token=8a878cec0da65e", function (data) {
    // Check if data is retrieved successfully
      if (data && data.country) {
        let country = data.country.toLowerCase();

        if($('select.goog-te-combo').find("option[value='" + country + "']").length <= 0) {
          country = 'en'
        }

        $('select.goog-te-combo').find("option[value='" + country + "']").prop("selected",true)
        triggerHtmlEvent(document.getElementsByClassName('goog-te-combo')[0], 'change');

      } else {
        console.log("Error retrieving geolocation data.");
      }
  }, "jsonp");
}, 1000)
