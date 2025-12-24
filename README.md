# qa-auto-engineer-javascript-project-89

[![hexlet-check](https://github.com/Zetyscore/qa-auto-engineer-javascript-project-89/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Zetyscore/qa-auto-engineer-javascript-project-89/actions/workflows/hexlet-check.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Zetyscore_qa-auto-engineer-javascript-project-89&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Zetyscore_qa-auto-engineer-javascript-project-89)

## Описание

Тестирование интеграции виджета `@hexlet/chatbot-v2` в React-приложение. Проект содержит форму регистрации, чат-бот виджет и автотесты по паттерну Page Object Model.

## Развертывание

```bash
npm ci
```

## Запуск

**Тесты:**
```bash
npm test              # Все тесты
npm run test:watch    # Режим наблюдения
```

**Приложение:**
```bash
npm run dev           # Dev-сервер
npm run lint          # Линтер
npm run build         # Production сборка
```

## Структура тестов

- `__tests__/widget.test.jsx` - тесты виджета
- `__tests__/app.test.jsx` - интеграционные тесты
- `__tests__/pages/` - Page Object Models
- `__tests__/setup.js` - утилиты для тестов

