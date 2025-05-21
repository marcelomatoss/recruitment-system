
package controllers

import (
	"net/http"
	"rhselect/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type JobController struct {
	DB *gorm.DB
}

func NewJobController(db *gorm.DB) *JobController {
	return &JobController{DB: db}
}

// GetAll returns all jobs
func (jc *JobController) GetAll(c *gin.Context) {
	var jobs []models.Job
	result := jc.DB.Find(&jobs)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get jobs"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"jobs": jobs})
}

// GetOne returns a job by ID
func (jc *JobController) GetOne(c *gin.Context) {
	id := c.Param("id")
	var job models.Job
	result := jc.DB.First(&job, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"job": job})
}

// Create adds a new job
func (jc *JobController) Create(c *gin.Context) {
	var job models.Job
	if err := c.ShouldBindJSON(&job); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := jc.DB.Create(&job)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create job"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Job created successfully", "job": job})
}

// Update modifies an existing job
func (jc *JobController) Update(c *gin.Context) {
	id := c.Param("id")
	var job models.Job
	
	// Check if job exists
	if jc.DB.First(&job, id).RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
		return
	}

	// Update job with new data
	if err := c.ShouldBindJSON(&job); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	jc.DB.Save(&job)
	c.JSON(http.StatusOK, gin.H{"message": "Job updated successfully", "job": job})
}

// Delete removes a job
func (jc *JobController) Delete(c *gin.Context) {
	id := c.Param("id")
	var job models.Job
	
	// Check if job exists
	if jc.DB.First(&job, id).RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Job not found"})
		return
	}

	jc.DB.Delete(&job)
	c.JSON(http.StatusOK, gin.H{"message": "Job deleted successfully"})
}
