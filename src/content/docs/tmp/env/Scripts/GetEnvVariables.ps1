# 获取进程环境变量
$processEnv = [System.Environment]::GetEnvironmentVariables("Process")

# 获取用户环境变量
$userEnv = [System.Environment]::GetEnvironmentVariables("User")

# 获取系统环境变量
$systemEnv = [System.Environment]::GetEnvironmentVariables("Machine")

# 打印进程环境变量
Write-Output "=== 进程环境变量 ==="
$processEnv.GetEnumerator() | Sort-Object Key | ForEach-Object {
    Write-Output "$($_.Key)=$($_.Value)"
}

# 打印用户环境变量
Write-Output "`n=== 用户环境变量 ==="
$userEnv.GetEnumerator() | Sort-Object Key | ForEach-Object {
    Write-Output "$($_.Key)=$($_.Value)"
}

# 打印系统环境变量
Write-Output "`n=== 系统环境变量 ==="
$systemEnv.GetEnumerator() | Sort-Object Key | ForEach-Object {
    Write-Output "$($_.Key)=$($_.Value)"
}