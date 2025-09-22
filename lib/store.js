export const products = [
  { id: '1', name: 'Widget', price: 9.99, description: 'A useful widget' },
  { id: '2', name: 'Gadget', price: 19.99, description: 'A handy gadget' },
]

export function genId() {
  return String(Date.now() + Math.floor(Math.random() * 1000))
}
