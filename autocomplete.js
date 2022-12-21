const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  // Declaring element form the DOM - Creating Dynamic HTML
  root.innerHTML = `
<label><b>Search</b></label>
<input class="input"/>
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results"></div>
  </div>
</div>
`;
  // Declaring element form the DOM
  const input = root.querySelector(".input");
  const dropdown = root.querySelector(".dropdown");
  const resultWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const items = await fetchData(event.target.value);

    // If user delete search return and close dropdown
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }

    // Clearing the first results to get second search
    resultWrapper.innerHTML = "";

    // If user search for movie  the "is-active" class will be added
    dropdown.classList.add("is-active");

    // Looping through the data to display in the DOM
    for (let movie of items) {
      const option = document.createElement("a");

      //  Making the movie result appear inside the dropdown
      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(movie);
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(movie);
        onOptionSelect(movie);
      });
      // Adding the cont inisde the "Results" Div
      resultWrapper.appendChild(option);
    }
  };

  // Event Listener when user tyoe
  input.addEventListener("input", debounce(onInput, 500));

  // If user click outside the "root" element the dropdown close
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
