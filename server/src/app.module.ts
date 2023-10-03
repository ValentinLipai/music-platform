import { resolve } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_PATH),
    TrackModule,
    FileModule,
  ],
})
export class AppModule {}
