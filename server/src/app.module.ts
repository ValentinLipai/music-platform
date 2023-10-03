import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as process from 'process';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_PATH),
    TrackModule,
  ],
})
export class AppModule {}
