import { UsersProjectsEntity } from './../../users/entities/usersProjects.entity';
import { BaseEntity } from '../../config/base.entity';
import { IProject } from '../../interfaces/project.interface';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'projects' })
export class ProjectsEntity extends BaseEntity implements IProject {
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(() => UsersProjectsEntity, (userProjects) => userProjects.project)
  usersIncludes: UsersProjectsEntity[];
}
