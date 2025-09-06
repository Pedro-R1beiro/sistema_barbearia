export function formatPhoneNumber(phone: number | string) {
  const phoneStr = String(phone);
  const ddd = phoneStr.substring(0, 2);

  const formated = `(${ddd}) ${phoneStr[2]} ${phoneStr.substring(3)}`;
  return formated;
}
