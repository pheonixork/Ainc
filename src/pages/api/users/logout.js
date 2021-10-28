import {withSession} from 'middlewares';

export default withSession(async (req, res) => {
  req.session.destroy();
  res.json({status: 'ok'});
})