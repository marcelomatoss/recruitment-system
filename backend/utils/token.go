
package utils

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// JWTClaims represents the claims in the JWT token
type JWTClaims struct {
	UserID uint `json:"user_id"`
	jwt.RegisteredClaims
}

// GenerateToken creates a new JWT token for the user
func GenerateToken(userID uint) (string, error) {
	// Get JWT secret from environment or use a default for development
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "rh-select-secret-key-change-in-production"
	}

	// Token expires after 24 hours
	expirationTime := time.Now().Add(24 * time.Hour)
	
	// Create the claims
	claims := &JWTClaims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
		},
	}

	// Create the token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	
	// Sign the token with the secret
	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// ValidateToken verifies a JWT token and returns the claims
func ValidateToken(tokenString string) (*JWTClaims, error) {
	// Get JWT secret from environment or use a default for development
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "rh-select-secret-key-change-in-production"
	}

	// Parse the token
	token, err := jwt.ParseWithClaims(
		tokenString, 
		&JWTClaims{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(jwtSecret), nil
		},
	)
	
	if err != nil {
		return nil, err
	}

	// Validate the token
	claims, ok := token.Claims.(*JWTClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
