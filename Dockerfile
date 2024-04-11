FROM node:19

# Set workdir:
WORKDIR /usr/src/app

# Install PostgreSQL client:
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ <CODENAME>-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN apt-get update && apt-get install -y postgresql-client-15

COPY ./path/to/downloaded/postgresql-client-15.deb /tmp/

RUN dpkg -i /tmp/postgresql-client-15.deb && rm /tmp/postgresql-client-15.deb

# Install deps:
COPY package*.json ./
RUN npm install

# Copy all files:
COPY . .

CMD npm run start