$env:PGPASSWORD = "qwe123"
$migrationsFolder = "./"

Get-ChildItem -Path $migrationsFolder -Filter *.sql | ForEach-Object {
    $sqlFile = $_.FullName
    Write-Output "Applying $sqlFile"
    & "C:\Program Files\PostgreSQL\15\bin\psql.exe" -U admin -d ticketdb -h localhost -f $sqlFile
}
