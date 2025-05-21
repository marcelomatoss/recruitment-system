
package main

import (
	"log"
	"os"
	"rhselect/config"
	"rhselect/controllers"
	"rhselect/middleware"
	"rhselect/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize database
	db := config.SetupDB()

	// Auto migrate the models
	db.AutoMigrate(&models.User{}, &models.Candidate{}, &models.Job{}, &models.Process{})

	// Create a new Gin router
	router := gin.Default()

	// CORS configuration
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Initialize controllers
	authController := controllers.NewAuthController(db)
	candidateController := controllers.NewCandidateController(db)
	jobController := controllers.NewJobController(db)
	processController := controllers.NewProcessController(db)

	// Routes
	// Auth routes
	router.POST("/auth/register", authController.Register)
	router.POST("/auth/login", authController.Login)

	// Protected routes
	protected := router.Group("/")
	protected.Use(middleware.AuthMiddleware())
	{
		// User routes
		protected.GET("/auth/user", authController.GetUser)

		// Candidate routes
		protected.GET("/candidates", candidateController.GetAll)
		protected.GET("/candidates/:id", candidateController.GetOne)
		protected.POST("/candidates", candidateController.Create)
		protected.PUT("/candidates/:id", candidateController.Update)
		protected.DELETE("/candidates/:id", candidateController.Delete)

		// Job routes
		protected.GET("/jobs", jobController.GetAll)
		protected.GET("/jobs/:id", jobController.GetOne)
		protected.POST("/jobs", jobController.Create)
		protected.PUT("/jobs/:id", jobController.Update)
		protected.DELETE("/jobs/:id", jobController.Delete)

		// Process routes
		protected.GET("/processes", processController.GetAll)
		protected.GET("/processes/:id", processController.GetOne)
		protected.POST("/processes", processController.Create)
		protected.PUT("/processes/:id", processController.Update)
		protected.DELETE("/processes/:id", processController.Delete)
	}

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start the server
	log.Printf("Server running on port %s", port)
	router.Run(":" + port)
}
