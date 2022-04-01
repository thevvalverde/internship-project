# internship-project

This is a simulation of a client-company and a widget for consent management. For obvious reasons, the database credentials were not included in the repository, which are needed for it to work.
For this reason, inside mock-site/ and prisma/, it's required that a file name .env is added, with the following line, substituting the <FIELDS> with the credentials of whoever wants to test this.
  
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>?schema=<SCHEMA>"
