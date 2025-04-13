### Running the development image (graceful shutdown)
- Run ```docker-compose build```
- Run ```docker-compose up```
- Navigate to http://localhost:8000/

### Running the production image (will need to manually kill)
- Run ```docker build -t rpc/alpine .```
- Run ```docker run -p 8000:8000 rpc/alpine```
- Navigate to http://localhost:8000/
