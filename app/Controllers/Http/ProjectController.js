'use strict'

const Project = use('App/Models/Project');

class ProjectController {
  async index({ auth }) {
    const user = await auth.getUser();
    console.log(user);
    return await user.projects().fetch();
  }

  async create({ auth, request }) {
    const user = await auth.getUser();
    const { username } = request.all();
    const project = new Project();
    project.fill = ({
      username
    });
    await user.projects().save(project);
    return project;
  }
}

module.exports = ProjectController;