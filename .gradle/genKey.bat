@echo off

REM Set the path to your JDK bin directory
set JAVA_HOME="c:\Program Files\Java\jdk-19"
set KEYTOOL=%JAVA_HOME%\bin\keytool

REM Set the desired keystore file path and name
set KEYSTORE_FILE=%~dp0keystore.keystore

REM Generate the keystore
%KEYTOOL% -genkey -v -keystore %KEYSTORE_FILE% -alias mykeyalias -keyalg RSA -keysize 2048 -validity 10000
