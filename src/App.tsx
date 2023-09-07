import { Header } from "./components/Header"
import styles from './App.module.css'
import './global.css'
import { PlusCircle } from "phosphor-react"
import { Task } from "./components/Task"
import { FormEvent, useState } from "react"
import { v4 as uuid } from "uuid"
import { EmptyTasks } from "./components/EmptyTasks"
import { TaskInfo } from "./components/TaskInfo"

interface TaksBaseProps {
  id: string
  task: string
  isCompleted: boolean
}

export function App() {
  const [tasks, setTasks] = useState<TaksBaseProps[]>([])
  const [newTask, setNewTask] = useState<string>('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTaskToAdd = {
      id: uuid(),
      task: newTask,
      isCompleted: false
    }

    setTasks([...tasks, newTaskToAdd])
    setNewTask('')
  }

  function checkTask(id: string) {
    const tasksWithTaskChecked = tasks.filter((task) => { 
      if (task.id === id) {
        return task.isCompleted = true
      } else {
        return task
      }
    })

    setTasks(tasksWithTaskChecked)
  }

  function deleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== id
    })

    setTasks(tasksWithoutDeletedOne)
  }

  const completedTask = tasks.filter(task => task.isCompleted === true)

  return (
   <div>
      <Header />
      <main>
        <form onSubmit={handleCreateNewTask} className={styles.newTask}>
          <input 
            placeholder="Adicione uma nova tarefa" 
            value={newTask}
            onChange={(e) => {setNewTask(e.target.value)}}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={16} weight="bold" />
          </button>
        </form>

        <div className={styles.taskContainer}>
          <TaskInfo 
            createdTasks={tasks.length}
            completedTask={completedTask.length}
          />

          <div className={styles.taskList}>
            {tasks.length !== 0 ? (
              tasks.map(({id, task, isCompleted}) => {
                return (
                  <Task 
                    key={id}
                    id={id}
                    task={task}
                    isCompleted={isCompleted}
                    handleCheckedTask={checkTask}
                    onDeleteTask={deleteTask}
                  />
                )
              })
            ) : (
              <EmptyTasks />
            )}
            
          </div>
          
        </div>

      </main>
   </div>
  )
}
