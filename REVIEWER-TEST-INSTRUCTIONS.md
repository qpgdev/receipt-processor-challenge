### Running the development image
- Run ```docker-compose build```
- Run ```docker-compose up```
- Navigate to http://localhost:8000/

### Testing endpoints via cURL in the terminal
- To test the **Process Receipts** endpoint using `morning-receipt.json`, run ```curl -X POST http://localhost:8000/receipts/process \
-H "Content-Type: application/json" \
-d @examples/morning-receipt.json```
- To test the **Process Receipts** endpoint using `simple-receipt.json`, run ```curl -X POST http://localhost:8000/receipts/process \
-H "Content-Type: application/json" \
-d @examples/simple-receipt.json```

### Running the production image (will need to manually kill)
- Run ```docker build -t rpc/alpine .```
- Run ```docker run -p 8000:8000 rpc/alpine```
- Navigate to http://localhost:8000/
