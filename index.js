const taskContainer = document.querySelector(".task__container");

let globalStore=[];

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" >
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
      <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i>
    </button>
  </div>
  <img
    src=${taskData.imageUrl}
    class="card-img-top"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text">
      ${taskData.taskDescription}
    </p>
    <a href="#" class="btn btn-primary">${taskData.taskType}</a>
  </div>
  <div class="card-footer">
    <button type="button" class="btn btn-outline-primary float-end">
      Open Task
    </button>
  </div>
</div>
</div>
`;
const loadInitialCardData = () => {

  const getCardData = localStorage.getItem("tasky"); // from local storage to get card data

  const {cards} = JSON.parse(getCardData);   //converting string to normal object

  // loop over those array of task object to create HTML card
  cards.map((cardObject) => {

    // inject it to DOM
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    // update our globalStore
    globalStore.push(cardObject);
  })
};
const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, // unique number for id
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));
  
  globalStore.push(taskData);
  
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

};
const deleteCard = (event) => {
  event=window.event;
  const targetID = event.target.id;
  const tagName = event.target.tagName; //BUTTON
  globalStore = globalStore.filter((cardObject) => cardObject.id != targetID);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

  if(tagName === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else{
  taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }
}