# CRAS-Angular-SC

This is group project for SCSJ4383-01 SOFTWARE CONSTRUCTION

Jira: https://smallbrains.atlassian.net/jira/software/projects/CAS/boards/3 <br>

This project consists of backend (NodeJS) with MySQL as database, and frontend (Angular)

**Docker** <br>
Docker compose will create 3 images <br>
mysqldb - serve database using mysql:5.7 (with volume) <br>
api - serve backend API using node:16-alpine <br>
ui - serve frontend UI using nginx:1.17.1-alpine <br>
<br>

Part 2
Code Smell 1
- [x] Identify data clumps
- [x] Refactoring (Introduce Parameter Object)

Code Smell 2
- [x] Identify duplicated code
- [x] Refactoring (Extract superclass)

Code Smell 3
- [x] Identify clarification comments
- [x] Refactoring (Removing clarification comments)
