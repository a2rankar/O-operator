
# Путь к папке с миграциями
$migrationsFolder = "./"

# Получаем все .sql файлы и применяем их по очереди
Get-ChildItem -Path $migrationsFolder -Filter *.sql | ForEach-Object {
    $sqlFile = $_.FullName
    Write-Output "Applying $sqlFile"
    & "C:\Program Files\PostgreSQL\15\bin\psql.exe" -U postgres -d ticketDb -f $sqlFile
    $env:PGPASSWORD = "qwe123"
}
