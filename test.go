package main

import (
    "fmt"
    "html"
    "log"
    "net/http"
    "io/ioutil"
)

func main() {

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	body, err := ioutil.ReadAll(r.Body)
        if err != nil {
            log.Printf("Error reading body: %v", err)
            http.Error(w, "can't read body", http.StatusBadRequest)
            return
        } else {
		log.Printf(string(body))
	}
    })

    log.Fatal(http.ListenAndServe(":8081", nil))

}

