// Импортируем базовую конфигурацию ESLint от JavaScript
// js содержит рекомендуемые правила для JavaScript
import js from '@eslint/js'

// Импортируем глобальные переменные для различных сред выполнения
// globals предоставляет предопределенные глобальные переменные для browser, node и др.
import globals from 'globals'

// Импортируем плагин ESLint для React
// react предоставляет правила для корректного использования React
import react from 'eslint-plugin-react'

// Импортируем плагин ESLint для React Hooks
// reactHooks предоставляет правила для корректного использования хуков React
import reactHooks from 'eslint-plugin-react-hooks'

// Импортируем плагин ESLint для React Refresh
// reactRefresh предоставляет правила для горячей перезагрузки React компонентов
import reactRefresh from 'eslint-plugin-react-refresh'

// Экспортируем массив конфигураций ESLint по умолчанию
// Каждый объект в массиве представляет отдельную конфигурацию
export default [
  // Первая конфигурация: указываем какие файлы игнорировать
  {
    ignores: ['dist'] // Игнорируем папку dist (собранные файлы для production)
  },
  
  // Вторая конфигурация: настройки для JavaScript и JSX файлов
  {
    // Применяем эту конфигурацию ко всем файлам с расширениями .js и .jsx
    files: ['**/*.{js,jsx}'],
    
    // Настройки языка JavaScript
    languageOptions: {
      // Версия ECMAScript 2020 (ES11)
      ecmaVersion: 2020,
      
      // Глобальные переменные браузера (window, document, console и т.д.)
      globals: globals.browser,
      
      // Настройки парсера
      parserOptions: {
        // Использовать последнюю версию ECMAScript
        ecmaVersion: 'latest',
        
        // Включить поддержку JSX (синтаксиса React)
        ecmaFeatures: { 
          jsx: true 
        },
        
        // Использовать модули ES6 (import/export)
        sourceType: 'module',
      },
    },
    
    // Настройки для плагина React
    settings: { 
      react: { 
        // Указываем версию React для корректной работы правил
        version: '18.3' 
      } 
    },
    
    // Подключаем плагины ESLint
    plugins: {
      // Плагин для основных правил React
      react,
      
      // Плагин для правил React Hooks (используется с префиксом 'react-hooks')
      'react-hooks': reactHooks,
      
      // Плагин для правил React Refresh (используется с префиксом 'react-refresh')
      'react-refresh': reactRefresh,
    },
    
    // Правила ESLint и их настройки
    rules: {
      // Расширяем рекомендуемые правила для JavaScript
      ...js.configs.recommended.rules,
      
      // Расширяем рекомендуемые правила для React
      ...react.configs.recommended.rules,
      
      // Расширяем правила для нового JSX transform (начиная с React 17)
      ...react.configs['jsx-runtime'].rules,
      
      // Расширяем рекомендуемые правила для React Hooks
      ...reactHooks.configs.recommended.rules,
      
      // Отключаем правило 'react/jsx-no-target-blank'
      // Это правило требует rel="noreferrer" для target="_blank" ссылок
      // Мы отключаем его, чтобы разрешать target="_blank" без дополнительных атрибутов
      'react/jsx-no-target-blank': 'off',
      
      // Настраиваем правило для React Refresh
      // Предупреждает, если файл экспортирует что-то кроме React компонентов
      // Это важно для корректной работы горячей перезагрузки
      'react-refresh/only-export-components': [
        'warn', // Уровень серьезности: предупреждение
        { 
          // Разрешать экспорт констант (кроме React компонентов)
          allowConstantExport: true 
        },
      ],
    },
  },
]

/*
  Важные заметки о конфигурации ESLint:

  1. **Иерархия конфигураций**: Конфигурации применяются в порядке их определения
  2. **Плагины**: Добавляют новые правила для специфических технологий (React, Hooks)
  3. **Правила**: Могут иметь три уровня:
     - 'off' или 0 - правило отключено
     - 'warn' или 1 - предупреждение (не прерывает выполнение)
     - 'error' или 2 - ошибка (прерывает выполнение)
  4. **React Refresh**: Правило важно для разработки с горячей перезагрузкой
  5. **Глобальные переменные**: globals.browser добавляет все стандартные браузерные API
  6. **Версия React**: Указание версии помогает ESLint применять корректные правила

  Эта конфигурация обеспечивает:
  - Проверку JavaScript и JSX кода
  - Поддержку современных возможностей ECMAScript
  - Проверку корректности использования React и Hooks
  - Оптимальные настройки для разработки React-приложений
*/






