package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"regexp"
)

type Receipts struct {
	Retailer     string `json:"retailer"`
	PurchaseDate string `json:"purchaseDate"`
	PurchaseTime string `json:"purchaseTime"`
	Items        []Item `json:"items"`
	Total        string `json:"total"`
}

type Item struct {
	ShortDescription string `json:"shortDescription"`
	Price            string `json:"price"`
}

func main() {
	fmt.Println("main invoked!")
	router := mux.NewRouter()
    router.HandleFunc("/receipts/process", ProcessReceiptsHandler)
	router.HandleFunc("/receipts/{id}/points", GetPointsHandler)
    http.Handle("/", router)
}

func ProcessReceiptsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("ProcessReceiptsHandler invoked!")
}

func GetPointsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("GetPointsHandler invoked!")
}
