# internship-project

 Simulating this platform requires quite some changes inside the code, so if you are interested in just seeing it in action, I would recommend asking me for the Heroku URL.

This is a simulation of a client-company and a widget for consent management. For obvious reasons, the database credentials were not included in the repository, which are needed for it to work.
For this reason, inside mock-site/ and prisma/, it's required that a file named .env is added, with the following line, substituting the \<FIELDS\> with the credentials of whoever wants to test this.
  
	DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=<SCHEMA>"

Then run this command to reset the development database:

	npx prisma migrate dev
	
 There are also some yet to be fixed internal hard-coded links which might break the code if it is experimented outside the ideal testing environment.
