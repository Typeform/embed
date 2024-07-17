import Link from 'next/link'

export const Menu = ({ id }: { id: string }) => {
  const links = {
    '/': 'widget',
    '/popup': 'popup',
    '/slider': 'slider',
    '/sidetab': 'sidetab',
    '/popover': 'popover',
    '/vanilla': 'vanilla library in react',
    '/forward-ref': 'forward ref',
    '/app/widget': 'widget (app)',
    '/app/popup': 'popup (app)',
  }

  return (
    <div className="menu">
      {Object.keys(links).map((path) => (
        <Link key={path} href={`${path}?id=${id}`}>
          {links[path]}
        </Link>
      ))}
    </div>
  )
}
