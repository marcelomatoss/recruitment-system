
package models

import (
	"time"
)

type ProcessStage string

const (
	ApplicationReview ProcessStage = "application_review"
	InitialScreening  ProcessStage = "initial_screening"
	Interview         ProcessStage = "interview"
	TechnicalTest     ProcessStage = "technical_test"
	FinalInterview    ProcessStage = "final_interview"
	JobOffer          ProcessStage = "job_offer"
	Hired             ProcessStage = "hired"
	Rejected          ProcessStage = "rejected"
)

type Process struct {
	ID            uint         `json:"id" gorm:"primarykey"`
	CandidateID   uint         `json:"candidate_id"`
	JobID         uint         `json:"job_id"`
	CurrentStage  ProcessStage `json:"current_stage" gorm:"default:'application_review'"`
	Status        string       `json:"status" gorm:"default:'active'"`
	Notes         string       `json:"notes"`
	CreatedAt     time.Time    `json:"created_at"`
	UpdatedAt     time.Time    `json:"updated_at"`
	Job           Job          `json:"job,omitempty" gorm:"foreignKey:JobID"`
	Candidate     Candidate    `json:"candidate,omitempty" gorm:"foreignKey:CandidateID"`
}
