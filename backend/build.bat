@ECHO OFF
REM Zip up download.js, index.js, package.json, and .env into ../output/backend.zip
mkdir ..\output
mkdir ..\output\backend
copy package.json backend
copy download.js backend
copy index.js backend
copy .env backend