# NodeJS_Exam

##Pensum progress:
We should include most of the following:

* html - css  ✓
* git				  ✓
* Express             (-)
* Middleware          (-)
* MongoDB             (-)
* 4x Restful API      (-)<br/>
  -Create<br/>
  -Read<br/>
  -ReadOne</br>
  -Update<br/>
  -Delete
* Websockets?         (-)
* Other               (-) <br/>
  -Buffer <br/>
  -File System<br/>
  -Global Objects<br/>
  -Modules<br/>
  -Path<br/>
  -Readline<br/>
  -Stream<br/>
  -Timers<br/>
  -URL<br/>
  -util<br/>
  -Events<br/>

###Spiller informationer:

* Name
* Team
* Position
* Picture

Alle spillerenes billeder (links), navne, klub og position er tilføjet til repositoriet i en txt fil.


---

#Players API

1. ###Create</br>
Create player by giving the attributes
  Name
  Team
  Position
  Picture - Will be added with file saving in the future. Will be using the GridFS from mongoDB

2. ###Read
Read a player by specifying calling a GET. You can also specify an ID, if you want to get a specific player. 

3. ###Update
You can update a player by calling the PUT and specifying an ID. 

4. ###Delete
You can delete a player by calling the Delete and specifying an ID.

---

#Team API
This API is made for bundling players to a team.

1. ###Create</br>
Create a team by giving the attributes
  TeamName
  Player_id

2. ###Read
Read a team by specifying calling a GET. You can also specify an ID, if you want to get a specific team. 

3. ###Update
You can update a team by calling the PUT and specifying an ID. 

4. ###Delete
You can delete a team by calling the Delete and specifying an ID.
