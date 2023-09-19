const AccessDeniedException = use('App/Exceptions/AccessDeniedException');
const ResourseNotFoundException = use('App/Exceptions/ResourseNotFoundException');

class AuthorizationService {
  verifyPermission(resourse, user) {
    if (!resourse) {
        throw new ResourseNotFoundException();
    }

    if (resourse.user_id !== user.id) {
      throw new AccessDeniedException();
    }
  }
}

module.exports = new AuthorizationService();
