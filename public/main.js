document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#urlform");
  const slider = document.querySelector("#slider")
  const time = document.querySelector("#time");
  const rid = document.querySelector("#rid");

  slider.addEventListener("input", () => {
    time.textContent = slider.value;
  })
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // get form data
    const data = new URLSearchParams(new FormData(form));
    const res = await fetch("/shorten", {
      method: 'POST',
      body: data,
    })

    if (res.ok) {
      rid.textContent = await res.text()
    } else {
      alert(await res.text())
    }
  })
})
