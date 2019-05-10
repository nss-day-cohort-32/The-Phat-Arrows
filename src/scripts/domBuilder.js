import API from "./dataFetch";

const domBuilder = {

    navbar() {
        document.querySelector(".events").addEventListener("click", () => {
            let homepage = document.querySelector(".home-div");
            homepage.innerHTML = "";
            let image = document.querySelector(".bg-img")
            let parent = image.parentNode
            parent.removeChild(image)
        })
    },
    createEventForm() {
        // let homepage = document.querySelector(".home-div");
        // homepage.innerHTML = "";
        let eventContainer = document.getElementById("eventInput");

        // create form HTML elements
        let newEventDiv = document.createElement("div");
        let newEventName = document.createElement("input");
        let newEventDate = document.createElement("input");
        let newEventLocation = document.createElement("input");
        let saveEventFormButton = document.createElement("button");

        // add class to form container
        newEventDiv.classList.add("add--event--form");
        saveEventFormButton.classList.add("event--save--button");
        newEventName.classList.add("new--event--name");
        newEventDate.classList.add("new--event--date");
        newEventLocation.classList.add("new--event--location");

        // add text to button
        saveEventFormButton.textContent = "Save Event"

        // define input attributes
        newEventName.setAttribute("type", "text");
        newEventDate.setAttribute("type", "datetime-local");
        newEventLocation.setAttribute("type", "text");

        // append input fields to the form container
        newEventDiv.appendChild(newEventName);
        newEventDiv.appendChild(newEventDate);
        newEventDiv.appendChild(newEventLocation);
        newEventDiv.appendChild(saveEventFormButton);

        // append form container to event container (temporarily)
        eventContainer.appendChild(newEventDiv);
    },
    createNewsForm() {
        let newsContainer = document.getElementById("newsInput");
        // create form HTML elements
        let newsDiv = document.createElement("div");
        let newsName = document.createElement("input");
        let newsSynopsis = document.createElement("input");
        let newsURL = document.createElement("input");
        let saveNewsButton = document.createElement("button");

        // add class to form container
        newsDiv.classList.add("add--news--form");
        newsName.classList.add("new--news--name");
        newsSynopsis.classList.add("new--news--synopsis");
        newsURL.classList.add("new--news--url")
        saveNewsButton.classList.add("task--news--button");

        // add text to button
        saveNewsButton.textContent = "save news"

        // define input attributes
        newsName.setAttribute("type", "text")
        newsSynopsis.setAttribute("type", "text")
        newsURL.setAttribute("type", "href")

        // append input fields to the form container
        newsDiv.appendChild(newsName);
        newsDiv.appendChild(newsSynopsis);
        newsDiv.appendChild(newsURL);
        newsDiv.appendChild(saveNewsButton)

        // append form container to event container (temporarily)
        newsContainer.appendChild(newsDiv);
    },
    createTaskForm() {
        let taskContainer = document.getElementById("taskInput")
        let taskDiv = document.createElement("div");
        let taskName = document.createElement("input");
        let taskCompletion = document.createElement("input");
        let saveTask = document.createElement("button")

        // add class to form container
        taskDiv.classList.add("add--task--form");
        taskName.classList.add("new--task--name");
        taskCompletion.classList.add("new--task--completion");
        // add text to button
        saveTask.textContent = "save task"

        // // define input attributes
        taskName.setAttribute("type", "text")
        taskCompletion.setAttribute("type", "text")

        // append input fields to the form container
        taskDiv.appendChild(taskName);
        taskDiv.appendChild(taskCompletion);
        taskDiv.appendChild(saveTask);

        // append form container to event container (temporarily)
        taskContainer.appendChild(taskDiv)
    },
    createEventOutput() {
        //GET DATA
        var curr_id = sessionStorage.getItem("session_user_id")
        API.getAll(`http://localhost:3000/events?userId=${curr_id}`)
            .then(events => {
                let newOrder = []
                newOrder = events.sort(function(a, b){
                    a = a.event_date.split("-").join("");
                    b = b.event_date.split("-").join("");
                    return a - b
                })
                newOrder.reverse()
                newOrder.forEach(event => {
                    let ID = event.id
                    //CREATE & POPULATE ELEMENTS
                    let output = document.querySelector("#eventOutput")
                    let card = document.createElement("div")
                    card.classList.add("card")

                    let name = document.createElement("h2")
                    name.textContent = event.event_name
                    card.appendChild(name)

                    let details = document.createElement("p")
                    details.textContent = event.event_details
                    card.appendChild(details)

                    let date = document.createElement("p")
                    date.textContent = event.event_date
                    card.appendChild(date)
                    //ADD REMOVE BUTTON AND EVENT LISTENER
                    let removeButton = document.createElement("button")
                    removeButton.addEventListener("click", function(event){
                        //Remove from API/JSON
                        API.delete("http://localhost:3000/events", ID)
                        //Remove from DOM
                        let parent = card.parentNode
                        parent.removeChild(card)
                    })
                    removeButton.textContent = "REMOVE"
                    removeButton.classList.add("btn-outline-success")
                    card.appendChild(removeButton)

                    output.appendChild(card)

                })
            })
    },
    createNewsOutput() {
        //GET DATA
        var curr_id = sessionStorage.getItem("session_user_id")
        API.getAll(`http://localhost:3000/articles?userId=${curr_id}`)
            .then(articles => {
                let newOrder = []
                newOrder = articles.sort(function(a, b){
                    a = a.article_published.split("-").join("");
                    b = b.article_published.split("-").join("");
                    return a - b
                })
                newOrder.reverse()
                newOrder.forEach(article => {
                    let ID = article.id
                    //CREATE & POPULATE ELEMENTS
                    let output = document.querySelector("#newsOutput")

                    let card = document.createElement("div")
                    card.classList.add("card")
                    let title = document.createElement("h2")
                    title.textContent = article.article_title
                    card.appendChild(title)

                    let date = document.createElement("h4")
                    date.textContent = article.article_published
                    card.appendChild(date)

                    let blurb = document.createElement("p")
                    blurb.textContent = article.article_blurb
                    card.appendChild(blurb)

                    let url = document.createElement("p")
                    url.textContent = article.article_link
                    card.appendChild(url)

                    //ADD REMOVE BUTTON AND EVENT LISTENER
                    let removeButton = document.createElement("button")
                    removeButton.addEventListener("click", function(event){
                        //Remove from API/JSON
                        API.delete("http://localhost:3000/articles", ID)
                        //Remove from DOM
                        let parent = card.parentNode
                        parent.removeChild(card)
                    })
                    removeButton.textContent = "REMOVE"
                    removeButton.classList.add("btn-outline-success")
                    card.appendChild(removeButton)


                    output.appendChild(card)

                })
            })
    },
    createTaskOutput() {
        //GET DATA
        var curr_id = sessionStorage.getItem("session_user_id")
        API.getAll(`http://localhost:3000/tasks?userId=${curr_id}`)
            .then(tasks => {
                let newOrder = []
                newOrder = tasks.sort(function(a, b){
                    a = a.task_doneBy.split("-").join("");
                    b = b.task_doneBy.split("-").join("");
                    return a - b
                })
                newOrder.reverse()
                newOrder.forEach(task => {
                    let ID = task.id
                    //CREATE & POPULATE ELEMENTS
                    let output = document.querySelector("#taskOutput")

                    let card = document.createElement("div")
                    card.classList.add("card")
                    let name = document.createElement("h4")
                    name.textContent = task.task_title
                    card.appendChild(name)

                    let dueDate = document.createElement("p")
                    dueDate.textContent = task.task_doneBy
                    card.appendChild(dueDate)

                    //ADD REMOVE BUTTON AND EVENT LISTENER
                    let removeButton = document.createElement("button")
                    //completedBox.setAttribute("type", "checkbox")
                    removeButton.addEventListener("click", function(event){
                        //Remove from API/JSON
                        API.delete("http://localhost:3000/tasks", ID)
                        //Remove from DOM
                        let parent = card.parentNode
                        parent.removeChild(card)
                    })
                    removeButton.textContent = "Mark as Complete"
                    removeButton.classList.add("btn-outline-success")
                    card.appendChild(removeButton)

                    output.appendChild(card)

                })
            })

    }

}

export default domBuilder