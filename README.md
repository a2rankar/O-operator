 Миграции базы данных PostgreSQL (ручной способ)

Проект использует ручное выполнение миграций через .sql-файлы. Все миграции находятся в папке:  


C:\Users\ASUS\Downloads\Projects\Test_projects\O-operator\migrations


🧱 Шаг 1: Убедитесь, что установлен PostgreSQL и доступна утилита psql

Проверьте, что у вас есть установленный PostgreSQL и команда psql.exe доступна по пути:


powershell


"C:\Program Files\PostgreSQL\15\bin\psql.exe" --version
🧱 Шаг 2: Проверьте подключение к базе данных

Попробуйте подключиться к базе:


powershell


"C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -d ticketDb
Если соединение успешно — появится приглашение #, можно выйти командой \q.


🧱 Шаг 3: Запуск миграций

Перейдите в папку с миграциями:


powershell


cd "C:\Users\ASUS\Downloads\Projects\Test_projects\O-operator\migrations"
Запустите скрипт:


powershell


.\start_migration.ps1
