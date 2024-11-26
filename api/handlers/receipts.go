package receipts

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"regexp"
	"github.com/gorilla/mux"

	
)

func ProcessReceiptsHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("func ProcessReceiptsHandler invoked!")

}

// func GetPointsHandler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Println("func GetPointsHandler invoked!")
// 	vars := mux.Vars(r)
// 	receiptID := vars["id"]

// }
