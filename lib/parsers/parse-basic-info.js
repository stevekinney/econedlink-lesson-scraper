var parseResponse = require('./parse-response');
var parseGrades = require('./parse-grades');
var parseTitle = require('./parse-title');

module.exports = function (response, lesson) {
  if (typeof response == 'string' || response instanceof String) {
    response = parseResponse(response);
  }
  
  var urlBase;
  
  if (lesson.type === "interactive") {
    urlBase = 'http://www.econedlink.org/i';
  } else {
    urlBase = 'http://www.econedlink.org/e';
  }
  
  response.grades = parseGrades(response.grades[0]);
  response.title = parseTitle(response.title[0]);
  response.source = "EconEdLink";
  response.url = urlBase + lesson.id;
  
  if (response.concepts.results) response.concepts = [];

  for (property in response) {
    if (response.hasOwnProperty(property)) {
      if (lesson) lesson[property] = response[property];
    }
  }
  
  return lesson;
};