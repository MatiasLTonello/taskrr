import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ACCESS_LEVEL_KEY, ADMIN_KEY, PUBLIC_KEY, ROLES_KEY } from 'src/constants/key-decorators';
import { ROLES } from 'src/constants/roles';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
 
  ){}
   async canActivate(
    context: ExecutionContext,
  ) {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
    if(isPublic) return true;

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(ROLES_KEY, context.getHandler());
    
    const accessLevel = this.reflector.get<number>(ACCESS_LEVEL_KEY, context.getHandler());

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const request = context.switchToHttp().getRequest<Request>();
    const {roleUser, idUser} = request

    if(accessLevel === undefined){
      if(roles === undefined){
        if(!admin){
          return true
         } else if(admin && roleUser === admin){
          return true
         } else{
         throw new UnauthorizedException('You dont have permiss')
        }
      }
    }

    if(roleUser === ROLES.ADMIN) return true

    const user = await this.usersService.findUserById(idUser)

    const userExistInProject = user.projectsIncludes.find((project) => project.project.id === request.params.projectId)

    if(userExistInProject === undefined) throw new UnauthorizedException('You dont hace access to this project')
1
    if(accessLevel !== userExistInProject.accessLevel ) throw new UnauthorizedException('You dont have the level to do it')

    return true;
  }
}
