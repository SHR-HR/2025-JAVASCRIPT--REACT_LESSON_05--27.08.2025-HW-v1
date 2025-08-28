// Импортируем стили из CSS-модуля для компонента TodoList
import styles from './TodoList.module.scss';
// Импортируем компонент TodoItem для отображения отдельных задач
import TodoItem from '../TodoItem/TodoItem.jsx';

/**
 * Компонент TodoList - список задач с обработкой различных состояний
 * Отображает загрузку, ошибки, пустой список или сам список задач
 * @param {Object} props - Свойства компонента
 * @param {Array} props.todos - Массив объектов задач для отображения
 * @param {boolean} props.loading - Флаг состояния загрузки (true - идет загрузка)
 * @param {string|null} props.error - Текст ошибки или null если ошибок нет
 */
const TodoList = ({ todos, loading, error }) => {
  // Состояние загрузки - показываем индикатор загрузки
  if (loading) {
    return (
      // Контейнер для состояний с ARIA-ролью для доступности
      <div className={styles.stateContainer} role="status" aria-live="polite">
        <div className={styles.loader}>
          {/* Индикатор спиннера загрузки */}
          <div className={styles.loaderSpinner}></div>
          {/* Текст состояния загрузки */}
          <p className={styles.loaderText}>Загружаем задачи...</p>
        </div>
      </div>
    );
  }

  // Состояние ошибки - показываем сообщение об ошибке
  if (error) {
    return (
      // Контейнер для состояний с ARIA-ролью для ошибок
      <div className={styles.stateContainer} role="alert" aria-live="assertive">
        <div className={styles.error}>
          {/* Иконка ошибки (эмодзи) */}
          <div className={styles.errorIcon}>⚠️</div>
          {/* Заголовок ошибки */}
          <h3 className={styles.errorTitle}>Ошибка загрузки</h3>
          {/* Сообщение об ошибке (переданное из props) */}
          <p className={styles.errorMessage}>{error}</p>
          {/* Кнопка для повторной попытки загрузки */}
          <button 
            className={styles.errorButton}
            // Обработчик клика - перезагрузка страницы
            onClick={() => window.location.reload()}
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  // Пустой список - показываем сообщение о отсутствии задач
  if (todos.length === 0) {
    return (
      // Контейнер для состояний с ARIA-ролью
      <div className={styles.stateContainer} role="status" aria-live="polite">
        <div className={styles.empty}>
          {/* Иконка пустого состояния (эмодзи) */}
          <div className={styles.emptyIcon}>📝</div>
          {/* Заголовок пустого состояния */}
          <h3 className={styles.emptyTitle}>Задач не найдено</h3>
          {/* Сообщение с подсказкой для пользователя */}
          <p className={styles.emptyMessage}>
            Попробуйте изменить фильтры или добавить новые задачи
          </p>
        </div>
      </div>
    );
  }

  // Нормальное состояние - отображаем список задач
  return (
    <div className={styles.todoList}>
      {/* Шапка списка с количеством задач */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          Найдено задач: <span className={styles.count}>{todos.length}</span>
        </h2>
      </div>
      
      {/* Сетка для отображения карточек задач */}
      <div className={styles.grid}>
        {/* Маппим массив задач в компоненты TodoItem */}
        {todos.map((todo) => (
          // Компонент задачи с уникальным ключом (id) и передачей данных задачи
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

// Экспортируем компонент TodoList для использования в других частях приложения
export default TodoList;







