function selectionRange(el, start, end) {
  try {
    if (el.selectionStart !== undefined) {
      el.setSelectionRange(start, end);
    } else {
      range = el.createTextRange();
      range.collapse(true);
      range.moveStart('character', start);
      range.moveEnd('character', end - start);
      range.select();
    }
  } catch(e) {}
}

export {
  selectionRange,
};