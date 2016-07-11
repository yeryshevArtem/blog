var notes = [];

module.exports.update = module.exports.create =  function (key, title, body) {
  notes[key] = {
    title: title,
    body: body
  }
}

module.exports.read = function (key) {
  return notes[key];
}

module.exports.destroy = function (key) {
  delete notes[key];
}

module.exports.keys = function () {
  return Object.keys(notes);
}
