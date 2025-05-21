
package controllers

import (
	"net/http"
	"rhselect/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CandidateController struct {
	DB *gorm.DB
}

func NewCandidateController(db *gorm.DB) *CandidateController {
	return &CandidateController{DB: db}
}

// GetAll returns all candidates
func (cc *CandidateController) GetAll(c *gin.Context) {
	var candidates []models.Candidate
	result := cc.DB.Find(&candidates)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get candidates"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"candidates": candidates})
}

// GetOne returns a candidate by ID
func (cc *CandidateController) GetOne(c *gin.Context) {
	id := c.Param("id")
	var candidate models.Candidate
	result := cc.DB.First(&candidate, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Candidate not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"candidate": candidate})
}

// Create adds a new candidate
func (cc *CandidateController) Create(c *gin.Context) {
	var candidate models.Candidate
	if err := c.ShouldBindJSON(&candidate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result := cc.DB.Create(&candidate)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create candidate"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Candidate created successfully", "candidate": candidate})
}

// Update modifies an existing candidate
func (cc *CandidateController) Update(c *gin.Context) {
	id := c.Param("id")
	var candidate models.Candidate
	
	// Check if candidate exists
	if cc.DB.First(&candidate, id).RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Candidate not found"})
		return
	}

	// Update candidate with new data
	if err := c.ShouldBindJSON(&candidate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	cc.DB.Save(&candidate)
	c.JSON(http.StatusOK, gin.H{"message": "Candidate updated successfully", "candidate": candidate})
}

// Delete removes a candidate
func (cc *CandidateController) Delete(c *gin.Context) {
	id := c.Param("id")
	var candidate models.Candidate
	
	// Check if candidate exists
	if cc.DB.First(&candidate, id).RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Candidate not found"})
		return
	}

	cc.DB.Delete(&candidate)
	c.JSON(http.StatusOK, gin.H{"message": "Candidate deleted successfully"})
}
