'use strict';

const Project = use('App/Models/Project');

class ProjectController {
  async index({ auth }) {
    const user = await auth.getUser();
    return await user.projects().fetch();
  }

  async create({ auth, request }) {
    const user = await auth.getUser();
    const { username } = request.all();
    const project = new Project();
    project.fill = ({
      username,
    });
    await user.projects().save(project);
    return project;
  }

  async destroy({ auth, response, params }) {
    const user = await auth.getUser();
    const { id } = params;
    const project = await Project.find(id);
    if (project.user_id !== user.id) {
      return response.status(403).json({
        message: "No estás autorizado para eliminar este proyecto",
      })
    }
    await project.delete();
    return project;
  }
}

module.exports = ProjectController;
