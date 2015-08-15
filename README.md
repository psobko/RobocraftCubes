# RobocraftCubes
This is a basic tool to view and edit a JSON/CSV containg all the cubes available in [Robocraft](http://robocraftgame.com/) as well as additional data about their type,	tier,	flop cost,  mass, armor, cost, and shape. Data can be imported from a local file and any changes made can be exported. The purpose of this project is to make it easier for other developers to develop Robocraft related applications, not to mention this data is always changing and having an updated list is nice.

This project was created for the [Nvidia App Challenge](http://www.overwolf.com/nvidia-app-challenge/).

Once the Overwolf games.events API is live each cube should have an in-game ID code and this list will have to be updated to include those codes.

![Screenshot](http://i.imgur.com/29gEUie.png)

###Usage
Load up index.html and the included `robocraftCubes.json` will be loaded into the table. To edit any value just click on the field and begin typing. Controls on the bottom right of the screen let you add and delete rows. Controls on the rop right of the screen let you import and export data.

The `type` and `shape` columns use the following enums:

```javascript
var ArmorCubeType = {
	Cube : 0,
	Prism : 1,
	Tetra : 2,
	Inner : 3,
	RoundPrism : 4,
	RoundTetra : 5,
	RoundInner : 6
}

var CubeType = {
	Armor: 0,
	Movement: 1,
	Hardware: 2,
	Special: 3,
	Cosmetic: 4
}
```

###TODO
* Ability to add/delete columns
* Field validation
* Load via URL
* Overwolf app

###License
This project is freely distributable under the terms of the MIT license.