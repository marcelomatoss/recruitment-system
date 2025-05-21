
package models

import (
	"time"
)

type Job struct {
	ID          uint      `json:"id" gorm:"primarykey"`
	Title       string    `json:"title" gorm:"not null"`
	Description string    `json:"description"`
	Location    string    `json:"location"`
	Department  string    `json:"department"`
	Status      string    `json:"status" gorm:"default:'open'"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Processes   []Process `json:"processes,omitempty" gorm:"foreignKey:JobID"`
}
