@ECHO OFF
REM Zip up download.js, index.js, package.json, and .env into ../output/backend.zip
mkdir temp
mkdir ..\output
copy package.json temp
copy download.js temp
copy index.js temp
copy .env temp
cd temp
powershell.exe Compress-Archive -Path * -DestinationPath ..\..\output\backend.zip
cd ..
rmdir /s /q temp
