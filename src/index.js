import _ from "lodash";
import "./style.css";

let tasks = [
  {
    description: "Adding a new item",
    completed: false,
    index: 0,
  },
  {
    description: "Removing a selected item.",
    completed: false,
    index: 1,
  },
  {
    description: "Reordering a selected item (as drag-and-drop).",
    completed: false,
    index: 2,
  },
  {
    description: "Marking a selected item as complete.",
    completed: false,
    index: 3,
  },
  {
    description: "Removing all items marked as complete at once.",
    completed: false,
    index: 4,
  },
];

for (let i = 0; i < tasks.length; i += 1) {
  const listItems = document.createElement("div");
  const leftItems = document.createElement("ul");
  const liTextAndIcons = document.createElement("li");
  const squareSpan = document.createElement("span");
  const squareIcon = document.createElement("i");
  const listText = document.createElement("p");
  const threeDotIcon = document.createElement("i");

  listItems.appendChild(leftItems);
  listItems.appendChild(threeDotIcon);
  leftItems.appendChild(liTextAndIcons);
  liTextAndIcons.appendChild(squareSpan);
  liTextAndIcons.appendChild(listText);
  squareSpan.appendChild(squareIcon);

  listItems.className = "list-items";
  leftItems.className = "fa-ul left-items";
  liTextAndIcons.className = "li-text-and-icons";
  squareSpan.className = "fa-li square-span";
  squareIcon.className = "far fa-square square-icon";
  listText.className = "list-text";
  threeDotIcon.className = "fas fa-ellipsis-v three-dot-icon";

  document.querySelector(".box").appendChild(listItems);
  listText.innerText = tasks[i].description;
  listText.innerHTML;
}
