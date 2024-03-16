FROM node:14.16-alpine

RUN yarn global add nodemon
WORKDIR /src
ADD package*.json ./
RUN yarn install
COPY . .
# Command to run when the container starts
CMD ["npm", "run", "start:both"]
