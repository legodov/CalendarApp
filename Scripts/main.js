new Calendar(document.getElementById('calendar'), 'en', function(date) {
  $('.ui.modal')
    .modal({
      observeChanges: true,
      onShow: function() {
        var events = eventList.filter((e) => e.date === date);
        emptyEventForm(0);
        if (events.length > 0) {
          fillEventForm(events[0], 0);
          if (typeof(events[0].participants) !== 'undefined')
            fillParticipantForm(events[0].participants[0], 0);
        } else {
          fillEventFormIfNoEvents();
        }
      }
    })
    .modal('show');
});
