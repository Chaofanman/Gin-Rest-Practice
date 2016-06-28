package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"gopkg.in/gorp.v1"
	"log"
	"strconv"
)

type User struct {
	Id        int64  `db:"id" json:"id"`
	Firstname string `db: "firstname" json: "firstname"`
	Lastname  string `db: "lastname" json: "lastname"`
}

//make dbmap global
var dbmap = initDb()

//initalize db called ginmysql
func initDb() *gorp.DbMap {
	db, err := sql.Open("mysql", "root:mysqlpassword@/ginmysql")
	checkErr(err, "sql.Open failed")

	//idk what this does huhu
	dbmap := &gorp.DbMap{
		Db:      db,
		Dialect: gorp.MySQLDialect{"InnoDB", "UTF8"},
	}

	//creates table User in dbmap
	dbmap.AddTableWithName(User{}, "User").SetKeys(true, "Id")
	//make the table if it doesn't exist
	err = dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create table failed")

	return dbmap
}

func checkErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}

//allow other apps to access this server
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Add("Access-Control-Allow-Origin", "*")
		c.Next()
	}
}

func main() {
	//set gin
	r := gin.Default()
	//activate Cors
	r.Use(Cors())

	//set routes
	v1 := r.Group("api/v1")
	{
		v1.GET("/users", GetUsers)
		v1.GET("/users/:id", GetUser)
		v1.POST("/users", PostUser)
		v1.PUT("/users/:id", UpdateUser)
		v1.DELETE("/users/:id", DeleteUser)
		//for XMLHttpRequests
		v1.OPTIONS("/users", OptionsUser)
		v1.OPTIONS("/users/:id", OptionsUser)
	}

	r.Run(":9090")
}

func GetUsers(c *gin.Context) {
	//changed to var from type
	//also make it a slice since multiple users will be gotten
	var users []User

	//sql statement to get all users
	_, err := dbmap.Select(&users, "SELECT * FROM user")

	if err != nil {
		c.JSON(404, gin.H{"error": "no users in table"})
	}

	//makes users JSON and gives the site 200 code
	c.JSON(200, users)
	// curl -i http://localhost:9090/api/v1/users
}

func GetUser(c *gin.Context) {
	//get a user using its id
	id := c.Params.ByName("id")
	//user is just one because we are just getting one user
	var user User

	err := dbmap.SelectOne(&user, "SELECT * FROM user WHERE id=?", id)

	if err == nil {
		user_id, _ := strconv.ParseInt(id, 0, 64)

		content := &User{
			Id:        user_id,
			Firstname: user.Firstname,
			Lastname:  user.Lastname,
		}
		c.JSON(200, content)
	} else {
		c.JSON(404, gin.H{"error": "user not found"})
	}

	// curl -i http://localhost:9090/api/v1/users/1
}

func PostUser(c *gin.Context) {
	var user User
	//Bind checks content-type of parameter and binds immediately
	c.Bind(&user)

	//if they wrote for first name and last name
	if user.Firstname != "" && user.Lastname != "" {
		//insert
		if insert, _ := dbmap.Exec(`INSERT INTO user(firstname, lastname) VALUES(?, ?)`, user.Firstname, user.Lastname); insert != nil {
			fmt.Println(insert.LastInsertId())
			user_id, err := insert.LastInsertId()

			if err == nil {
				content := &User{
					Id:        user_id,
					Firstname: user.Firstname,
					Lastname:  user.Lastname,
				}
				c.JSON(201, content)
			} else {
				checkErr(err, "Failed insert")
			}
		}
	} else {
		c.JSON(422, gin.H{"error": "fields are empty"})
	}
	// curl -i -X POST -H "Content-Type: application/json" -d "{ \"firstname\": \"Thea\", \"lastname\": \"Queen\" }" http://localhost:9090/api/v1/users
}

func UpdateUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user User
	err := dbmap.SelectOne(&user, "SELECT * FROM user WHERE id=?", id)

	if err == nil {
		var json User
		c.Bind(&json)

		user_id, _ := strconv.ParseInt(id, 0, 64)

		user := User{
			Id:        user_id,
			Firstname: json.Firstname,
			Lastname:  json.Lastname,
		}
		if user.Firstname != "" && user.Lastname != "" {
			_, err := dbmap.Update(&user)

			if err == nil {
				c.JSON(200, user)
			} else {
				checkErr(err, "Update failed")
			}
		} else {
			c.JSON(422, gin.H{"error": "fields are empty"})
		}
	} else {
		c.JSON(404, gin.H{"error": "user not found"})
	}
	//curl -i -X PUT -H "Content-Type: application/json" -d "{ \"firstname\": \"Mara\", \"lastname\": \"Shen\" }" http://localhost:9090/api/v1/users/1

}

func DeleteUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user User
	err := dbmap.SelectOne(&user, "SELECT * FROM user WHERE id=?", id)

	if err == nil {
		_, err = dbmap.Delete(&user)

		if err == nil {
			c.JSON(200, gin.H{"id #" + id: "deleted"})
		} else {
			checkErr(err, "Delete failed")
		}
	} else {
		c.JSON(404, gin.H{"error": "user not found"})
	}
	//curl -i -X DELETE http://localhost:9090/api/v1/users/1
}

func OptionsUser(c *gin.Context) {
	c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, PUT, DELETE")
	c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	c.Next()
}
