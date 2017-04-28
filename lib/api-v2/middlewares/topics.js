const filter = require('mout/object/filter')
const privileges = require('lib/privileges/topic')
const api = require('../db-api')

exports.privileges = Object.keys(privileges).reduce((middles, privilege) => {
  function middleware (req, res, next) {
    if (privileges[privilege](req.forum, req.user, req.topic)) return next()

    const err = new Error('User doesn\'t have enough privileges on topic.')
    err.status = 403
    err.code = 'LACK_PRIVILEGES'

    next(err)
  }

  middles[privilege] = middleware
  return middles
}, {})

function findWithId (req, res, next, id) {
  api.topics.find({ _id: id })
    .findOne()
    .exec()
    .then((topic) => {
      if (!topic) {
        const err = new Error(`Topic ${id} not found.`)
        err.status = 404
        err.code = 'TOPIC_NOT_FOUND'
        return next(err)
      }

      req.topic = topic

      next()
    })
    .catch(next)
}

exports.findById = function findById (req, res, next) {
  findWithId(req, res, next, req.params.id)
}

exports.findByTopicId = function findByTopicId (req, res, next) {
  findWithId(req, res, next, req.query.topicId)
}

exports.findFromComment = function findFromComment (req, res, next) {
  findWithId(req, res, next, req.comment.reference)
}

exports.findByBodyTopicId = function findByBodyTopicId (req, res, next) {
  findWithId(req, res, next, req.body.topicId)
}

exports.findAllFromForum = function findAllFromForum (req, res, next) {
  const id = req.forum.id

  api.topics.find({ forum: id })
    .exec()
    .then((topics) => {
      if (!topics) {
        const err = new Error(`Topics from Forum ${id} not found.`)
        err.status = 404
        err.code = 'TOPICS_NOT_FOUND'
        return next(err)
      }

      req.topics = topics

      next()
    })
    .catch(next)
}

const updatableKeys = [
  'action.method',
  'action.pollOptions',
  'author',
  'authorUrl',
  'clauses',
  'closingAt',
  'coverUrl',
  'links',
  'mediaTitle',
  'source',
  'tag',
  'tags',
  'topicId'
]

exports.parseUpdateableKeys = function parseUpdateableKeys (req, res, next) {
  const custom = (req.forum.topicsCustomAttrs || []).map((attr) => {
    return `customAttrs.${attr.name}`
  })

  const updatable = updatableKeys.concat(custom)

  const attrs = filter(req.body, (v, k) => updatable.includes(k))

  req.forum.topicsCustomAttrs.forEach((attr) => {
    const key = `customAttrs.${attr.name}`

    if (attrs[key] === undefined || attrs[key] === null) return

    if (attr.kind === 'Number') {
      attrs[key] = parseInt(attrs[key], 10) || attr.min
      if (attrs[key] < attr.min || attrs[key] > attr.max) {
        attrs[key] = undefined
      }
    } else if (attr.kind === 'String') {
      attrs[key] = String(attrs[key])
      if (attrs[key].length < attr.min || attrs[key].length > attr.max) {
        attrs[key] = undefined
      }
    } else if (attr.kind === 'Enum') {
      if (!attr.options.includes(attrs[key])) attrs[key] = undefined
    }
  })

  req.keysToUpdate = attrs

  next()
}
