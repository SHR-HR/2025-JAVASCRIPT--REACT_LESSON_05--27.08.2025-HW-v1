// Импортируем стили из CSS-модуля для компонента TodoItem
import styles from './TodoItem.module.scss';
// Импортируем компонент Card для обертки задачи
import Card from '../../ui/Card/Card.jsx';
// Импортируем компонент Badge для отображения статуса
import Badge from '../../ui/Badge/Badge.jsx';

/**
 * Компонент TodoItem - карточка отдельной задачи
 * Отображает информацию о задаче: заголовок, статус, ID и пользователя
 * @param {Object} props - Свойства компонента
 * @param {Object} props.todo - Объект задачи
 * @param {number} props.todo.id - Уникальный идентификатор задачи
 * @param {string} props.todo.title - Заголовок/название задачи
 * @param {boolean} props.todo.completed - Статус выполнения задачи (true - выполнена, false - не выполнена)
 * @param {number} props.todo.userId - Идентификатор пользователя, которому принадлежит задача
 */
const TodoItem = ({ todo }) => {
  // Деструктурируем объект задачи для удобства доступа к свойствам
  const { id, title, completed, userId } = todo;

  // Возвращаем JSX разметку компонента TodoItem
  return (
    // Обертка задачи в компонент Card с дополнительным CSS-классом
    <Card className={styles.todoItem}>
      {/* Верхняя часть карточки с мета-информацией */}
      <div className={styles.header}>
        {/* Компонент Badge для отображения статуса задачи */}
        <Badge 
          // Выбираем вариант стиля в зависимости от статуса выполнения
          variant={completed ? 'success' : 'warning'}
          // Дополнительный CSS-класс для стилизации
          className={styles.statusBadge}
        >
          {/* Текст бейджа в зависимости от статуса */}
          {completed ? 'Выполнено' : 'В процессе'}
        </Badge>
        {/* Контейнер для дополнительной мета-информации */}
        <div className={styles.meta}>
          {/* Отображение ID задачи */}
          <span className={styles.id}>#{id}</span>
          {/* Отображение информации о пользователе */}
          <span className={styles.user}>Пользователь {userId}</span>
        </div>
      </div>
      
      {/* Основное содержимое карточки с заголовком задачи */}
      <div className={styles.content}>
        {/* Заголовок задачи третьего уровня */}
        <h3 className={styles.title}>
          {title}
        </h3>
      </div>
      
      {/* Нижняя часть карточки с дополнительной информацией о статусе */}
      <div className={styles.footer}>
        <div className={styles.status}>
          {/* Индикатор статуса с динамическими классами */}
          <div className={`${styles.indicator} ${completed ? styles.completed : styles.pending}`}>
            {/* Точечный индикатор */}
            <span className={styles.dot}></span>
            {/* Текстовое описание статуса */}
            <span className={styles.text}>
              {completed ? 'Задача выполнена' : 'Требует выполнения'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Экспортируем компонент TodoItem для использования в других частях приложения
export default TodoItem;





