
package controllers

import (
	"net/http"
	"rhselect/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ProcessController struct {
	DB *gorm.DB
}

func NewProcessController(db *gorm.DB) *ProcessController {
	return &ProcessController{DB: db}
}

// GetAll returns all selection processes
func (pc *ProcessController) GetAll(c *gin.Context) {
	var processes []models.Process
	result := pc.DB.Preload("Job").Preload("Candidate").Find(&processes)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get processes"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"processes": processes})
}

// GetOne returns a process by ID
func (pc *ProcessController) GetOne(c *gin.Context) {
	id := c.Param("id")
	var process models.Process
	result := pc.DB.Preload("Job").Preload("Candidate").First(&process, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Process not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"process": process})
}

// Create adds a new selection process
func (pc *ProcessController) Create(c *gin.Context) {
	var process models.Process
	if err := c.ShouldBindJSON(&process); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verify that the candidate and job exist
	var candidate models.Candidate
	var job models.Job
	
	if pc.DB.First(&candidate, process.CandidateID).RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Candidate not found"})
		return
	}
	
	if pc.DB.First(&job, process.JobID).RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Job not found"})
		return
	}

	result := pc.DB.Create(&process)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create process"})
		return
	}

	// Preload relationships for response
	pc.DB.Preload("Job").Preload("Candidate").First(&process, process.ID)

	c.JSON(http.StatusCreated, gin.H{"message": "Process created successfully", "process": process})
}

// Update modifies an existing selection process
func (pc *ProcessController) Update(c *gin.Context) {
	id := c.Param("id")
	var process models.Process
	
	// Check if process exists
	if pc.DB.First(&process, id).RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Process not found"})
		return
	}

	// Update process with new data
	if err := c.ShouldBindJSON(&process); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	pc.DB.Save(&process)
	
	// Preload relationships for response
	pc.DB.Preload("Job").Preload("Candidate").First(&process, process.ID)
	
	c.JSON(http.StatusOK, gin.H{"message": "Process updated successfully", "process": process})
}

// Delete removes a selection process
func (pc *ProcessController) Delete(c *gin.Context) {
	id := c.Param("id")
	var process models.Process
	
	// Check if process exists
	if pc.DB.First(&process, id).RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Process not found"})
		return
	}

	pc.DB.Delete(&process)
	c.JSON(http.StatusOK, gin.H{"message": "Process deleted successfully"})
}
