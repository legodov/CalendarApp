new Calendar(document.getElementById('calendar'), 'en', function(date) {
  $('.ui.modal')
    .modal({
      observeChanges: true,
      onShow: function() {
        document.getElementById('event-parent').innerHTML = "";
        var events = eventList.filter((e) => e.date === date);
        if (events.length > 0) {
          document.getElementById('event-parent').innerHTML = getEventFormHtml(events);
        } else {
          document.getElementById('event-parent').innerHTML = getEventFormIfNoEventsHtml();
        }
      }
    })
    .modal('show');
});
