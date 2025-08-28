// Импортируем хук useState из React для управления состоянием компонента
import { useState } from 'react';
// Импортируем CSS-модуль для стилизации компонента
import styles from './Controls.module.scss';
// Импортируем константы фильтров, сортировки и пользователей из файла констант
import { USER_OPTIONS, STATUS_OPTIONS, SORT_OPTIONS, DEFAULT_FILTERS } from '../../constants/filters.jsx';

/**
 * Компонент Controls - панель управления фильтрами и сортировкой для задач
 * @param {Function} onFiltersChange - Коллбек-функция, вызываемая при изменении фильтров
 *                                        Принимает новый объект фильтров в качестве аргумента
 */
const Controls = ({ onFiltersChange }) => {
  // Инициализируем состояние фильтров с значениями по умолчанию
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  /**
   * Обработчик изменения фильтров
   * @param {string} key - Ключ фильтра (например, 'userId', 'status', 'sort')
   * @param {any} value - Новое значение фильтра
   */
  const handleFilterChange = (key, value) => {
    // Создаем новый объект фильтров, объединяя текущие фильтры с новым значением
    const newFilters = { ...filters, [key]: value };
    // Обновляем локальное состояние фильтров
    setFilters(newFilters);
    // Вызываем коллбек, передавая новые фильтры в родительский компонент
    onFiltersChange(newFilters);
  };

  // Возвращаем JSX разметку компонента
  return (
    // Основной контейнер компонента с CSS-классом
    <div className={styles.controls}>
      {/* Внутренний контейнер для группировки элементов управления */}
      <div className={styles.container}>
        
        {/* Группа фильтра по пользователю */}
        <div className={styles.filterGroup}>
          {/* Лейбл для выпадающего списка пользователей */}
          <label htmlFor="user-select" className={styles.label}>
            Пользователь
          </label>
          {/* Выпадающий список для выбора пользователя */}
          <select
            id="user-select" // ID для связи с лейблом
            className={styles.select} // CSS-класс для стилизации
            value={filters.userId || ''} // Текущее значение фильтра (пустая строка если null)
            // Обработчик изменения значения
            onChange={(e) => {
              // Преобразуем значение: пустая строка -> null, иначе -> число
              const value = e.target.value === '' ? null : Number(e.target.value);
              // Обновляем фильтр по userId
              handleFilterChange('userId', value);
            }}
          >
            {/* Генерируем опции для каждого пользователя */}
            {USER_OPTIONS.map((option) => (
              <option 
                key={option.value || 'all'} // Уникальный ключ (значение или 'all' если нет значения)
                value={option.value || ''} // Значение опции (пустая строка если нет значения)
              >
                {option.label} {/* Отображаемый текст опции */}
              </option>
            ))}
          </select>
        </div>

        {/* Группа фильтра по статусу задач */}
        <div className={styles.filterGroup}>
          {/* Fieldset для группировки радиокнопок статуса */}
          <fieldset className={styles.fieldset}>
            {/* Легенда (заголовок) для группы статусов */}
            <legend className={styles.legend}>Статус задач</legend>
            {/* Контейнер для сегментированного контроля (радиокнопок в виде кнопок) */}
            <div className={styles.segmentedControl}>
              {/* Генерируем радиокнопки для каждого статуса */}
              {STATUS_OPTIONS.map((option) => (
                <label
                  key={option.value} // Уникальный ключ
                  // Динамически добавляем класс active если статус выбран
                  className={`${styles.segmentedItem} ${
                    filters.status === option.value ? styles.active : ''
                  }`}
                >
                  {/* Скрытый input типа radio */}
                  <input
                    type="radio"
                    name="status" // Общее имя для группировки радиокнопок
                    value={option.value} // Значение радиокнопки
                    checked={filters.status === option.value} // Выбрана ли эта кнопка
                    // Обработчик изменения статуса
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className={styles.segmentedInput} // CSS-класс для стилизации
                  />
                  {/* Видимая часть радиокнопки (текст) */}
                  <span className={styles.segmentedLabel}>
                    {option.label} {/* Отображаемый текст статуса */}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Группа сортировки */}
        <div className={styles.filterGroup}>
          {/* Fieldset для группировки радиокнопок сортировки */}
          <fieldset className={styles.fieldset}>
            {/* Легенда (заголовок) для группы сортировки */}
            <legend className={styles.legend}>Сортировка</legend>
            {/* Контейнер для группы радиокнопок с ARIA-ролью для доступности */}
            <div className={styles.radioGroup} role="radiogroup" aria-label="Сортировка задач">
              {/* Генерируем радиокнопки для каждого варианта сортировки */}
              {SORT_OPTIONS.map((option) => (
                <label key={option.value} className={styles.radioLabel}>
                  {/* Скрытый input типа radio */}
                  <input
                    type="radio"
                    name="sort" // Общее имя для группировки радиокнопок
                    value={option.value} // Значение радиокнопки
                    checked={filters.sort === option.value} // Выбрана ли эта кнопка
                    // Обработчик изменения сортировки
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                    className={styles.radioInput} // CSS-класс для стилизации
                    // ARIA-атрибут для указания выбранного состояния (доступность)
                    aria-checked={filters.sort === option.value}
                  />
                  {/* Кастомный визуальный элемент радиокнопки */}
                  <span className={styles.radioCustom}></span>
                  {/* Текст описания радиокнопки */}
                  <span className={styles.radioText}>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        
      </div>
    </div>
  );
};

// Экспортируем компонент для использования в других частях приложения
export default Controls;




