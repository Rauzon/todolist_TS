import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from './tasks-reducer'
import {TasksStateType} from '../App'
import {addTodolistAC, removeTodolistAC} from './todolists-reducer'
import {TaskPriorities, TaskStatuses} from '../api/todolists-api'

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC({todolistId: "todolistId2", taskId: "2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});
test('correct task should be added to correct array', () => {
    const action = addTaskAC({
        task: {
            description: "kekus",
            title: "title of kekus",
            status: TaskStatuses.New,
            priority: TaskPriorities.Later,
            startDate: "string",
            deadline: "string",
            id: "string",
            todoListId: "todolistId1",
            order: 2,
            addedDate: "string",
        }
    });
    const action2 = addTaskAC({
        task: {
            description: "kekus2",
            title: "juice",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Later,
            startDate: "string",
            deadline: "string",
            id: "string",
            todoListId: "todolistId2",
            order: 2,
            addedDate: "string",
        }
    });

    const endState = tasksReducer(startState, action)
    const endState2 = tasksReducer(startState, action2)

    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState2["todolistId2"][0].id).toBeDefined();
    expect(endState2["todolistId2"][0].title).toBe("juice");
    expect(endState2["todolistId2"][0].status).toBe(TaskStatuses.Completed);
});
test('status of specified task should be changed', () => {

    let task = {
        id: "3", title: "Vue", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
        startDate: '', deadline: '', addedDate: '', order: 2, priority: TaskPriorities.Middle
    }

    const action = updateTaskAC({task, todolistId: "todolistId1", taskId: '3'});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][2].title).toBe('Vue');
    expect(endState["todolistId1"][2].priority).toBe(TaskPriorities.Middle);
    expect(endState["todolistId2"][1].order).toBe(0);
});
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        todolist: {
            id: "todolistId03",
            title: "todo3",
            addedDate: "string",
            order: 3,
        }
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
    const action = removeTodolistAC({todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
