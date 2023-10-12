var server = "http://localhost:4040/";

function getTodayTodos(){
	var result = null
	$.ajax({
		type: "GET",
		url: server + "today",
	        async: false,
		success: function(data){
			result = data;
		}
	});
	return result;
}

var data = {focus: [], todo: getTodayTodos() || [], completed: []};
console.log(data);

// Icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var focusSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
var postponeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
renderTodoList();

// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function() {
  var value = document.getElementById('item').value;
  if (value) {
    addItem(value);
  }
});

document.getElementById('item').addEventListener('keydown', function (e) {
  var value = this.value;
  if ((e.code === 'Enter' || e.code === 'NumpadEnter') && value) {
    addItem(value);
  }
});

function addItem (value) {
  var id = addItemToBackend(value);
  console.log(id);
  addItemToDOM(value, id);
  document.getElementById('item').value = '';

  data.todo.push(value);
}

function addItemToBackend (value) {
	var result = null;
	payload = {'item': value};
	console.log(payload);
	$.ajax({
    type: "POST",
    url: server + 'add',
		data: payload,
		async: false,
    success: function(data){
      result = data;
			console.log(data);
    }
  });
  return result.id;
}

function renderTodoList() {
  if (!data.todo.length) return;
  
  for (var i = 0; i < data.todo.length; i++) {
    var value = data.todo[i].Item;
    var id = data.todo[i].Id;
    var focus = data.todo[i].Focused;
    var completed = data.todo[i].CompletedDate != null;
    addItemToDOM(value, id, completed, focus);
  }
}

function removeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  }
  if (id === 'completed') {
    data.completed.splice(data.completed.indexOf(value), 1);
  }
  if (id === 'focus') {
    data.focus.splice(data.focus.indexOf(value), 1);
  }
  parent.removeChild(item);
  removeItemInBackend(item);
}

function removeItemInBackend (item) {
	console.log(item.id)
	$.ajax({
    url: server + "delete/" + item.id,
		type: 'POST',
		async: false,
		success: function(data) {
			console.log(data)
		}
  });
}

function completeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;
  var completed = false;

  if (id === 'todo' || id === 'focus') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
	  console.log(item);
    updateItemInBackend(item, true);
    completed = true;
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    data.todo.push(value);
	  console.log(item);
    updateItemInBackend(item, false);
  }
  // Check if the item should be added to the completed list or to re-added to the todo list
  var target = (id === 'completed') ? document.getElementById('todo') : document.getElementById('completed');

  parent.removeChild(item);
  // target.insertBefore(item, target.childNodes[0]);
  addItemToDOM(value, id, completed, false);
}

function focusItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.focus.push(value);
	  console.log(item);
    focusItemInBackend(item, true);
  } else {
    data.focus.splice(data.focus.indexOf(value), 1);
    data.todo.push(value);
	  console.log(item);
    focusItemInBackend(item, false);
  }

    // Check if the item should be added to the completed list or to re-added to the todo list
    var target = (id === 'todo') ? document.getElementById('focus') : document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

function postponeItem() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.innerText;

  data.todo.splice(data.todo.indexOf(value), 1);
  data.focus.push(value);
  console.log(item);
  postponeItemInBackend(item);
 
  parent.removeChild(item);
}

function updateItemInBackend (item, completed) {
  console.log(item.id)
  payload = {'completed': completed};
  if (completed) {
    $.ajax({
      url: server + 'complete/' + item.id,
      type: 'POST',
      data: payload,
      async: false,
      success: function(data) {
        console.log(data)
      }
    });
  } else {
    $.ajax({
      url: server + 'incomplete/' + item.id,
      type: 'POST',
      data: payload,
      async: false,
      success: function(data) {
        console.log(data)
      }
    });
  }
}

function focusItemInBackend(item, focused) {
  console.log(item.id)
  payload = {'focused': focused};
  if (focused) {
    $.ajax({
      url: server + 'focus/' + item.id,
      type: 'POST',
      data: payload,
      async: false,
      success: function(data) {
        console.log(data)
      }
    });
  } else {
    $.ajax({
      url: server + 'unfocused/' + item.id,
      type: 'POST',
      data: payload,
      async: false,
      success: function(data) {
        console.log(data)
      }
    });
  }
}

function postponeItemInBackend(item) {
  console.log(item.id)
  payload = {'postpone': true};

  $.ajax({
    url: server + 'postpone/' + item.id,
    type: 'POST',
    data: payload,
    async: false,
    success: function(data) {
      console.log(data)
    }
  });
}

// Adds a new item to the todo list
function addItemToDOM(value, id, completed, focused) {
  var list = (completed)
      ? document.getElementById('completed')
      : (focused)
          ? document.getElementById('focus')
          : document.getElementById('todo');

  var item = document.createElement('li');
  item.id = id;

  var text = document.createElement('div');
  text.classList.add('text');
  text.innerText = value;

  var buttons = document.createElement('div');
  buttons.classList.add('buttons');

  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  // Add click event for removing the item
  remove.addEventListener('click', removeItem);

  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  // Add click event for completing the item
  complete.addEventListener('click', completeItem);

  var focused = document.createElement('button');
  focused.classList.add('focused');
  focused.innerHTML = focusSVG;

  // Add click event for focus the item
  focused.addEventListener('click', focusItem);

  var postpone = document.createElement('button');
  postpone.classList.add('postpone');
  postpone.innerHTML = postponeSVG;

  // Add click event for focus the item
  postpone.addEventListener('click', postponeItem);

  if (!completed) {
    buttons.appendChild(remove);
    buttons.appendChild(focused);
    buttons.appendChild(postpone);
  }
  buttons.appendChild(complete);

  item.appendChild(text);
  item.appendChild(buttons);
 
  list.insertBefore(item, list.childNodes[0]);
}
