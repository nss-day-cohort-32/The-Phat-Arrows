import API from "./dataFetch";
import call from "./eventCalls";

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
        newEventDate.setAttribute("type", "date");
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
        let publishDate = document.createElement("input");
        let saveNewsButton = document.createElement("button");

        // add class to form container
        newsDiv.classList.add("add--news--form");
        newsName.classList.add("new--news--name");
        newsSynopsis.classList.add("new--news--synopsis");
        newsURL.classList.add("new--news--url");
        publishDate.classList.add("new--publish--date");
        saveNewsButton.classList.add("task--news--button");

        // add text to button
        saveNewsButton.textContent = "save news"

        // define input attributes
        newsName.setAttribute("type", "text")
        newsSynopsis.setAttribute("type", "text")
        newsURL.setAttribute("type", "href")
        publishDate.setAttribute("type", "date")

        // append input fields to the form container
        newsDiv.appendChild(newsName);
        newsDiv.appendChild(newsSynopsis);
        newsDiv.appendChild(newsURL);
        newsDiv.appendChild(publishDate);
        newsDiv.appendChild(saveNewsButton);

        // append form container to event container (temporarily)
        newsContainer.appendChild(newsDiv);
    },
    createTaskForm() {
        let taskContainer = document.getElementById("taskInput");
        let taskDiv = document.createElement("div");
        let taskName = document.createElement("input");
        taskName.placeholder = "Add a task here"
        let taskCompletion = document.createElement("input");
        let saveTask = document.createElement("button")
        saveTask.classList.add("btn-outline-info")

        // add class to form container
        taskDiv.classList.add("add--task--form");
        taskName.classList.add("new--task--name");
        taskCompletion.classList.add("new--task--completion");
        saveTask.classList.add("save--task");
        // add text to button
        saveTask.textContent = "save task"

        // // define input attributes
        taskName.setAttribute("type", "text")
        taskCompletion.setAttribute("type", "date")

        // append input fields to the form container
        taskDiv.appendChild(taskName);
        taskDiv.appendChild(taskCompletion);
        taskDiv.appendChild(saveTask);

        // append form container to event container (temporarily)
        taskContainer.appendChild(taskDiv)
    },
    createMessageForm() {
        //this was working even though its wrong
        //let messageContainer = document.getElementById("taskInput");
        let messageContainer = document.getElementById("messageInput");
        let messageDiv = document.createElement("div");
        let messageContent = document.createElement("input");
        messageContent.placeholder = "Message your friends"
        let saveMessage = document.createElement("button")

    // add class to form container
        messageDiv.classList.add("add--message--form");
        messageContent.classList.add("new--message--content");
        saveMessage.classList.add("save--message");

    // add text to button
        saveMessage.textContent = "save message"

    //define input attributes
        messageContent.setAttribute("type", "text")
        messageDate.setAttribute("type", "date")
        messageTime.setAttribute("type", "time")

    // append input fields to the form container
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(saveMessage);
    // append form container to event container (temporarily)
        messageContainer.appendChild(messageDiv)
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
                    let editEvents = document.createElement("button")
                    removeButton.addEventListener("click", function (event) {
                        //Remove from API/JSON
                        API.delete("http://localhost:3000/events", ID)
                        //Remove from DOM
                        let parent = card.parentNode
                        parent.removeChild(card)
                    })
                    editEvents.addEventListener("click", (e) => {
                        console.log(e)
                    })
                    removeButton.textContent = "REMOVE"
                    editEvents.textContent = "EDIT"
                    removeButton.classList.add("btn-outline-success")
                    card.appendChild(removeButton)
                    card.appendChild(editEvents)

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
                    let editNews = document.createElement("button")
                    removeButton.addEventListener("click", function (event) {
                        //Remove from API/JSON
                        API.delete("http://localhost:3000/articles", ID)
                        //Remove from DOM
                        let parent = card.parentNode
                        parent.removeChild(card)
                    })
                    removeButton.textContent = "REMOVE"
                    editNews.textContent = "EDIT"
                    removeButton.classList.add("btn-outline-success")
                    card.appendChild(removeButton)
                    card.appendChild(editNews)
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
                    //EDIT BUTTON and event listeners
                    let editInput = document.createElement("input")
                    editInput.className = "edit-input"
                    editInput.placeholder = task.task_title;
                    let editTask = document.createElement("button")
                    editTask.classList.add("edit-message")
                    editTask.classList.add("btn-outline-warning")
                    editTask.textContent = "Edit"
                    editTask.addEventListener("click", function (e) {
                        //Hide the edit button to prevent reclicks
                        this.style.display = "none"
                        //Add Save and Cancel Buttons Inside  DIV for styling
                        let editOptions = document.createElement("div")
                        editOptions.className = "edit-options"
                        let save = document.createElement("button")
                        save.textContent = "Save"
                        save.classList.add("btn-outline-info")
                        save.addEventListener("click", function (e) {
                            //console.log(editInput)
                            let obj = { task_title: editInput.value }
                            //console.log(obj)
                            API.editPatch("http://localhost:3000/tasks", ID, obj)
                                .then(results => {
                                    console.log(results)
                                    call.taskReset()
                                })
                        })
                        //This manages the options disappearing when cancel is clicked
                        let cancel = document.createElement("button")
                        cancel.textContent = "Cancel"
                        cancel.classList.add("btn-outline-warning")
                        cancel.addEventListener("click", function (e) {
                            console.log("CANCELLING")
                            editTask.style.display = "initial"
                            let optionsParent = document.querySelector(".edit-options")
                            optionsParent.innerHTML = ""
                            let parent = optionsParent.parentNode
                            parent.removeChild(editInput)
                            parent.removeChild(optionsParent)
                        })
                        editOptions.appendChild(save)
                        editOptions.appendChild(cancel)
                        let parent = editTask.parentNode
                        parent.appendChild(editInput)
                        parent.appendChild(editOptions)

                    })
                    card.appendChild(editTask)



                    removeButton.textContent = "Mark as Complete";
                    editTask.textContent = "EDIT"
                    removeButton.classList.add("btn-outline-success")
                    card.appendChild(removeButton)
                    card.appendChild(editTask)
                    output.appendChild(card)
                })
            })

    }, createMessageOutput() {
        console.log("message")
        var curr_id = sessionStorage.getItem("session_user_id")
        console.log(curr_id)
        API.getAll("http://localhost:3000/messages")
            .then(messages => {
                let newOrder = []
                newOrder = messages.sort(function (a, b) {
                    a = a.id;
                    b = b.id;
                    return a - b
                })
                newOrder.reverse()
                newOrder.forEach(message => {
                    let ID = message.id
                    console.log(ID)
                    //CREATE & POPULATE ELEMENTS
                    let output = document.querySelector("#messageOutput")

                    let card = document.createElement("div")
                    card.classList.add("card")
                    card.classList.add("border-info")
                    //Add header to show the name of the poster
                    let name = document.createElement("h5")
                    name.textContent = message.userName;
                    card.appendChild(name)
                    name.classList.add("card-header")
                    //Add text content of message
                    let message_text = document.createElement("p")
                    message_text.textContent = message.message_content
                    card.appendChild(message_text)
                    message_text.classList.add("card-body")
                    //Add timestamp
                    let timeStamp = document.createElement("p")
                    timeStamp.textContent = message.date
                    card.appendChild(timeStamp)

                    //Only Show Remove (and edit) buttons if its YOUR message
                    if (curr_id == message.userId) {
                       // name.classList.add("bg-info")
                       name.style.backgroundColor = "aliceblue"
                      // card.classList.add("bg-info")
                        //card.classList.add("text-white")
                        //ADD REMOVE BUTTON AND EVENT LISTENER
                        let removeButton = document.createElement("button")
                        //completedBox.setAttribute("type", "checkbox")
                        removeButton.addEventListener("click", function (event) {
                            //Remove from API/JSON
                            API.delete("http://localhost:3000/messages", ID)
                            //Remove from DOM
                            let parent = card.parentNode
                            parent.removeChild(card)
                        })
                        removeButton.textContent = "Remove My Message"
                        removeButton.classList.add("btn-outline-info")
                        card.appendChild(removeButton)

                        //EDIT BUTTON and event listeners
                        let editInput = document.createElement("input")
                        editInput.className = "edit-input"
                        editInput.placeholder = message_text.textContent;

                        let editButton = document.createElement("button")
                        editButton.classList.add("edit-message")
                        editButton.classList.add("btn-outline-warning")
                        editButton.textContent = "Edit My Message"
                        editButton.addEventListener("click", function (e) {
                            //Hide the edit button to prevent reclicks
                            this.style.display = "none"
                            //Add Save and Cancel Buttons Inside  DIV for styling
                            let editOptions = document.createElement("div")
                            editOptions.className = "edit-options"
                            let save = document.createElement("button")
                            save.textContent = "Save"
                            save.classList.add("btn-outline-info")
                            save.addEventListener("click", function (e) {
                                //console.log(editInput)
                                let obj = { message_content: editInput.value }
                                //console.log(obj)
                                API.editPatch("http://localhost:3000/messages",ID, obj)
                                    .then(results => {
                                        console.log(results)
                                        call.messageReset()
                                    })
                            })
                            //This manages the options disappearing when cancel is clicked
                            let cancel = document.createElement("button")
                            cancel.textContent = "Cancel"
                            cancel.classList.add("btn-outline-warning")
                            cancel.addEventListener("click", function (e) {
                                console.log("CANCELLING")
                                editButton.style.display = "initial"
                                let optionsParent = document.querySelector(".edit-options")
                                optionsParent.innerHTML = ""
                                let parent = optionsParent.parentNode
                                parent.removeChild(editInput)
                                parent.removeChild(optionsParent)
                            })
                            editOptions.appendChild(save)
                            editOptions.appendChild(cancel)
                            let parent = editButton.parentNode
                            parent.appendChild(editInput)
                            parent.appendChild(editOptions)

                        })
                        card.appendChild(editButton)
                    }
                    output.appendChild(card)
                })
            })
    },
    clearDOM() {
        //Clear output divs
        let output = document.querySelector("#newsOutput")
        output.innerHTML = ""
        output = document.querySelector("#eventOutput")
        output.innerHTML = ""
        output = document.querySelector("#taskOutput")
        output.innerHTML = ""
        output = document.querySelector("#messageOutput")
        output.innerHTML = ""
        //Clear input divs
        let input = document.querySelector("#newsInput")
        input.innerHTML = ""
        input = document.querySelector("#eventInput")
        input.innerHTML = ""
        input = document.querySelector("#taskInput")
        input.innerHTML = ""
        input = document.querySelector("#messageInput")
        input.innerHTML = ""
    }

}

export default domBuilder