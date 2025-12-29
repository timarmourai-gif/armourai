import { ExternalLink } from 'lucide-react';

export function SupportLinks() {
  const links = [
    { title: 'Download forms', href: '#' },
    { title: 'Frequently asked questions', href: '#' },
    { title: 'Payment guide', href: '#' },
    { title: 'Product helpline 13', href: '#' },
    { title: 'Updating contact details', href: '#' },
    { title: 'Provider information and updates', href: '#' },
    { title: 'COVID-19 information', href: '#' },
    { title: 'Business support', href: '#' },
    { title: 'Upgrading your details', href: '#' },
    { title: 'How to guide', href: '#' },
    { title: 'Claiming your cash', href: '#' },
    { title: 'Business resources support', href: '#' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg mb-6">Support quick links</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#E31E24] hover:bg-[#E31E24] hover:text-white transition-all group"
          >
            <span className="text-sm">{link.title}</span>
            <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
          </a>
        ))}
      </div>
    </div>
  );
}