
package models

import (
	"time"
)

type Candidate struct {
	ID           uint      `json:"id" gorm:"primarykey"`
	Name         string    `json:"name" gorm:"not null"`
	Email        string    `json:"email" gorm:"not null"`
	Phone        string    `json:"phone"`
	ResumeURL    string    `json:"resume_url"`
	Notes        string    `json:"notes"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	Processes    []Process `json:"processes,omitempty" gorm:"many2many:candidate_processes;"`
}
