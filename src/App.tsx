import { v4 as uuid } from "uuid"
import { FormEvent, useCallback, useMemo, useState } from "react"
import { PlusCircle } from "phosphor-react"

import { Header } from "./components/Header"
import styles from './App.module.css'
import { Task } from "./components/Task"
import { EmptyTasks } from "./components/EmptyTasks"
import { TaskInfo } from "./components/TaskInfo"

import './global.css'

interface TaksBaseProps {
  id: string
  task: string
  isCompleted: boolean
}

export function App() {
  const [tasks, setTasks] = useState<TaksBaseProps[]>([])
  const [newTask, setNewTask] = useState<string>('');

  const handleCreateNewTask = useCallback((event: FormEvent) => {
    event.preventDefault()
    const newTaskToAdd = {
      id: uuid(),
      task: newTask,
      isCompleted: false
    }
    setTasks(prevTasks => [...prevTasks, newTaskToAdd])
    setNewTask('')
  }, [newTask])


  function toggleTask(id: string) {
    const tasksWithTaskChecked = tasks.map((task) => { 
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted }
      }
      return task
    })

    setTasks(tasksWithTaskChecked)
  }

  function deleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== id)

    setTasks(tasksWithoutDeletedOne)
  }

  const sortedTasks = useMemo(() => {
    return tasks.slice().sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
  }, [tasks])

  const completedTask = useMemo(() => tasks.filter(task => task.isCompleted), [tasks])

  return (
    <div>
      <Header />
      <main>
        <form onSubmit={handleCreateNewTask} className={styles.newTask}>
          <input 
            placeholder="Adicione uma nova tarefa" 
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
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
              sortedTasks.map(({id, task, isCompleted}) => (
                <Task 
                  key={id}
                  id={id}
                  task={task}
                  isCompleted={isCompleted}
                  handleCheckedTask={toggleTask}
                  onDeleteTask={deleteTask}
                />
              ))
            ) : (
              <EmptyTasks />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
