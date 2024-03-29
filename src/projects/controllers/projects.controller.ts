import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/projects.dto';
import { ProjectsService } from '../services/projects.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevel } from 'src/auth/decorators/acess-level.decorator';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@Controller('projects')
@UseGuards(AuthGuard, AccessLevelGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}
  @Post('create')
  public async createProject(@Body() body: ProjectDTO) {
    return await this.projectService.createProject(body);
  }

  @Get('all')
  public async findAllProjects() {
    return await this.projectService.findProjects();
  }

  @PublicAccess()
  @Get('list/api')
  public async listApi(){
    return this.projectService.listApi();
  }



  @Get(':projectId')
  public async findProjectById(@Param('projectId', new ParseUUIDPipe()) id: string) {
    return await this.projectService.findProjectById(id);
  }

  @AccessLevel(50)
  @Put('edit/:projectId')
  public async updateProject(
    @Param('projectId', new ParseUUIDPipe()) id: string,
    @Body() body: ProjectUpdateDTO,
  ) {
    return await this.projectService.updateProject(body, id);
  }

  @Delete('delete/:projectId')
  public async deleteProject(@Param('projectId', new ParseUUIDPipe()) id: string) {
    return await this.projectService.deleteProject(id);
  }
}
