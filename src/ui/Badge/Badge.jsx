// Импортируем стили из CSS-модуля для компонента Badge
import styles from './Badge.module.scss';

/**
 * Компонент Badge - цветной бейдж для отображения статусов, меток и другой информации
 * Универсальный компонент с поддержкой различных вариантов стилей и размеров
 * @param {Object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Содержимое бейджа (текст или другие React-элементы)
 * @param {string} props.variant - Вариант стиля бейджа: 
 *                                 'primary' (основной) | 'success' (успех) | 
 *                                 'warning' (предупреждение) | 'error' (ошибка)
 * @param {string} props.size - Размер бейджа: 'sm' (маленький) | 'md' (средний) | 'lg' (большой)
 * @param {string} props.className - Дополнительные CSS классы для кастомизации
 * @param {Object} props.props - Остальные свойства (передаются в элемент span)
 */
const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  // Формируем полное имя CSS класса из нескольких частей
  const badgeClassName = [
    styles.badge,           // Базовый класс бейджа
    styles[variant],        // Класс варианта стиля (primary, success, etc.)
    styles[size],           // Класс размера (sm, md, lg)
    className               // Пользовательские классы
  ].filter(Boolean)         // Фильтруем пустые значения
   .join(' ');              // Объединяем в строку через пробел

  // Возвращаем JSX разметку компонента Badge
  return (
    // Элемент span с вычисленными классами и переданными свойствами
    <span 
      className={badgeClassName}  // Динамически сформированные классы
      {...props}                  // Все остальные свойства (aria-*, data-*, и т.д.)
    >
      {/* Отображаем содержимое бейджа */}
      {children}
    </span>
  );
};

// Экспортируем компонент Badge для использования в других частях приложения
export default Badge;








