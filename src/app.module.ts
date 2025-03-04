import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      database: "contacts",
      password: "1234",
      host: "localhost",
      port: 5432,
      username: "postgres",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    ContactsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
