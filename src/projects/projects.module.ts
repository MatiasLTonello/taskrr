import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { ProvidersModule } from 'src/providers/providers.module';
import { HttpCustomService } from 'src/providers/http/http.service';


@Module({
  imports: [TypeOrmModule.forFeature([ProjectsEntity]), ProvidersModule],
  providers: [ProjectsService, HttpCustomService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
