package main

import (
   "fmt"
   "golang.org/x/crypto/bcrypt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                         // declaring the db globally
var err error

type Person struct {
   ID uint `json:"id"`
   FirstName string `json:"firstname"`
   LastName string `json:"lastname"`
   City string `json:"city"`
   Email string `json:"email"`
   Username string `json:"username"`
   Password string `json:"password"`
}

type Questions struct{
  ID uint `json:"id"`
  Quizid string `json:"quizid"`
  Stat string `json:"stat"`
  Op1 string `json:"op1"`
  Op2 string `json:"op2"`
  Op3 string `json:"op3"`
  Op4 string `json:"op4"`
  Ans1 string `json:"ans1"`
  Ans2 string `json:"ans2"`
  Ans3 string `json:"ans3"`
  Ans4 string `json:"ans4"`
  Img string `json:"img"`
  Vid string `json:"vid"`
}

type Quizes struct{
  ID int `json:"id"`
  Name string `json:"name"`
  Genre string `json:"genre"`
  Type string `json:"type"`
}

type Leaderboards struct{
  ID uint `json:"id"`
  Quizid string  `json:"quizid"`
  Quizname string `json:"quizname"`
  User string `json:"user"`
  Score string `json:"score"`
  Genre string `json:"genre"`
}

func main() {
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()
   db.LogMode(true)
   db.AutoMigrate(&Person{})
   db.AutoMigrate(&Questions{})
   db.AutoMigrate(&Quizes{})
   db.AutoMigrate(&Leaderboards{})
   r := gin.Default()
   r.GET("/quiz", GetQuizes)
   r.GET("/people/", GetPeople)                             // Creating routes for each functionality
   r.GET("/question/:id", GetQuestions)
   r.GET("/ques/:id", GetQues)
   r.GET("/quizes/:genre", GetgQuizes)
   r.GET("/leader/", GetLeader)
   r.GET("/history/:user", History)
   r.GET("/leader/:genre", GetLeaderG)
   r.GET("/leaderquiz/:id", QuizLeader)
   r.GET("/type/:id", GetType)
   r.GET("/genre/:id", GetGenre)
   r.GET("/quiz/:id", GetQuiz)
   r.POST("/people/", GetPerson)
   r.POST("/quiz", CreateQuiz)
   r.POST("/leader", CreateLeader)
   r.POST("/people", CreatePerson)
   r.POST("/question", CreateQuestion)
   r.PUT("/people/:id", UpdatePerson)
   r.PUT("/ques/:id", UpdateQuestion)
   r.DELETE("/people/:id", DeletePerson)
   r.DELETE("/questions/:id", DeleteQuestion)
   r.DELETE("/quiz/:id", DeleteQuiz)
   r.Use((cors.Default()))
   r.Run(":8080")                                           // Run on port 8080
}
func GetgQuizes(c *gin.Context) {
   genre := c.Params.ByName("genre")
   var quiz []Quizes
   if err := db.Where("genre = ?", genre).Find(&quiz).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
       c.JSON(200, quiz)
    }
}
func History(c *gin.Context) {
   user := c.Params.ByName("user")
   var lead []Leaderboards
   if err := db.Where("user = ?", user).Order("score desc").Find(&lead).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
       c.JSON(200, lead)
    }
}
func DeleteQuiz(c *gin.Context) {
   id := c.Params.ByName("id")
   var quiz Quizes
   d := db.Where("id = ?", id).Delete(&quiz)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func DeleteQuestion(c *gin.Context) {
   id := c.Params.ByName("id")
   var ques Questions
   d := db.Where("id = ?", id).Delete(&ques)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}
func UpdatePerson(c *gin.Context) {
   var person Person
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&person)
   db.Save(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}
func UpdateQuestion(c *gin.Context) {
   var ques Questions
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&ques).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&ques)
   db.Save(&ques)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, ques)
}


func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func CreatePerson(c *gin.Context) {
   var person Person
   c.BindJSON(&person)
   if err := db.Where("username = ?", person.Username).First(&person).Error; err == nil {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     c.JSON(100, person);
     fmt.Println(err)
   } else{
     pass := []byte(person.Password)
    hashedPassword, err := bcrypt.GenerateFromPassword(pass, bcrypt.DefaultCost)
    if err != nil {
         panic(err)
    }
    person.Password = string(hashedPassword)
   fmt.Println(string(hashedPassword))
     db.Create(&person)
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     c.JSON(200, person)
   }
}
func CreateQuiz(c *gin.Context) {
   var quiz Quizes
   c.BindJSON(&quiz)
   db.Create(&quiz)
   db.Last(&quiz)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, quiz.ID)
}
func CreateLeader(c *gin.Context) {
   var lead Leaderboards
   c.BindJSON(&lead)
   db.Create(&lead)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, lead)
}
func CreateQuestion(c *gin.Context) {
   var question Questions
   c.BindJSON(&question)
   db.Create(&question)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, question)
}
func GetPerson(c *gin.Context) {
   var person Person
   var person2 Person
   c.BindJSON(&person)
   if err := db.Where("username = ?", person.Username).First(&person2).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else{
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
     if (CheckPasswordHash(person.Password, person2.Password)){
       c.JSON(250, person)
     }
  }
}
func GetType(c *gin.Context) {
  id := c.Params.ByName("id")
   var quiz Quizes
   if err := db.Where("id = ?", id).First(&quiz).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
       c.JSON(250, quiz.Type)
   }
}
func GetGenre(c *gin.Context) {
  id := c.Params.ByName("id")
   var quiz Quizes
   if err := db.Where("id = ?", id).First(&quiz).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
       c.JSON(250, quiz)
   }
}


func GetLeader(c *gin.Context) {
   var lead []Leaderboards
   if err := db.Order("score desc").Find(&lead).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, lead)
   }
}
func GetLeaderG(c *gin.Context) {
  genre := c.Params.ByName("genre")
   var lead []Leaderboards
   if err := db.Where("genre = ?", genre).Order("score desc").Find(&lead).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, lead)
   }
}

func QuizLeader(c *gin.Context) {
  id := c.Params.ByName("id")
   var lead []Leaderboards
   if err := db.Where("quizid = ?",id).Order("score desc").Find(&lead).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, lead)
   }
}
func GetPeople(c *gin.Context) {
   var people []Person
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, people)
   }
}
func GetQuizes(c *gin.Context) {
   var quizes []Quizes
   if err := db.Find(&quizes).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, quizes)
   }
}
func GetQuestions(c *gin.Context) {
   id := c.Params.ByName("id")
   var ques []Questions
   if err := db.Where("quizid = ?",id).Find(&ques).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, ques)
   }
}
func GetQues(c *gin.Context) {
   id := c.Params.ByName("id")
   var ques Questions
   if err := db.Where("id = ?",id).First(&ques).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, ques)
   }
}
func GetQuiz(c *gin.Context) {
   id := c.Params.ByName("id")
   var quiz []Questions
   if err := db.Where("quizid = ?", id).Find(&quiz).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
     c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
       c.JSON(200, quiz)
    }
}
