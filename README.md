# Basic MEAN App:
## Node with Express and MongoDB on the backend, Angular UI. Mongoose for MongoDB access.
## To run : 
1. clone the repo
2. install node
3. run npm install against package.json
4. either run node against the app.js file (```node app.js```) or gulp against the gulpfile - gulp is preferrable so the configs from the gulpfile get picked up
5. install MongoDB, run ```mongod``` from the ```bin``` directory
6. Pre-populate some data in the dataAPI collection either using the app (see use case #5 below) or from the mongo shell - use objects with ```fname``` and ```lname``` defined, for example ```db.dataApi.insert({ fname: "Saul", lname: "Goodman" })``` 

## Supported Use Cases and example requests :
1. HTTP GET - static data: ```curl http://localhost:8000/```
2. HTTP GET to retrieve all records from the collection: ```curl http://localhost:8000/api/data``` (each individual record has a ```self``` link injected)
3. HTTP GET to retrieve all records filtered by the ```lname``` value : ```curl http://localhost:8000/api/data?lname=Goodman```
4. HTTP GET to retrieve a record by it's ID : ```curl http://localhost:8000/api/data/56ddec148612d22406d7ee1d``` (if the record data is found the response gets a link injected pointing at the corresponding route for Use Case #3).
5. HTTP POST to add a record ```curl -X POST -H "Content-Type: application/json" -d '{
    "fname": "Walter",
    "lname": "White"
  }' http://localhost:8000/api/data```
6. HTTP PUT to update a record: ```curl -X PUT -H "Content-Type: application/json" -d '{
    "fname": "Jesse",
    "lname": "Pinkman"
  }' http://localhost:8000/api/data/56ddec148612d22406d7ee1d``` - note that not providing a value of a field will wipe it out, use PATCH if the intent is to keep it intact
7. HTTP PATCH to update a record ```curl -X PATCH -H "Content-Type: application/json" -d '{
    "fname": "Newfname"
  }' http://localhost:8000/api/data/56dd01610403aa8c15df5151``` - unlike PUT this will keep all the other record data intact if values for the fields are not provided
8. HTTP DELETE to remove a record ```curl -X DELETE http://localhost:8000/api/data/56dd043b144275c42e832c88```

##  General notes:
1. For dealing with JSON output in the terminal I highly recommend using jq - https://stedolan.github.io/jq/


##  TODOs :
- refactor all routes into the controllers
- Angular UI
- mocha/should/sinon/postman tests
