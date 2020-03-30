@echo off
IF NOT EXIST db (md db)
mongodb\bin\mongod.exe --dbpath db

