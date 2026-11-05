// `?still` skips the intro and all animations (handy for previews / screenshots).
export const still = new URLSearchParams(window.location.search).has('still');
