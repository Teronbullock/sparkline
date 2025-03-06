import mongoose from 'mongoose';

// Define types for the cached connection
interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Define the global namespace to avoid the ESLint error
declare global {
    // eslint-disable-next-line no-var
  var mongoose: CachedConnection | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Use the properly typed globalThis variable
const cached: CachedConnection = globalThis.mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Control number of connections
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('MongoDB connected successfully');
        
        // Set up connection event listeners
        mongoose.connection.on('connected', () => console.log('MongoDB connected'));
        mongoose.connection.on('error', err => console.error('MongoDB error:', err));
        mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));
        
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw error;
      });
  }


  cached.conn = await cached.promise;
  
  // Save the connection in the globalThis variable to reuse it across requests
  globalThis.mongoose = cached;
  
  return cached.conn;
}

export default dbConnect;