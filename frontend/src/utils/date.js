export function dateHumanFormat(timestamp) {
  const ts = new Date(timestamp * 1000);
  const date = ts.toDateString();
  const time = ts.toString().match(/(\d{2}:\d{2})/)[0];

  return `${date} at ${time}`;
}
