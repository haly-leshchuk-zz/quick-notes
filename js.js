//This single file includes all js and iQuery code used for this project.
//2018-01-13--2018-01-31


$(document).ready(() => {

// build a list of existing notes in Local Storage
 for (var i = 0; i < localStorage.length; i++) {    
    var retrievedData = localStorage.getItem(localStorage.key(i));
    var data = JSON.parse(retrievedData);
    createList(data); //uses the list-building function

    if (localStorage.length == 0) {
	document.getElementById("clear").style.display="none";
    } else {
    	document.getElementById("clear").style.display="inline-block";
    }
  }

$('.inputNote').hide();

$('.buttonAdd').on('click', () => {
	$('.inputNote').slideToggle();
	$('.buttonAdd').toggleClass('buttonClick');
});

$('.note').on('mouseenter', event => {
	$(event.currentTarget).removeClass('noteGradient');
	var child1 = event.target.childNodes;
	child1[1].style.display = 'block';
	$('demo').html(child1[1].textNode);
});

$('.note').on('mouseleave', event => {
	$(event.currentTarget).addClass('noteGradient');
	var child2 = event.target.childNodes;
	child2[1].style.display = 'none';
	$('demo').html(child1[2].textNode);
});

$('#textArea').keypress(function (event) {
 var key = event.which;
 if(key == 13)  {
   saveButton();
  }
}); 
});

//save note to Local Storage
function saveButton() {
    if (textArea.value!=='') {
    var textToSave = document.getElementById("textArea").value;
    var noteName = Date.now().toString(); 
    var data = {};
    data.title = noteName;  //each note gets a unique system name
    data.content = textToSave;
    var jsonData = JSON.stringify(data);
    localStorage.setItem(data.title, jsonData);
    createList(data);
    document.getElementById("textArea").value = "";
  }
  if (localStorage.length == 0) {
	document.getElementById("clear").style.display="none";
    } else {
    	document.getElementById("clear").style.display="inline-block";
    }
}

function saveEvent(event) {
    var value = event.target.id;
    var parValue = document.getElementById(value).textContent;
    var data = {};
    data.title = value;
    data.content = parValue;
    var jsonData = JSON.stringify(data);
    localStorage.setItem(data.title, jsonData);
  }
  
 //removes all records
 function removeAll() {
  localStorage.clear();
  document.location.reload();

  if (localStorage.length == 0) {
	document.getElementById("clear").style.display="none";
    } else {
    	document.getElementById("clear").style.display="inline-block";
    }
 }
 
//remove one record
function removeItem(event) {
  var value = event.target.id;
  localStorage.removeItem(value);
  var listValue = value + 'list';
  var node = document.getElementById(listValue);
  node.remove();

  if (localStorage.length == 0) {
	document.getElementById("clear").style.display="none";
    } else {
    	document.getElementById("clear").style.display="inline-block";
    }
}

//edit record
function editItem(event) {
  var value = event.target.id;
  
  var textElem = document.createElement("INPUT");
  textElem.setAttribute("id", (value+'text'));
  var textElemValue = document.getElementById(value).parentNode.appendChild(textElem);
  var textValue = value + 'text';
  var parValue = value + 'par';
  var parValue = document.getElementById(value).textContent;
  textElem.setAttribute("value", parValue);

  var saveEditElem = document.createElement("BUTTON");
  var saveEditElemText = document.createTextNode('Save Edit');
  saveEditElem.setAttribute("id", value);
  saveEditElem.setAttribute("onclick", "saveEditFunction(event)");
  saveEditElem.setAttribute("hideProperty", (value + 'hide'));
  saveEditElem.appendChild(saveEditElemText);
  var LocalListValue = value + 'list';
  document.getElementById(LocalListValue).appendChild(saveEditElem);
}

//save the edit to Local Storage
  function saveEditFunction(event) {
    var value = event.target.id;
    var textAreaValue = value + "text";
    var parValue = value + "par";
    var hideValue = value + "hide";

    var textAreaText = document.getElementById(textAreaValue).value;
    var data = {};
    data.title = value;
    data.content = textAreaText;
    var jsonData = JSON.stringify(data);
    localStorage.setItem(data.title, jsonData);
    document.getElementById(parValue).innerHTML  = textAreaText;
    document.getElementById(textAreaValue).style.display = 'none';
    document.querySelector("button").style.display = "none";
  }


//create a list of elements
  function createList(data) {
  
// create a div which will contain all record elements
    var listElem = document.createElement("DIV");
    listElem.setAttribute("id", (data.title + 'list'));
    listElem.setAttribute("class", "note noteGradient");
    
//create a text element to keep the actual note
    var parElem = document.createElement("P");
    var parElemText = document.createTextNode(data.content);
    parElem.setAttribute("id", (data.title)); 
    parElem.appendChild(parElemText);
    parElem.setAttribute("contenteditable", "true");
    parElem.setAttribute("onblur", "saveEvent(event)");

//append a remove button to a record
    var buttonRemove = document.createElement("A");
    var buttonRemoveValue = document.createTextNode('x');
    buttonRemove.setAttribute("id", data.title);
    buttonRemove.setAttribute("href", "#");
    buttonRemove.setAttribute("onclick", "removeItem(event)");
    buttonRemove.setAttribute("class", "remove");
    buttonRemove.appendChild(buttonRemoveValue);

//collecting the created elements into one node
    listElem.appendChild(parElem);
    listElem.appendChild(buttonRemove);
    var note = document.getElementById("savedItems");
    note.insertBefore(listElem, note.childNodes[0]); //every new record will be added at the beginning of the list

    $('.note').on('mouseenter', event => {
	$(event.currentTarget).removeClass('noteGradient');
	$('.remove').css('display', 'block');
});

$('.note').on('mouseleave', event => {
	$(event.currentTarget).addClass('noteGradient');
	$('.remove').css('display', 'none')
});
}

