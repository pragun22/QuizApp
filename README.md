# Welocme to QuizApp!

# Introduction to the project:
Golang has been used for database server following REST API . The front end is made through Reactjs.

Owner: Pragun Saxena

## Features:
- Registration and login for users
- Multiple genre of quizzes
- Multiple types of questions, image, video and MCQ.
- Leaderboard
- Admin privileges to one user. He has privilege to do the following:
    - View/Create/Delete quizzes
    - Create/Delete/Edit questions/options in each quiz
    - View all users
    - Delete users
- Login through Google handle.
- passwords are hashed

## Running the program:
- Running the react app:
	- Go to the "react-app" folder and run yarn start
    - `yarn start`
- Running the Go server:
    - go to to go folder
    - go to go/bin and see the packages list
    - Go to the go/src folder and run `go run` command
	- `go run 5 - CRUD API.go`
The app will start on your default browser.

#Go pkg
This is where all your external packages are installed.
-type the following:-
 `go get golang.org/x/crypto/bcrypt`
 `go get github.com/gin-contrib/cors`  
  `go get github.com/gin-gonic/gin`
  `go get github.com/jinzhu/gorm`
  `go get github.com/jinzhu/gorm/dialects/sqlite`  
