// Импортируем хук useState из React для управления состоянием компонента
import { useState } from 'react';
// Импортируем кастомный хук useTodos для работы с задачами
import { useTodos } from './hooks/useTodos.jsx';
// Импортируем константы с значениями фильтров по умолчанию
import { DEFAULT_FILTERS } from './constants/filters.jsx';
// Импортируем компоненты макета
import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
// Импортируем компоненты управления и отображения задач
import Controls from './components/Controls/Controls.jsx';
import TodoList from './components/TodoList/TodoList.jsx';

/**
 * Главный компонент приложения App
 * Является корневым компонентом, который объединяет все части приложения
 * Управляет состоянием фильтров и передает данные между компонентами
 */
const App = () => {
  // Создаем состояние для хранения текущих фильтров с начальными значениями по умолчанию
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  
  // Используем кастомный хук useTodos для получения данных о задачах
  // Хук автоматически загружает задачи при изменении фильтров
  const { todos, loading, error } = useTodos(filters);

  /**
   * Обработчик изменения фильтров
   * @param {Object} newFilters - Новые значения фильтров
   */
  const handleFiltersChange = (newFilters) => {
    // Обновляем состояние фильтров
    setFilters(newFilters);
  };

  // Возвращаем JSX разметку приложения
  return (
    // Основной контейнер приложения
    <div className="app">
      {/* Компонент шапки (хедера) приложения */}
      <Header />
      
      {/* Основное содержимое страницы */}
      <main className="main">
        {/* Контейнер для центрирования содержимого */}
        <div className="container">
          {/* Панель управления фильтрами и сортировкой */}
          <Controls onFiltersChange={handleFiltersChange} />
          
          {/* Обертка для списка задач с ARIA-атрибутами для доступности */}
          <div aria-live="polite" aria-label="Список задач">
            {/* Компонент списка задач, который обрабатывает различные состояния */}
            <TodoList todos={todos} loading={loading} error={error} />
          </div>
        </div>
      </main>
      
      {/* Компонент подвала (футера) приложения */}
      <Footer />
    </div>
  );
};

// Экспортируем компонент App для использования в качестве корневого
export default App;




