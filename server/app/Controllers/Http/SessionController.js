const User = use('App/Models/User');

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.only(['email', 'password']);

    const user = await User.findBy('email', email);

    const { token } = await auth.attempt(email, password);

    return {
      user,
      token,
    };
  }
}

module.exports = SessionController;
