document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#urlform");
  const slider = document.querySelector("#slider")
  const time = document.querySelector("#time");
  const rid = document.querySelector("#rid");
  const copy = document.querySelector("#copy");
  const url = document.querySelector("#urlform div p");

  copy.addEventListener("click", () => {
    const ridText = url.textContent;
    navigator.clipboard.writeText(ridText)
    .then(() => {
      copy.textContent = "copied!";
    })
    .catch((err) => {
      console.log(err);
    })
  })

  slider.addEventListener("input", () => {
    time.textContent = slider.value;
  })
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    copy.textContent = "copy";
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
