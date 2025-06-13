export function scrollToTop(): void {
  const scrollTarget = document.documentElement;

  scrollTarget.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
