import styles from './TaskInfo.module.css'

interface TaskInfoProps {
  createdTasks: number
  completedTask: number
}

export function TaskInfo({ createdTasks, completedTask }: TaskInfoProps) {
  return (
    <header>
      <div className={styles.taskInfo}>
        <strong>Tarefas criadas</strong>
        <span>{createdTasks}</span>
      </div>
      <div className={styles.completedTask}>
        <strong>Concluídas</strong>
        <span>{completedTask} de {createdTasks}</span>
      </div>
    </header>
  )
}