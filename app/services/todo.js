(function (angular) {
    'use strict';

    angular
        .module('app')
        .factory('todo', service);

    service.$inject = ['api'];

    var minLenghtOfName = 5;
    var listId = 1;
    var todoId = 1;
    var todoListArray = [];

    function service(api) {
        api.get('myTodo')
        .then(function (res) {
            _.remove(todoListArray);
            _.assign(todoListArray, res.data);
            // todoListArray = res.data;
        });

        // api.post('myTodo', {id:3, name: 'Just a task', todos: []})
        // .then(function (res) {
        //     alertify.success('step by step..');
        // });

        



        return {
            todoLists: todoListArray,
            addList: addTodoList,
            addATodo: addTodoIntoList,
            remove: remove
        };

        // Add TODO List
        function addTodoList(name) {
            if (_.size(name) <= minLenghtOfName) {
                alertify.error('Give me a longer name!');
            } else {
                if (isDuplicatedList(name)) {
                    alertify.error('This list already exists!');
                } else {
                    if (todoListArray.length > 0) {
                        var last = _.last(todoListArray);
                        listId = last.id + 1; 
                    }

                    var todoList = {
                        id: listId, 
                        name: name, 
                        todos: [] //new object for every todo
                    };

                    todoListArray.push(todoList);
                    api.post('myTodo', todoList)
                    .then(function(res){
                        alertify.success('Successfully added Todo List :)');
                    });
                }
            }
        }

        // Add task in TODO List
        function addTodoIntoList(listId, name) {
            if (name == "" || !name) {
                alertify.error('The task name cannot be empty!'); 
            } else {
            var list = _.find(todoListArray, function(obj) { 
                return obj.id == listId; }); 
            if (isDuplicatedTodo(list, name)) {
            alertify.error('The task already exists!');
            } else {   
                if (list && list.todos.length > 0) {
                var lastTodo = _.last(list.todos);
                todoId = lastTodo.id + 1; 
                }
                    var todo = {
                    id: todoId, 
                    name: name
                };
                if(_.size(name) <= minLenghtOfName){
                    alertify.error('The name is too short!');
                } else {
                    list.todos.push(todo);
                    alertify.success('Successfully added Todo Item!');
                   }
                }
            }
        }
        
        // Check if TODO List is duplicated
        function isDuplicatedList(name) {
        return _.some(todoListArray, function(todoList) { 
                    return todoList.name == name; 
                });
        }

        // Check if todo in TODO List is duplicated
        function isDuplicatedTodo(list, todoName) {
        return _.some(list.todos, function(todo) { 
                    return todo.name == todoName; 
                });
        }        

        // Remove todo/todoList
        function remove(list, id) {
            var index = _.findIndex(list, function(obj) {
                return obj.id == id; // find the index of todo list
            });
                list.splice(index, 1); // delete only one element on click ( for example: if set 1 to 2 -> two elements will be deleted ;) ) 

            api.del('myTodo/' + id)
            .then(function(res){
                alertify.success('deleted');
            });
        }

    }
}(angular));