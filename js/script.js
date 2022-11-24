const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');


// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();
  clearUI();
  

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;

  // Validate url
  if (url === '') {
    alert('Please enter a topic name');
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(("http://127.0.0.1:8000/qrlink?q="+url), size); // link here should be changed on a valid link 
      generateArAnchor(size);
      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector('img').src;
        // Create save button
        createSaveBtn(saveUrl);
        createPrintButton();
        
      }, 50);
    }, 1000);
  }
  document.getElementById('url').value = "";
};

// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
    useSVG: true
  });
  
};

const generateArAnchor = (size) => {
  const imgAr = new Image(size, size);
  imgAr.src = "img/arAnch.png";
  imgAr.alt = "ar ancher image"

  console.log(imgAr);
  console.log("img is here!");
  document.getElementById('arAnchor').appendChild(imgAr);

}

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = '';
  document.getElementById('arAnchor').innerHTML = "";
  const saveBtn = document.getElementById('save-link');
  const printBtn = document.getElementById('print-btn');
  if (saveBtn) {
    saveBtn.remove();
    printBtn.remove();
  }
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';
  document.getElementById('buttonsContainer').appendChild(link);
};

const createPrintButton = () =>{
  const btn = document.createElement('button');
  btn.id = "print-btn";
  btn.classList =
    'bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-1/3 m-auto my-5 ';
  btn.innerHTML = "Print"  
  document.getElementById('buttonsContainer').appendChild(btn);
  btn.onclick = () =>{
    print();
  }

};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);
