function emptyEventForm(i) { //index
  $('#event-name')[i].textContent = "";
  $('#event-description')[i].textContent = "";
  $('#avatar')[i].src = "";
  $('#participant-name')[i].textContent = "";
  $('#participant-link')[i].href = "";
  $('#participant-link')[i].textContent = "";
}

function fillEventForm(e, i) { // event, index of form
  $('#event-name')[i].textContent = e.event;
  $('#event-description')[i].textContent = e.description
  for (j in e.participants) {
    fillParticipantForm(e.participants[j], i);
  }
}

function fillParticipantForm(p, i) { // participant, index of form
  console.log(p);
  $('#avatar')[i].src = p["avatar"];
  $('#participant-name')[i].textContent = p["name"];
  $('#participant-link')[i].href = p["url"];
  $('#participant-link')[i].textContent = p["url"];
}

function fillEventFormIfNoEvents() {
  $('#event-name')[0].textContent = "Empty";
  $('#event-description')[0].textContent = "Event list empty. You can add new event!";
}
