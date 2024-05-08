@echo off

REM Create temp folder
mkdir temp
REM create output folder
mkdir ..\output
REM copy the build directory and the package.json file to the temp folder
xcopy /E /I build temp
copy package.json temp
REM zip the contents of the temp folder into ../output/backend.zip
cd temp
powershell.exe Compress-Archive -Path * -DestinationPath ..\..\output/frontend.zip