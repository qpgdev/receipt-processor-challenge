package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"regexp"
	"github.com/gorilla/mux"
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
	fmt.Println("func main invoked!")
	router := mux.NewRouter()
    router.HandleFunc("/receipts/process", ProcessReceiptsHandler)
	router.HandleFunc("/receipts/{id}/points", GetPointsHandler)
    http.Handle("/", router)

	log.Fatal(http.ListenAndServe(":8080", router))
}

func ProcessReceiptsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("func ProcessReceiptsHandler invoked!")

}

func GetPointsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("func GetPointsHandler invoked!")
}
