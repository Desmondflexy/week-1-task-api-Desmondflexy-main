main();

function main() {
  const charactersList = document.querySelector("ul");
  const characterDetails = document.querySelector(".details");
  const [nameHeading, imgBig, genderPara, heightPara, homeLink] = document.querySelectorAll(".details>*");

  homeLink.addEventListener("click", () => {
    charactersList.classList.remove("hide");
    characterDetails.classList.add("hide");
  })

  populate();

  async function populate() {
    let request = new Request("https://swapi.dev/api/people");
    let response = await fetch(request);
    let starWars = await response.json();

    while (starWars.next) {
      populateList(starWars);

      request = new Request(starWars.next);
      response = await fetch(request);
      starWars = await response.json();
    }
  }

  function populateList(obj) {
    obj.results.forEach(character => {
      const { name, gender, height } = character;
      const li = document.createElement("li");
      charactersList.append(li);
      const p = document.createElement("p");
      const img = document.createElement("img");
      li.append(img, p);
      img.src = getImageSrc(gender)[1];
      p.innerHTML = name;
      li.addEventListener("click", () => showDetails(name, gender, height));
    })
  }

  function getImageSrc(gender) {
    switch (gender) {
      case "male":
        return ["image/profile-male.jpeg", "image/profile-male-small.jpeg"];
      case "female":
        return ["image/profile-female.jpeg", "image/profile-female-small.jpeg"];
      default:
        return ["image/profile-robo.jpeg", "image/profile-robo-small.jpeg"];
    }
  }

  function showDetails(name, gender, height) {
    nameHeading.innerHTML = name;
    genderPara.innerHTML = `Gender: ${gender}`;
    heightPara.innerHTML = `Height: ${height}cm`;
    imgBig.setAttribute("src", getImageSrc(gender)[0]);
    charactersList.classList.add("hide");
    characterDetails.classList.remove("hide");
  }
}

// module.exports = { main }