const Action = require('./actions-model')
const Project = require('../projects/projects-model')

const checkId = (req, res, next) => {
  Action.get(req.params.id)
    .then(action => {
      if (!action) {
        next({message: 'action with that id not found', status: 404})
      }
      req.action = action
      next()
    })
    .catch(next)
}

const checkPayload = (req, res, next) => {
  const {description, notes} = req.body
  if (!description ||
    !notes ||
    description.length >
    128 ||
    typeof description !==
    'string' ||
    typeof notes !==
    'string') {
    next({message: 'description required under 128 characters and notes required', status: 400})
  }
  next()
}

const checkProjectId = (req, res, next) => {
  Project.get(req.body.project_id)
    .then(project => {
      if (!project) {
        next({message: 'project not found', status: 404})
      }
      next()
    })
    .catch(next)
}

module.exports = {
  checkId,
  checkPayload,
  checkProjectId
}
