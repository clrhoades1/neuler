const NAME = 'TASKS'
const ADD_TASK = `${NAME}/ADD_TASK`
const COMPLETE_TASK = `${NAME}/COMPLETE_TASK`

export const addTask = ({taskId, group, algorithm, startTime, parameters, query}) => ({
  type: ADD_TASK,
  taskId,
  group,
  algorithm,
  startTime,
  parameters,
  query
})

export const completeTask = ({taskId, result}) => ({
  type: COMPLETE_TASK,
  taskId,
  result
})

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      const newState = [...state]
      newState.unshift({
        taskId: action.taskId,
        group: action.group,
        algorithm: action.algorithm,
        startTime: action.startTime,
        result: action.result,
        parameters: action.parameters,
        query: action.query,
        completed: false
      })
      return newState
    case COMPLETE_TASK:
      const tasks = [...state]
      const task = tasks.find(task => task.taskId === action.taskId)
      if (task) {
        task.result = action.result
        task.completed = true
        return tasks
      } else {
        return state
      }
    default:
      return state
  }

  return state
}
