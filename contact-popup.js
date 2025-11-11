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
  event.preventDefault();

  const thankYou = document.getElementById("thankYouMessage");
  document.getElementById("thankYouMessage").style.display = "block";
  event.target.reset();
  disableButton();

  setTimeout(() => {
    closeContactModal();
    if (thankYou) {
      thankYou.style.display = "none";
    }
  }, 3000);

  return false;
}


window.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("contactPopup");
  if (popup) {
    popup.style.display = "block";
  }
});

