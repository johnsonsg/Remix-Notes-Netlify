### MongoDB & Prisma

We will be using MongoDB Cloud called Atlas. It's a Database hosted in the cloud.

## Adding MongoDB: Steps

- Create an account
- Select the Shared or Free tier
- Create a new Cluster

- If you already have a cluster, create a new project.
- Name your project
- Add Memebers and Set Permissions - Can do later
- Create Project
- You will be redirected to Database Deployments
- Buid Database
- Select Free
- Give Cluster a name, ie Cluster-Notes
- Click Create
- Add Username and Password & Create User
- UserName: johnsonsg | Password: UUaHBQciTdnkFfgQ
- Add entries to your IP Access List: Add My Current IP Address
- Click Finish and Close button.

## Adding Prisma: Steps

Prisma is a library Package For Querying the Database

- Install:
  - Yarn: yarn add prisma --save-dev
  - NPM: npm install prisma --save-dev
- Initalize usage: npx prisma init --datasource-provider mongodb
  - This creates a directory: /prisma and a schema.prisma file
- This also creates a .env file that has a connection url to the DB
  - In the .env file replace the DATABASE_URL='some-url'
  - To do this, go back to your mongoDB cluster
  - Click on Connect and then Connect your Application
  - Copy the connection string into your application code.
- Go back to the .env file and past this in the DATABASE_URL=''
  - Make sure you put in the password you assigned where it says <password>
  - Also, in that string, look for: /?retryWrites=
  - Add your database name you assigned before the "?" mark
  - example: /mydatabasename?retryWrites=

### Now, Create Prisma Models

This tells prisma how our data should look like.

- Back in schema.prisma Create a model

Example:

```
model Note {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String
  content   String
  date      DateTime
  dateAdded DateTime @default(now())
}
```

### database.server.js

- This allows us to connect to database and allows prisma client to talk to MongoDB

* We need to create an action, but first we need to add a database.server.js
* In Data Directory, Create database.server.js
* In this file, use this code:

```
import { PrismaClient } from '@prisma/client';

/**
 * @type PrismaClient
 */
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  prisma = global.__db;
}

export { prisma };
```

### notes.server.js

- This allows Prisma to structure the Database with Data, like Add, Edit, Delete ...

* Let's Create another .server file in the data directory
* notes.server.js and lets add an async function

```
export async function addNote(noteData) {}
```

- Now, we must generate prisma
- In the command line, write:
  - npx prisma generate
  - [ This will create a code bundle based on your schema.prisma file, that makes it easy to interact with Prisma and your database.]
- After running that command, go back to notes.server.js and lets add more to that function we just started to create.

```
import { prisma } from './database.server'

export async function addNote(noteData) {
  try {
    return await prisma.note.create({
      data: {
        title: noteData.title,
        content: noteData.content,
        date: new Date(noteData.date)
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
```

Then we need to go back to routes/notes.jsx and add a function to the form that takes in an action.

- in notes.jsx at the bottom lets add an action

```
export async function action({ request }) {
  const formData = await request.formData()
  const noteData = Object.fromEntries(formData)

  noteData.id = new Date().toISOString()
  await addNote(noteData)
  return redirect('/notes')
}
```

### Done!

- Now you should be able to tallk to the Database and add new data.
- Now you can add more like updating, fetching, deleting ect. by following this same format.
- So, database.server.js is complete. There is no more code you need to add to this file.
- If you want to update, delelte ect. you do this by exporting the function in notes.server.js
- If you want to set up a new structure in the database, like Users, you need to add that to the schema.prisma
