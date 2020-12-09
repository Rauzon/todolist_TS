import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer,
    setTodolistAC, changeTodoListEntityAC
} from './todolists-reducer'
import {v1} from 'uuid'
import {action} from "@storybook/addon-actions";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', entityStatus: 'idle', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', entityStatus: "idle", order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolistTitle = {
        id: 'new todolist',
        title: 'how to find anything',
        addedDate: '6-06-66',
        order: 2,
    }

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    let expectedState = {
        id: 'new todolist',
        title: 'how to find anything',
        addedDate: '6-06-66',
        order: 2,
        filter: "all",
        entityStatus: "idle",
    }


    expect(endState.length).toBe(3)
    expect(endState[0]).toEqual(expectedState)
    expect(endState[0].filter).toBe('all')
    expect(endState[0].entityStatus).toBe('idle')
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const action = changeTodolistFilterAC(todolistId2, newFilter)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('correct getting todolists', () => {

    let action = setTodolistAC(startState)

    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})
test('should be change todolist\'s entityStatus', () => {

    let action = changeTodoListEntityAC('succeeded', todolistId1)

    const endState = todolistsReducer(startState, action)

    let expectedState = {
        id: todolistId1,
        title: 'What to learn',
        filter: 'all',
        addedDate: '',
        entityStatus: 'succeeded',
        order: 0
    };

    expect(endState[0]).toEqual(expectedState)
})


