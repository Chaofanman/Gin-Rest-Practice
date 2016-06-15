package main

import (
	"github.com/gin-gonic/gin"
	"strconv"
)

type User struct {
	Id        int64  `db:"id" json:"id"`
	Firstname string `db: "firstname" json: "firstname"`
	Lastname  string `db: "lastname" json: "lastname"`
}

func main() {
	//set gin
	r := gin.Default()

	//set routes
	v1 := r.Group("api/v1")
	{
		v1.GET("/users", GetUsers)
		v1.GET("/users/:id", GetUser)
		// v1.POST("/users", PostUser)
		// v1.PUT("/users/:id", UpdateUser)
		// v1.DELETE("/users/:id", UpdateUser)
	}

	r.Run(":9090")
}

func GetUsers(c *gin.Context) {
	type Users []User

	//static data
	var users = Users{
		User{Id: 1, Firstname: "Gabriel", Lastname: "Patron"},
		User{Id: 2, Firstname: "Mara", Lastname: "Shen"},
	}

	//makes users JSON and gives the site 200 code
	c.JSON(200, users)
	// curl -i http://localhost:8080/api/v1/users
}

func GetUser(c *gin.Context) {
	//get a user using its id
	id := c.Params.ByName("id")

	//convernt the JSON to an int
	user_id, _ := strconv.ParseInt(id, 0, 64)

	if user_id == 1 {
		content := gin.H{
			"id":        user_id,
			"firstname": "Gabriel",
			"lastname":  "Patron",
		}
		c.JSON(200, content)
	} else if user_id == 2 {
		content := gin.H{
			"id":        user_id,
			"firstname": "Mara",
			"lastname":  "Shen",
		}
		c.JSON(200, content)
	} else {
		content := gin.H{
			"error": "user id #" + id + "not found",
		}
		c.JSON(400, content)
	}

	// curl -i http://localhost:8080/api/v1/users/1
}
