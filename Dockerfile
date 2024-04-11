FROM node:19

# Set workdir:
WORKDIR /usr/src/app

# Install PostgreSQL client:
RUN apt-get update && apt-get install -y postgresql-client-15

# Install deps:
COPY package*.json ./
RUN npm install

# Copy all files:
COPY . .

CMD npm run start