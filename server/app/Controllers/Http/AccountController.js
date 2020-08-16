const Ws = use('Ws');

class AccountController {
  async show({ auth }) {
    const user = auth.getUser();

    const userChannel = Ws.getChannel('user:*').topic(`user:${user.id}`);

    console.log(userChannel);

    if (userChannel) {
      userChannel.broadcastToAll('logout');
    }

    return user;
  }
}

module.exports = AccountController;
