// Импортируем необходимые хуки из React
import { useState, useEffect, useRef } from 'react';
// Импортируем настроенный клиент API
import apiClient from '../api/client.jsx';

/**
 * Кастомный хук useTodos для работы с API задач
 * Обеспечивает загрузку, фильтрацию и сортировку задач
 * @param {Object} params - Параметры фильтрации и сортировки
 * @param {number|null} params.userId - ID пользователя или null для всех пользователей
 * @param {string} params.status - Статус задач: 'all' (все) | 'completed' (выполненные) | 'active' (активные)
 * @param {string} params.sort - Направление сортировки: 'desc' (по убыванию) | 'asc' (по возрастанию)
 * @returns {Object} - Объект с состоянием: { todos, loading, error }
 */
export const useTodos = ({ userId = null, status = 'all', sort = 'desc' } = {}) => {
  // Состояние для хранения массива задач
  const [todos, setTodos] = useState([]);
  // Состояние для индикации процесса загрузки
  const [loading, setLoading] = useState(false);
  // Состояние для хранения ошибок
  const [error, setError] = useState(null);
  
  // Реф для хранения AbortController текущего запроса (для отмены)
  const abortControllerRef = useRef(null);

  // Основной эффект для загрузки задач при изменении параметров
  useEffect(() => {
    // Асинхронная функция для загрузки задач
    const fetchTodos = async () => {
      try {
        // Отменяем предыдущий запрос, если он существует
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Создаем новый AbortController для текущего запроса
        abortControllerRef.current = new AbortController();
        // Получаем signal для передачи в запрос
        const signal = abortControllerRef.current.signal;

        // Устанавливаем состояние загрузки и сбрасываем ошибки
        setLoading(true);
        setError(null);

        // Формируем объект параметров для запроса
        const params = {};
        
        // Добавляем userId в параметры, если он указан (не null)
        if (userId !== null) {
          params.userId = userId;
        }

        // Добавляем фильтр по статусу completed, если статус не 'all'
        if (status !== 'all') {
          // Преобразуем строковый статус в boolean
          params.completed = status === 'completed';
        }

        // Логируем параметры запроса для отладки
        console.log('🔍 Fetching todos with params:', params);

        // Выполняем GET-запрос к API /todos с параметрами
        const response = await apiClient.get('/todos', {
          params, // Параметры запроса
          signal, // Signal для возможности отмены запроса
        });

        // Получаем данные из ответа
        let fetchedTodos = response.data;

        // Дополнительная клиентская фильтрация по статусу (на случай если сервер не отфильтровал)
        if (status !== 'all') {
          // Определяем целевой статус выполнения
          const isCompleted = status === 'completed';
          // Фильтруем задачи по статусу выполнения
          fetchedTodos = fetchedTodos.filter(todo => todo.completed === isCompleted);
        }

        // Сортировка задач по ID (используем ID как прокси для даты создания)
        fetchedTodos.sort((a, b) => {
          if (sort === 'desc') {
            // Сортировка по убыванию (новые сначала - больший ID)
            return b.id - a.id;
          } else {
            // Сортировка по возрастанию (старые сначала - меньший ID)
            return a.id - b.id;
          }
        });

        // Логируем успешную загрузку
        console.log(`✅ Fetched ${fetchedTodos.length} todos`);
        
        // Обновляем состояние с полученными задачами
        setTodos(fetchedTodos);
        // Сбрасываем ошибки
        setError(null);
      } catch (err) {
        // Игнорируем ошибки отмены запроса (AbortError)
        if (err.name === 'CanceledError' || err.name === 'AbortError') {
          console.log('🚫 Request was cancelled');
          return;
        }

        // Логируем ошибку для отладки
        console.error('❌ Error fetching todos:', err);
        
        // Формируем понятное сообщение об ошибке для пользователя
        let errorMessage = 'Произошла ошибка при загрузке задач';
        
        // Обрабатываем различные типы ошибок
        if (err.code === 'ECONNABORTED') {
          // Ошибка таймаута запроса
          errorMessage = 'Превышено время ожидания запроса';
        } else if (err.response) {
          // Ошибка с ответом от сервера
          const status = err.response.status;
          if (status >= 500) {
            // Серверные ошибки (5xx)
            errorMessage = 'Ошибка сервера. Попробуйте позже';
          } else if (status === 404) {
            // Ресурс не найден
            errorMessage = 'Данные не найдены';
          } else if (status >= 400) {
            // Клиентские ошибки (4xx)
            errorMessage = 'Неверный запрос';
          }
        } else if (!navigator.onLine) {
          // Отсутствие интернет-соединения
          errorMessage = 'Отсутствует соединение с интернетом';
        }

        // Устанавливаем сообщение об ошибке
        setError(errorMessage);
        // Очищаем список задач при ошибке
        setTodos([]);
      } finally {
        // В любом случае снимаем состояние загрузки
        setLoading(false);
      }
    };

    // Вызываем функцию загрузки задач
    fetchTodos();

    // Функция очистки эффекта: отменяем запрос при размонтировании или смене зависимостей
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [userId, status, sort]); // Зависимости: перезапускаем эффект при изменении параметров

  // Дополнительный эффект для очистки при полном размонтировании компонента
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []); // Пустой массив зависимостей - выполняется только при размонтировании

  // Возвращаем объект с состоянием для использования в компонентах
  return {
    todos,    // Массив задач
    loading,  // Флаг загрузки
    error,    // Сообщение об ошибке (или null)
  };
};






