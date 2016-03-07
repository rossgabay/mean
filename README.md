# Basic MEAN App:
## Node with Express and MongoDB on the backend, Angular UI. Mongoose for MongoDB access.
## To run : 
1. clone the repo
2. install node
3. run npm install against package.json
4. either run node against the app.js file (```node app.js```) or gulp against the gulpfile - gulp is preferrable so the configs from the gulpfile get picked up
5. install MongoDB, run ```mongod``` from the ```bin``` directory
6. Pre-populate some data in the dataAPI collection either using the app (TODO) or from the mongo shell - use objects with ```fname``` and ```lname``` defined, for example ```db.dataApi.insert({ fname: "Saul", lname: "Goodman" })``` 

## Supported Use Cases and example requests :
1. HTTP GET - static data: ```curl http://localhost:8000/```
2. HTTP GET to retrieve all records from the collection: ```curl http://localhost:8000/api/data```
3. HTTP GET to retrieve all records filtered by the ```lname``` value : ```curl http://localhost:8000/api/data?lname=Goodman```
4. HTTP GET to retrieve a record by it's ID : ```curl http://localhost:8000/api/data/56ddec148612d22406d7ee1d```

##  Config notes:
1.    


##  TODOs :
- PUT and POST support to add and modify records
- UI
- tests etc...
