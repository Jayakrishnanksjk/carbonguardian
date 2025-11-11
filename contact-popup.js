// function openContactModal() {
//   document.getElementById("contactModal").style.display = "flex";
// }

// function closeContactModal() {
//   document.getElementById("contactModal").style.display = "none";
// }

// function enableButton() {
//   document.getElementById("submitBtn").disabled = false;
// }

// function disableButton() {
//   document.getElementById("submitBtn").disabled = true;
// }

// window.addEventListener("keydown", function (e) {
//   if (e.key === "Escape") closeContactModal();
// });

// window.addEventListener("click", function (e) {
//   const modal = document.getElementById("contactModal");
//   if (e.target === modal) closeContactModal();
// });

// function handleSubmit(event) {
//   event.preventDefault();

//   const thankYou = document.getElementById("thankYouMessage");
//   document.getElementById("thankYouMessage").style.display = "block";
//   event.target.reset();
//   disableButton();

//   setTimeout(() => {
//     closeContactModal();
//     if (thankYou) {
//       thankYou.style.display = "none";
//     }
//   }, 3000);

//   return false;
// }


// window.addEventListener("DOMContentLoaded", () => {
//   const popup = document.getElementById("contactPopup");
//   if (popup) {
//     popup.style.display = "block";
//   }
// });










function openContactModal() {
  document.getElementById("contactModal").style.display = "flex";
}

function closeContactModal() {
  document.getElementById("contactModal").style.display = "none";
}

function enableButton() {
  document.getElementById("submitBtn").disabled = false;
}

function disableButton() {
  document.getElementById("submitBtn").disabled = true;
}

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeContactModal();
});

window.addEventListener("click", function (e) {
  const modal = document.getElementById("contactModal");
  if (e.target === modal) closeContactModal();
});

function handleSubmit(event) {
  event.preventDefault(); // prevent page reload

  const form = event.target;
  const formData = new FormData(form);
  const thankYou = document.getElementById("thankYouMessage");
  const submitBtn = document.getElementById("submitBtn");

  // disable button while sending
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  fetch("sentmail.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((response) => {
      console.log("Server response:", response);

      if (response.includes("✅") || response.toLowerCase().includes("success")) {
        // Success message
        thankYou.style.display = "block";
        form.reset();
        grecaptcha.reset(); // reset captcha
      } else {
        // If failed, show message in console (you can show alert too)
        alert(response);
      }

      // reset UI after 3 sec
      setTimeout(() => {
        thankYou.style.display = "none";
        closeContactModal();
        submitBtn.disabled = true;
        submitBtn.textContent = "Send Message";
      }, 3000);
    })
    .catch((error) => {
      console.error("❌ Error sending message:", error);
      alert("Something went wrong. Please try again later.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    });

  return false;
}

// re-enable button only when captcha passes
function enableButton() {
  document.getElementById("submitBtn").disabled = false;
}

function disableButton() {
  document.getElementById("submitBtn").disabled = true;
}

// Optional: if you want popup visible on load for testing
window.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("contactPopup");
  if (popup) popup.style.display = "block";
});
