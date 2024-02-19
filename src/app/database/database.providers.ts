import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb+srv://deepakranpise0:Deepak0613@cluster0.539z9rm.mongodb.net/pace_hr1_uk'),
  },
];
