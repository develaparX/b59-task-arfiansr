var contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  var form = e.target;
  var formData = new FormData(form);

  var data = Object.fromEntries(formData.entries());

  console.log(data);

  var link = document.createElement("a");

  link.href = `mailto:srarfian@gmail.com?subject=${data.subject}&body=Selamat siang. Nama saya${data.name}. Silahkan hubungi saya di ${data.email} atau ${data.phoneNumber}. Skill saya adalah ${data.skill}.%0D%0ABerikut pesan saya : ${data.message}`;

  link.click();
});
