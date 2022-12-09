const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');
const canvas= document.getElementById('canvas');

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
      hideSpinner();https:
      generateQRCode(("https://qrcodemqtt.azurewebsites.net/fetch?q="+url), size); // link here should be changed on a valid link
      generateArAnchor(size);
      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector('img').src;
        // Create print button      
        createPrintButton();
        // Create save button with canvas inside       
        html2canvas(document.querySelector("#canvas"), {
          
          imageTimeout: 70,
          width: 800,
          height: 600
      }).then(canvas => {
          //document.body.appendChild(canvas)
          let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
          
          createSaveBtn(image); 
        });
      
        
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
  //link.download = 'qrcode';
  link.setAttribute("download", "ImageForPrint.png");
  link.innerHTML = 'Save';
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

form.addEventListener('submit', onGenerateSubmit);


// dark mode button switch

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark')
    }

const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}

const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }

});


