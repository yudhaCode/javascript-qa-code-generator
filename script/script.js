document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-qr");
  const inputField = document.querySelector(".input-field");
  const qrCodeWrapper = document.querySelector(".qrCodeWrapper");
  const qrImgWrapper = document.querySelector(".qr-img-wrapper");
  const inputLinkWrapper = document.querySelector(".inputLinkWrapper");
  const downloadButton = document.querySelector(".download-qr");
  const shareButton = document.querySelector(".share-qr");

  const logos = document.querySelectorAll(".logo");

  logos.forEach(function (logo) {
    logo.addEventListener("click", function () {
      location.reload();
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const url = inputField.value.trim();
    if (isValidUrl(url)) {
      // Generate QR Code
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=183x183&data=${encodeURIComponent(
        url
      )}`;
      qrImgWrapper.innerHTML = `<img src="${qrCodeUrl}" alt="qr-code" />`;

      // Show QR Code
      qrCodeWrapper.classList.remove("hidden");

      // Hide Input Link Wrapper
      inputLinkWrapper.classList.add("hidden");
    } else {
      alert("Please enter a valid URL");
    }
  });

  downloadButton.addEventListener("click", function () {
    const qrImg = qrImgWrapper.querySelector("img");
    const downloadLink = document.createElement("a");
    downloadLink.href = qrImg.src;
    downloadLink.download = "qr-code.png";
    downloadLink.click();
  });

  shareButton.addEventListener("click", function () {
    const qrImg = qrImgWrapper.querySelector("img");
    const qrCodeUrl = qrImg.src;

    // Create a temporary textarea element to hold the URL
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = qrCodeUrl;
    tempTextarea.style.position = "absolute";
    tempTextarea.style.left = "-9999px";

    // Append the textarea to the body and select its content
    document.body.appendChild(tempTextarea);
    tempTextarea.select();

    // Copy the selected text to clipboard
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(tempTextarea);

    // Show a confirmation message
    alert("QR code URL copied to clipboard!");
  });

  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
});
