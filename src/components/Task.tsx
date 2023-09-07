import { CheckCircle, Circle, Trash } from "phosphor-react"
import styles from './Task.module.css'

export interface TaskProps {
  id: string
  task: string
  isCompleted: boolean
  handleCheckedTask: (id: string) => void
  onDeleteTask: (id: string) => void
}

export function Task({ 
  id,
  task, 
  isCompleted, 
  handleCheckedTask,
  onDeleteTask 
}: TaskProps) {
  return (
    <div className={styles.task}>
      <div className={styles.taskContent}>
        <button 
          id={id}
          type="button"
          className={isCompleted ? styles.checkedButton : styles.uncheckedButton} 
          onClick={() => {
            handleCheckedTask(id)
          }}
        >
          {isCompleted ? (
            <CheckCircle size={17} weight="fill" />
          ) : (
            <Circle size={17} />
          )}
        </button>
        <label 
          htmlFor={id}
          className={isCompleted ? styles.taskCompleted : styles.taskUncompleted}
        >
          {task}
        </label>
      </div>
      <button 
        type="button"
        onClick={() => {
          onDeleteTask(id)
        }}
      >
        <Trash size={18} />
      </button>
    </div>
  )
}