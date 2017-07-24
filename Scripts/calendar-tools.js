function getParticipantHtml(p) { // participant
  return '<div class="item participant"><div class="ui tiny image"><img class="avatar" src="' + p["avatar"] + '"></img></div><div class="content"><a class="header participant-name">' + p["name"] + '</a><div class="description"><a href="' + p["url"] + '" class="participant-link">' + p["url"] + '</a></div></div></div>';
}

function getEventFormWithParameters(e, d) { // event, description
  return '<div class="content event"><div class="ui header"><p class="event-name">' + e + '</p></div><div class="description"><p class="event-description">' + d + '</p></div><div class="ui items participant-parent">';
}

function getEventHtml(e) { //event
  var eventHtml = getEventFormWithParameters(e.event, e.description);
  if (typeof e.participants != "undefined") {
    console.log(e.participants);
    for (i in e.participants) {
      if (typeof e.participants[i] != "undefined") {
        console.log(typeof e.participants[i]);
        eventHtml += getParticipantHtml(e.participants[i]);
      }
    }
  }
  eventHtml += '</div></div>';
  return eventHtml;
}

function getActionsHtml() {
  return '<div class="actions" id="action-list"><div class="ui positive right labeled icon button">OK<i class="checkmark icon"></i></div></div>';
}

function getHeaderHtml() {
  return '<div class="header">Event list</div>';
}

function getEventFormHtml(es) { // events
  var eventsHtml = "";
  for (i in es) {
    eventsHtml += getEventHtml(es[i]);
  }
  return getHeaderHtml() + eventsHtml + getActionsHtml();
}

function getEventFormIfNoEventsHtml() {
  return getHeaderHtml() + getEventFormWithParameters("Empty", "Event list is empty!") + getActionsHtml();
}
