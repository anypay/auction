docker login --username $DOCKER_USER \
             --password $DOCKER_PASSWORD 

docker tag anypay anypay/auction:latest

docker push anypay/auction:latest

