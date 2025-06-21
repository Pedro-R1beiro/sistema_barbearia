export function scrollToTop(): void {
  const scrollTarget = document.body;

  scrollTarget.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
