document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#urlform");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // get form data
    const data = new URLSearchParams(new FormData(form));

    fetch("/shorten", {
      method: 'POST',
      body: data,
    }).then((res) => {
      if (res.ok) {
        console.log("success");
      } else {
        console.log(res.status, res.body)
      }
    })
  })
})
