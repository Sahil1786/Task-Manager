# Task-Manager
# LIVE LINK -https://v0-simple-task-app-rose.vercel.app/
Install dependencies

```shellscript
npm install
# or
yarn install
```
3. Run the development server

```shellscript
npm run dev
# or
yarn dev
```


4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application


## Project Structure

```plaintext
task-management-app/
├── app/
│   ├── api/
│   │   ├── tasks/
│   │   │   ├── route.ts         # GET & POST endpoints
│   │   │   └── [id]/
│   │   │       └── route.ts     # DELETE & PUT endpoints
│   └── page.tsx                 # Main task management UI
├── components/
│   └── ui/                      # UI components
├── public/                      # Static assets
├── .gitignore
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

- **Frontend**: React components in the `app` directory

- `page.tsx`: Main task management interface with CRUD operations
- Uses React hooks (useState, useEffect) for state management



- **Backend**: Next.js API routes in the `app/api` directory

- `tasks/route.ts`: Handles GET (fetch all) and POST (create) requests
- `tasks/[id]/route.ts`: Handles DELETE and PUT (update) requests
- Uses in-memory storage for simplicity (can be replaced with MongoDB)





## How It Works

The application uses a simple architecture:

1. **Frontend**: React components render the UI and handle user interactions
2. **API Routes**: Next.js API routes provide backend functionality
3. **State Management**: React hooks manage the application state
4. **Data Storage**: In-memory array stores tasks (can be replaced with a database)


### Task Data Structure

```typescript
interface Task {
  id: string
  text: string
  completed: boolean
}
```

## Deployment

### Getting a Deployed Link with Vercel

The easiest way to deploy this application and get a public URL is using Vercel:

1. Create an account on [Vercel](https://vercel.com) if you don't have one
2. Install the Vercel CLI:

```shellscript
npm install -g vercel
```


3. Run the following command in the project directory:

```shellscript
vercel
```



## Extending the Project

### Using MongoDB Instead of In-Memory Storage

To use MongoDB:

1. Install MongoDB and Mongoose:

```shellscript
npm install mongoose
```


2. Create a database connection file in `lib/db.js`:

```javascript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task-app';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
```


3. Create a Task model in `models/Task.js`:

```javascript
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please provide a task description'],
    maxlength: [200, 'Task description cannot be more than 200 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
```


4. Update the API routes to use the MongoDB model


### Adding Authentication

To add user authentication:

1. Install NextAuth.js:

```shellscript
npm install next-auth
```


2. Set up authentication providers and protect routes
3. Modify the task model to include user IDs


### Adding Categories or Tags

To organize tasks better:

1. Extend the Task interface:

```typescript
interface Task {
  id: string
  text: string
  completed: boolean
  category?: string
  tags?: string[]
}
```


2. Update the UI to include category selection and tag input
3. Add filtering functionality based on categories and tags


## Troubleshooting

### Common Issues

- **API routes not working**: Make sure you're using the correct HTTP methods and endpoints
- **State not updating**: Check that you're using the state setter functions correctly
- **Styling issues**: Ensure Tailwind CSS is properly configured


### Getting Help

If you encounter any issues:

1. Check the console for error messages
2. Review the Next.js documentation
3. Search for similar issues on Stack Overflow
4. Create an issue in the GitHub repository


## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)


```plaintext

This README.md file include
```
