export default function sitemap() {
  const base = 'https://cooljeff.com';
  const routes = ['', '/music', '/about', '/booking', '/shows', '/contact'];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.7,
  }));
}
