import { btoa } from 'Base64';
import { optionsWithAuth } from '@r/api-client';
import superagent from 'superagent';

const fetchLogin = (username, password) => new Promise((resolve, reject) => {
  superagent
    .post('/loginproxy')
    .send({ username, password })
    .end((err, res) => {
      if (err || !res.body) { return reject(err); }
      resolve(res.body);
    });
});

const logout = () => new Promise((resolve, reject) => {
  superagent
    .post('/logoutproxy')
    .end((err, res) => {
      if (err) { return reject(err); }
      resolve();
    })
})

const refreshSession = refreshToken => new Promise((resolve, reject) => {
  superagent
    .post('/refreshproxy')
    .send({ refreshToken })
    .end((err, res) => {
      if (err || !res.body) { return reject(err); }
      resolve(res.body);
    });
});

export default class Session {
  static async fromLogin(username, password) {
    const data = await fetchLogin(username, password);
    return new Session(data.session);
  };

  constructor(data) {
    Object.assign(this, data);

    if (Object.freeze) {
      Object.freeze(this);
    }
  }

  get tokenString() {
    return btoa(JSON.stringify(this.toJSON()));
  }

  get isValid() {
    return (new Date()).getTime() < this.expires;
  }

  get apiAuth() {
    return optionsWithAuth(this.accessToken);
  }

  async logout() {
    return await logout();
  }

  async refresh() {
    const data = await refreshSession(this.refreshToken);
    return new Session(data.session);
  }

  toJSON() {
    return {
      accessToken: this.accessToken,
      tokenType: this.tokenType,
      expires: this.expires,
      refreshToken: this.refreshToken,
      scope: this.scope,
    };
  }
}
