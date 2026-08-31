export const cookies = {
  getOptions: () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 *1000
  }),

  setCookie: (res, name, value,options= {}) => {
    res.cookie(name, value, {...cookies.getOptions(), ...options});
  },

  clearCookie: (res, name, options= {}) => {
    res.clearCookie(name, {...cookies.getOptions(), ...options});
  },

  getCookie: (req, name) => {
    return req.cookies[name];
  }
};