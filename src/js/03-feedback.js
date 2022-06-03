import lodashThrottle from 'lodash.throttle';

let data = { email: '', message: '' };

const STORAGE_KEY = `feedback-form-state`;

const refs = {
  form: document.querySelector(`.feedback-form`),
  input: document.querySelector(`input[type="email"]`),
  textarea: document.querySelector(`textarea[name="message"]`),
};

const savedData = localStorage.getItem(STORAGE_KEY);
const parsedData = JSON.parse(savedData);

completeForm();

function completeForm() {
  refs.form.addEventListener(`submit`, onFormSubmit);
  refs.form.addEventListener('input', lodashThrottle(onFormInput, 500));

  if (parsedData) {
    refs.textarea.value = parsedData.message;
    refs.input.value = parsedData.email;
  }
}

function onFormInput(e) {
  data = { email: refs.input.value, message: refs.textarea.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function onFormSubmit(e) {
  e.preventDefault();

  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedData);
  console.log(parsedData);

  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
