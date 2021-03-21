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

export const createColumn = (): HTMLDivElement => {
  const Column = document.createElement("div");
  Column.className = "column";
  return Column;
};

export const createKeyValue = (
  data: keyValueData
): HTMLParagraphElement | null => {
  const Container = document.createElement("p");
  const Key = document.createElement("strong");
  Key.innerText = `${data.key} :`;
  Container.appendChild(Key);

  const Value = document.createElement("span");
  Value.innerText = data.value as string;
  Container.appendChild(Value);
  return Container;
};
