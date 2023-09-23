const preview = document.querySelector('.img-upload__preview img');
const fileChooser = document.querySelector('[type="file"]');

const VALID_FORMAT = ['jpg', 'jpeg', 'png'];

fileChooser.addEventListener('change', ()=> {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const isValidFormat = VALID_FORMAT.some((item) => fileName.endsWith(item));
  if(isValidFormat) {
    preview.src = URL.createObjectURL(file);
  }
});


export{preview};
