# ABC Academy server

## Configure MongoDB

Create a local environment file from the example:

```powershell
Copy-Item .env.example .env
```

The example uses a MongoDB server running on `127.0.0.1:27017`. Install and start
MongoDB locally before starting the API, or replace `MONGO_URI` in `.env` with
your MongoDB Atlas connection string. Keep `.env` private and never commit
database credentials.

Set a private, random `JWT_SECRET` in `.env`, then start the server from this
directory:

```powershell
npm run dev
```

The API waits for MongoDB to connect before listening. If the connection fails,
check that `MONGO_URI` is set correctly and that the database is running and
reachable.

To create the initial admin account after the database is available:

```powershell
node seed.js
```

Before running the seed script, set `INITIAL_ADMIN_PASSWORD` in `.env` to a
unique password of at least 12 characters. The seed script will not create a
known default password. Keep `.env` private and change the initial password
using your organization's account-management process after setup.

Website enquiries submitted from the Contact page are stored in MongoDB and
visible to admins in the Dashboard inbox. Configure the school’s real contact
details in the client before deployment.
