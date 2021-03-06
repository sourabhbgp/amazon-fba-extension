interface keyValueData {
  key: string;
  value: string | number | boolean;
}

export const createContainer = (): HTMLDivElement => {
  let Container = document.getElementById("fba-container") as HTMLDivElement;
  if (Container && Container.parentNode) {
    Container.parentNode.removeChild(Container);
  }
  Container = document.createElement("div");
  Container.id = "fba-container";
  return Container;
};

export const createColumn = (
  name: string,
  backgroundColor: string
): HTMLDivElement => {
  const Column = document.createElement("div");
  Column.className = "column2";
  Column.style.backgroundColor = backgroundColor;

  const Name = document.createElement("span");
  Name.innerText = `${name}`;

  Column.appendChild(Name);
  return Column;
};

export const createKeyValue = (
  data: keyValueData
): HTMLParagraphElement | null => {
  const Container = document.createElement("p");
  const Key = document.createElement("b");
  Key.innerText = `${data.key}`;
  Container.appendChild(Key);

  const Value = document.createElement("a");
  Value.innerText = data.value as string;
  Value.addEventListener("click", () => {
    navigator.clipboard.writeText(data.value as string).then(
      () => {
        // BUTTON.innerText = "Copied";
      },
      () => console.log("Copy failed")
    );
  });
  Container.appendChild(Value);
  return Container;
};
