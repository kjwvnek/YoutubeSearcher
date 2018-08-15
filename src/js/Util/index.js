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
