#### Twitter clone - work in progress

##### To run app:

Add following env variables to your .env file in server folder:

1. PostgresDB vars:
   dbPort=
   user=
   password=
   database=
2. Access and secret key of your AWS account:
   ACCESS_KEY=
   SECRET_KEY=
   BUCKET_NAME=
3. Sendgrid api key to send mails:
   SENDGRID_API_KEY=
4. PORT, access and refresh token secrets
   PORT=
   ACCESS=
   REFRESH=
   Go to client app:
5. cd ./client && npm install && npm start
6. cd ./server && npm install && npm run start:dev
