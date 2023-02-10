const newFormHandler = async function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const title = formData.get("post-title");
  const body = formData.get("post-body");

  try {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    document.location.replace("/dashboard");
  } catch (error) {
    console.error(error);
    alert("Failed to create post");
  }
};

document
  .querySelector("#new-post-form")
  .addEventListener("submit", newFormHandler);