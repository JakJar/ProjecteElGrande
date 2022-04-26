export function createEvent() {
    let status = "upcoming";
    let name = document.querySelector("#name").value;
    let start_event = document.querySelector("#datetime-local-start").value;
    let end_event = document.querySelector("#datetime-local-end").value;
    let sport = document.getElementsByName("SportId")[0].value;
    let max_participants = document.querySelector("#max-participants").value;
    let experience_level = document.getElementsByName("ExperienceLevel")[0].value;
    let price = document.querySelector("#price").value;
    let currency = document.getElementsByName("Currency")[0].value;
    let info = document.querySelector("#info-about-event").value;
    let eventType = document.getElementsByName("TypeId")[0].value;
    let city = document.querySelector("#city").value;
    let country = document.querySelector("#country").value;
    let zipCode = document.querySelector("#zipCode").value;

    let event_model_json = {
        "Name": name,
        "StartEvent": start_event,
        "EndEvent": end_event,
        "ExperienceLevel": JSON.parse(experience_level),
        "EventInfo": info,
        "MaxParticipants": max_participants,
        "Status": status,
        "Currency": currency,
        "Link": "",
        "Price": price,
        "Location":{
            "City": city,
            "Country": country,
            "ZipCode": zipCode,
        },
        "Type": JSON.parse(eventType),
        "Sports": JSON.parse(sport),
    }
    fetch("/api/event", {
        method: 'POST',
        headers: {
            'userId': localStorage["session"],
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event_model_json)
    })

    window.location.href = '/list-of-events';
}
