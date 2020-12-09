import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolists-reducer'
import {tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../AppWithRedux'
import {v1} from "uuid";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC({
        id: v1(),
        title: "some title",
        addedDate: "12-12-21",
        order: 1,
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});
