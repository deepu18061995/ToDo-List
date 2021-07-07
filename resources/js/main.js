function item(){
	this.dataList = [];
	this.add = add;
	this.remove = remove;
	this.top = 0;
	this.size = size;
	this.find = find
}

function add(id, title, description){
	this.dataList.push({id, title, description});
	++this.top;
}

function size(){
	return this.dataList.length;
}

function find(id){
	for(var i = 0; i < this.size(); ++i){
		if(this.dataList[i].id == id){
			return i;	
		}
	}
	return -1;
}

function remove(id){
	var found = this.find(id)
	if(found > -1){
		var el = this.dataList[found]
		this.dataList.splice(found, 1);
		return el;
	}
	return "no item found"
}


let todo = new item();
let inProgress = new item();
let complete = new item();

/*todo.add(1, "first", "first description")
todo.add(2, "second", "second description")
todo.add(3, "third", "third description")
inProgress.add(1, "one", "one under progress")
inProgress.add(2, "two", "second under progress")
complete.add(1, "one", "first done")
*/

function todoAdd(){
	for(var i = 0; i < todo.size(); i++){
		$(".todo").append("<div class='todoBlock'><div class='main-block'><div class='titID'>"+todo.dataList[i].id+". "+todo.dataList[i].title+"</div><div class='desc'>"+todo.dataList[i].description+"</div></div><div class='goto'><a class='start'>Start</a><a class='done'>Done</a></div></div>");
	}
}
function inprogressAdd(){
	for(var i = 0; i < inProgress.size(); i++){
		$(".Inprogress").append("<div class='progressBlock'><div class='main-block'><div class='titID'>"+inProgress.dataList[i].id+". "+inProgress.dataList[i].title+"</div><div class='desc'> "+inProgress.dataList[i].description+"</div></div><div class='goto'><a class='done'>Done</a></div></div>");
	}
}
function completeAdd(){
	for(var i = 0; i < complete.size(); i++){
		$(".Complete").append("<div class='completeBlock'><div class='main-block'><div class='titID'>"+complete.dataList[i].id+". "+complete.dataList[i].title+"</div><div class='desc'>  "+complete.dataList[i].description+"</div></div></div>");
	}
}

todoAdd();
inprogressAdd();
completeAdd();

function getData(v, t){
	if(v != "" && t != ""){
		todo.add(todo.top + 1, v, t)
		$(".todo").html("<h3>Tasks To Do's</h3>");
		todoAdd();
	}
}

function prepopulate(){
	$(".todo").html("<h3>Tasks To Do's</h3>");
	todoAdd();
}

function populateprogress(title, desc){
    inProgress.add(inProgress.top + 1, title, desc);
	$(".Inprogress").html("<h3>On Going Tasks</h3>");
	inprogressAdd();
}

function preprogress(){
	$(".Inprogress").html("<h3>On Going Tasks</h3>");
	inprogressAdd();
}

function populatecomplete(title, desc){
    complete.add(complete.top + 1, title, desc);
	$(".Complete").html("<h3>Completed Task</h3>");
	completeAdd();
}

$(document).on('click', '.goto a', function(){
	var block = $(this).parent().parent();
	if(block.hasClass("todoBlock")){
		var todoId = $(this).parents(".todoBlock")[0].innerText.split("")[0]
		var foundId = todo.find(todoId)
		var removed = todo.remove(todoId);
		prepopulate();
		if($(this).hasClass("start")){
			populateprogress(removed.title, removed.description);
		}
		else{
			populatecomplete(removed.title, removed.description);
		}
	}
	else if(block.hasClass("progressBlock")){
		var proId = $(this).parents(".progressBlock")[0].innerText.split("")[0];
		var foundId = inProgress.find(proId)
		var removed = inProgress.remove(proId);
		preprogress();
		populatecomplete(removed.title, removed.description);
	}
})