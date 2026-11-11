export const API_URL = 'https://countries.dev'

export function adapter(c) {
  return {
    cca3: c.alpha3Code,
    name: { common: c.name, official: c.name },
    capital: c.capital ? [c.capital] : null,
    region: c.region,
    population: c.population,
    flags: { svg: c.flags.svg }
  }
}