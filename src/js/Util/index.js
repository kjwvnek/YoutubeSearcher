export function findAncestorByClass(element, className) {
  while (element !== document.body) {
    if (element.classList.contains(className)) {
      return element;
    }
    element = element.parentElement;
  }

  return null;
}

export function delegateEvent(selector, e, eventHandler) {
  let referees = e.currentTarget.querySelectorAll(selector);
  e.referee = null;

  for (let i = 0; i < referees.length; i++) {
    if (referees[i].contains(e.target)) {
      e.referee = referees[i];
      break;
    }
  }

  if (e.referee) {
    eventHandler(e);
  }
}

export function removeWhiteSpace(str) {
  return str.replace(/\s/g, '');
}

export function fieldsToUri(fields) {
  let strBuffer = [];

  for (let field in fields) {
    if (fields.hasOwnProperty(field)) {
      let nextFields = fields[field];

      if (Array.isArray(nextFields)) {
        strBuffer.push(`${field}(${nextFields.join(',')})`)
      } else if (typeof nextFields === 'object') {
        strBuffer.push(`${field}(${fieldsToUri(nextFields)})`);
      }
    }
  }

  return strBuffer.join(',');
}