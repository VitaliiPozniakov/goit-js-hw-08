import lodashThrottle from 'lodash.throttle';

const STORAGE_KEY = `feedback-form-state`;

const refs = {
  form: document.querySelector(`.feedback-form`),
  input: document.querySelector(`input[ype="email"]`),
  textarea: document.querySelector(`textarea[name="message"]`),
};

refs.form.addEventListener(`submit`, onFormSubmit);
refs.textarea.addEventListener('input', lodashThrottle(onTextareaInput, 500));

completeTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
  // console.log( refs.textarea.value)

  localStorage.setItem(STORAGE_KEY, refs.textarea.value);
}

function completeTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    refs.textarea.value = savedMessage;
  }
}
