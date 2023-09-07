import styles from './EmptyTasks.module.css'

import clipboard from '../assets/clipboard.svg'

export function EmptyTasks() {
  return (
    <div className={styles.empty}>
      <img src={clipboard} alt="" />
      <div>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <span>Crie tarefas e organize seus itens a fazer</span>
      </div>
    </div>
  )
}