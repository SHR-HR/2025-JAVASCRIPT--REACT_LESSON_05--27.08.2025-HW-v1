// Импортируем хуки useState и useEffect из React для управления состоянием и побочными эффектами
import { useState, useEffect } from 'react';
// Импортируем стили из CSS-модуля для компонента Header
import styles from './Header.module.scss';

/**
 * Компонент Header - фиксированный (sticky) заголовок с blur эффектом
 * Меняет внешний вид при прокрутке страницы
 */
const Header = () => {
  // Создаем состояние для отслеживания факта прокрутки страницы
  const [isScrolled, setIsScrolled] = useState(false);

  // Используем хук useEffect для обработки событий прокрутки
  useEffect(() => {
    /**
     * Обработчик события прокрутки
     * Определяет, прокручена ли страница больше чем на 20 пикселей
     */
    const handleScroll = () => {
      // Проверяем положение прокрутки по вертикали
      const scrolled = window.scrollY > 20;
      // Обновляем состояние в зависимости от прокрутки
      setIsScrolled(scrolled);
    };

    // Добавляем обработчик события прокрутки к объекту window
    // { passive: true } оптимизирует производительность для touch-устройств
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Проверяем начальное состояние прокрутки при монтировании компонента
    handleScroll();

    // Функция очистки: удаляем обработчик события при размонтировании компонента
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании

  // Возвращаем JSX разметку компонента Header
  return (
    // Элемент header с динамическими классами: базовый класс и дополнительный при прокрутке
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Контейнер для центрирования содержимого */}
      <div className={styles.container}>
        {/* Обертка для содержимого заголовка */}
        <div className={styles.content}>
          {/* Заголовок первого уровня с иконкой и текстом */}
          <h1 className={styles.title}>
            {/* Иконка-эмодзи перед текстом */}
            <span className={styles.icon}>🌟</span>
            {/* Текст названия приложения */}
            Glass Todos
          </h1>
          {/* Подзаголовок с описанием приложения */}
          <p className={styles.subtitle}>
            Современное управление задачами с glass-дизайном
          </p>
        </div>
      </div>
    </header>
  );
};

// Экспортируем компонент Header для использования в других частях приложения
export default Header;



