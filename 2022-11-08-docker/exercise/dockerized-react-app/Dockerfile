# 1. Provide a base image. Optional but not really
FROM node:14

# 2. Set a working directory
WORKDIR /app

# 3. Copy over your app files to the working directory
COPY . .

# 4. Install dependencies
RUN npm ci

# 5. Set up any env vars
ENV PORT=8080

# 6. List what port you want to expose
EXPOSE 8080

# 7. Provide your command instruction. What does docker need
#    to run to start your app. Only ONE per docker file. Done in
#    command format insead of exec format so no shell session started
CMD ["npm", "start"]
